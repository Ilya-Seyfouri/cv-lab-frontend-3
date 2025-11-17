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

// Add these price IDs at the top
const PREMIUM_PRICE_ID = "price_1SUSl4GTsfq9NWHAdMHCbsz5";
const CAREER_MAX_PRICE_ID = "price_1SUSqmGTsfq9NWHAs88j0NDn";


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

  const userId = session.metadata.userId;
  const customerId = session.customer;

  if (!userId) {
    console.error("No userId in session metadata");
    return;
  }

  // Get the price ID to determine which plan
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
  const priceId = lineItems.data[0]?.price?.id;

  // Set subscription details based on plan
  let subscription_status = "Premium";
  let credits_remaining = 100;

  if (priceId === CAREER_MAX_PRICE_ID) {
    subscription_status = "Career Max";
    credits_remaining = 999999;
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      stripe_customer_id: customerId,
      is_subscribed: true,
      subscription_status: subscription_status,
      credits_remaining: credits_remaining,
      credits_last_reset: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }

  console.log(`User ${userId} upgraded to ${subscription_status}`);
}

async function handleSubscriptionUpdated(subscription) {
  console.log("Subscription updated:", subscription.id);

  const customerId = subscription.customer;
  const status = subscription.status;
  const priceId = subscription.items.data[0]?.price?.id;

  // If subscription is active or trialing, they're Pro. Otherwise, Free.
  const isPro = ["active", "trialing"].includes(status);

  // Determine plan type
  let subscription_status = "free";
  let credits_remaining = 3;

  if (isPro) {
    if (priceId === CAREER_MAX_PRICE_ID) {
      subscription_status = "Career Max";
      credits_remaining = 999999;
    } else {
      subscription_status = "Premium";
      credits_remaining = 100;
    }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      is_subscribed: isPro,
      subscription_status: subscription_status,
      credits_remaining: credits_remaining,
      credits_last_reset: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId);

  if (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription) {
  console.log("Subscription deleted:", subscription.id);

  const customerId = subscription.customer;

  const { error } = await supabase
    .from("profiles")
    .update({
      is_subscribed: false,
      subscription_status: "free",
      credits_remaining: 3,
      credits_last_reset: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId);

  if (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }

  console.log(
    `Subscription canceled for customer ${customerId}, reverted to Free`
  );
}

async function handleInvoicePaymentSucceeded(invoice) {
  console.log("Invoice payment succeeded:", invoice.id);

  // Only reset on monthly renewals
  if (invoice.billing_reason === "subscription_cycle") {
    const customerId = invoice.customer;
    const subscriptionId = invoice.subscription;

    if (!subscriptionId) return;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0]?.price?.id;

    let credits_remaining = 100;
    if (priceId === CAREER_MAX_PRICE_ID) {
      credits_remaining = 999999;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        credits_remaining: credits_remaining,
        credits_last_reset: new Date().toISOString(),
      })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Error resetting credits:", error);
      throw error;
    }

    console.log(
      `Credits reset for customer ${customerId} to ${credits_remaining}`
    );
  }
}

async function handleInvoicePaymentFailed(invoice) {
  console.log("Invoice payment failed:", invoice.id);

  const customerId = invoice.customer;

  const { error } = await supabase
    .from("profiles")
    .update({
      is_subscribed: false,
      subscription_status: "free",
      credits_remaining: 3,
    })
    .eq("stripe_customer_id", customerId);

  if (error) {
    console.error("Error updating failed payment:", error);
    throw error;
  }
}
