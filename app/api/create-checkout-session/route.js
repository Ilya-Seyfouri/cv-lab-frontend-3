import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Parse the JSON body from the request
    const { priceID, email, userId } = await req.json();

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceID, quantity: 1 }],
      customer_email: email,
      metadata: { userId },
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_HOST_NAME}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST_NAME}/dashboard`,
    });

    // Return the checkout URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
