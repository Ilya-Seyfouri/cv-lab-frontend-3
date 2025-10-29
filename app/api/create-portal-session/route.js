// Example: /api/create-portal-session or in your backend
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { customerId } = await req.json();

    // Create a portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_HOST_NAME}/dashboard`, // Where to redirect after
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
