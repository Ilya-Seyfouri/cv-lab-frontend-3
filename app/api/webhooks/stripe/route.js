import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PRICE_CONFIG = {
  // Monthly plans
  price_1SpUeoGTsfq9NWHAFOXcEXHh: {
    name: "Monthly Standard",
    tokens: 30,
    type: "subscription",
    intervalMonths: 1,
  },
  price_1SpUfaGTsfq9NWHAtr59tPFE: {
    name: "Monthly Premium",
    tokens: 100,
    type: "subscription",
    intervalMonths: 1,
  },
  // 6-month plans (tokens still reset monthly)
  price_1SpUggGTsfq9NWHA0exdHuEp: {
    name: "6-Month Standard",
    tokens: 30,
    type: "subscription",
    intervalMonths: 6,
  },
  price_1SpUgBGTsfq9NWHAhYdxJKRu: {
    name: "6-Month Premium",
    tokens: 100,
    type: "subscription",
    intervalMonths: 6,
  },
  // One-time token pack
  price_1SpUhsGTsfq9NWHAodt5avHo: {
    name: "15 Token Pack",
    tokens: 15,
    type: "one_time",
  },
};

// Helper: Calculate next reset date (1 month from now)
function getNextResetDate() {
  const now = new Date();
  const nextReset = new Date(now);
  nextReset.setMonth(nextReset.getMonth() + 1);
  return nextReset.toISOString();
}

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
async function handleCheckoutSessionCompleted(session) {
  console.log("Checkout session completed:", session.id);
  console.log("Session mode:", session.mode);

  const userId = session.metadata?.userId;
  const customerId = session.customer;

  if (!userId) {
    console.error("No userId in session metadata");
    return;
  }

  // Handle ONE-TIME payments (token packs)
  if (session.mode === "payment") {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const priceId = lineItems.data[0]?.price?.id;
    const config = PRICE_CONFIG[priceId];

    if (config?.type === "one_time") {
      // Get current credits and ADD to them
      const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("credits_remaining, stripe_customer_id")
        .eq("id", userId)
        .single();

      if (fetchError) {
        console.error("Error fetching profile:", fetchError);
        throw fetchError;
      }

      const newCredits = (profile.credits_remaining || 0) + config.tokens;

      // Only update stripe_customer_id if we have one AND user doesn't already have one
      const updateData = {
        credits_remaining: newCredits,
      };

      // Only set customer ID if it exists and user doesn't have one
      if (customerId && !profile.stripe_customer_id) {
        updateData.stripe_customer_id = customerId;
      }

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", userId);

      if (error) {
        console.error("Error updating credits:", error);
        throw error;
      }

      console.log(
        `Added ${config.tokens} tokens to user ${userId}. New total: ${newCredits}`
      );
      return;
    }
  }
  // Handle SUBSCRIPTION payments
  if (session.mode === "subscription") {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const priceId = lineItems.data[0]?.price?.id;
    const config = PRICE_CONFIG[priceId];

    if (!config) {
      console.error("Unknown price ID:", priceId);
      return;
    }

    // Get current credits to compare
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("credits_remaining")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.error("Error fetching profile:", fetchError);
      throw fetchError;
    }

    const currentCredits = profile.credits_remaining || 0;
    // If current credits > plan amount, keep them. Otherwise set to plan amount.
    const newCredits =
      currentCredits > config.tokens ? currentCredits : config.tokens;

    const nextResetDate = getNextResetDate();

    const { error } = await supabase
      .from("profiles")
      .update({
        stripe_customer_id: customerId,
        is_subscribed: true,
        subscription_status: config.name,
        credits_remaining: newCredits,
        credits_last_reset: new Date().toISOString(),
        credits_reset_date: nextResetDate,
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error);
      throw error;
    }

    console.log(
      `User ${userId} subscribed to ${config.name} with ${config.tokens} tokens. Next reset: ${nextResetDate}`
    );
  }
}
async function handleSubscriptionUpdated(subscription) {
  console.log("=== SUBSCRIPTION UPDATED ===");
  console.log("Subscription ID:", subscription.id);
  console.log("Status:", subscription.status);
  console.log("Cancel at period end:", subscription.cancel_at_period_end);
  console.log("Canceled at:", subscription.canceled_at);

  const customerId = subscription.customer;
  const status = subscription.status;
  const priceId = subscription.items.data[0]?.price?.id;
  const config = PRICE_CONFIG[priceId];

  // Check if subscription is cancelled in ANY way
  const isCancelled =
    subscription.cancel_at_period_end === true ||
    status === "canceled" ||
    subscription.canceled_at !== null;

  if (isCancelled) {
    console.log("Subscription is cancelled - updating database");

    const { error } = await supabase
      .from("profiles")
      .update({
        is_subscribed: false,
        subscription_status: "cancelled",
        credits_reset_date: null,
      })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Error cancelling subscription:", error);
      throw error;
    }

    console.log(
      `Subscription cancelled for customer ${customerId}. Credits preserved.`
    );
    return;
  }

  // Not cancelled - check if active
  const isActive = ["active", "trialing"].includes(status);

  if (isActive && config) {
    const { error } = await supabase
      .from("profiles")
      .update({
        is_subscribed: true,
        subscription_status: config.name,
      })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Error updating subscription:", error);
      throw error;
    }

    console.log(
      `Subscription updated to ${config.name} for customer ${customerId}`
    );
  } else {
    const { error } = await supabase
      .from("profiles")
      .update({
        is_subscribed: false,
        subscription_status: "cancelled",
        credits_reset_date: null,
      })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Error downgrading subscription:", error);
      throw error;
    }

    console.log(`Subscription inactive for customer ${customerId}`);
  }
}
async function handleSubscriptionDeleted(subscription) {
  console.log("Subscription deleted:", subscription.id);

  const customerId = subscription.customer;

  // Keep existing credits, just stop the reset cycle
  const { error } = await supabase
    .from("profiles")
    .update({
      is_subscribed: false,
      subscription_status: "cancelled",
      credits_reset_date: null,
    })
    .eq("stripe_customer_id", customerId);

  if (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }

  console.log(
    `Subscription canceled for customer ${customerId}. Credits preserved, no future resets.`
  );
}

async function handleInvoicePaymentSucceeded(invoice) {
  console.log("Invoice payment succeeded:", invoice.id);
  console.log("Billing reason:", invoice.billing_reason);

  // Reset credits on subscription renewal (not initial purchase)
  if (invoice.billing_reason === "subscription_cycle") {
    const customerId = invoice.customer;
    const subscriptionId = invoice.subscription;

    if (!subscriptionId) return;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0]?.price?.id;
    const config = PRICE_CONFIG[priceId];

    if (!config) {
      console.error("Unknown price ID on renewal:", priceId);
      return;
    }

    const nextResetDate = getNextResetDate();

    const { error } = await supabase
      .from("profiles")
      .update({
        credits_remaining: config.tokens,
        credits_last_reset: new Date().toISOString(),
        credits_reset_date: nextResetDate,
      })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Error resetting credits:", error);
      throw error;
    }

    console.log(
      `Credits reset to ${config.tokens} for customer ${customerId}. Next reset: ${nextResetDate}`
    );
  }
}

async function handleInvoicePaymentFailed(invoice) {
  console.log("Invoice payment failed:", invoice.id);

  const customerId = invoice.customer;

  // Keep credits, just mark payment as failed
  const { error } = await supabase
    .from("profiles")
    .update({
      is_subscribed: false,
      subscription_status: "payment_failed",
      credits_reset_date: null,
    })
    .eq("stripe_customer_id", customerId);

  if (error) {
    console.error("Error updating failed payment:", error);
    throw error;
  }

  console.log(`Payment failed for customer ${customerId}, subscription paused`);
}
