import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// One-time payment price IDs
const ONE_TIME_PRICES = ["price_1SpUhsGTsfq9NWHAodt5avHo"]; // 15 Token Pack

export async function POST(req) {
  try {
    const { priceID, email, userId } = await req.json();

    if (!priceID || !email || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: priceID, email, userId" },
        { status: 400 }
      );
    }

    // Determine if this is a one-time payment or subscription
    const isOneTime = ONE_TIME_PRICES.includes(priceID);

    // Build session configuration
    const sessionConfig = {
      line_items: [{ price: priceID, quantity: 1 }],
      customer_email: email,
      metadata: { userId },
      success_url: `${process.env.NEXT_PUBLIC_HOST_NAME}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST_NAME}/dashboard?payment=cancelled`,
    };

    if (isOneTime) {
      // One-time payment for token packs
      sessionConfig.mode = "payment";
    } else {
      // Recurring subscription
      sessionConfig.mode = "subscription";
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
