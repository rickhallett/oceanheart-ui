import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe webhook events - temporarily disabled user operations during auth removal
// Keep Stripe webhook processing for payments but remove user-related operations
export async function POST(req: NextRequest) {
  const body = await req.text();

  const signature = headers().get("stripe-signature");

  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // Temporarily disabled user operations during auth removal
        // Keep payment processing but remove user-related operations
        console.log("Checkout session completed - user operations temporarily disabled");
        break;
      }

      case "checkout.session.expired": {
        // User didn't complete the transaction
        console.log("Checkout session expired");
        break;
      }

      case "customer.subscription.updated": {
        // Customer subscription updated
        console.log("Customer subscription updated - user operations temporarily disabled");
        break;
      }

      case "customer.subscription.deleted": {
        // Customer subscription deleted
        console.log("Customer subscription deleted - user operations temporarily disabled");
        break;
      }

      case "invoice.paid": {
        // Invoice paid
        console.log("Invoice paid - user operations temporarily disabled");
        break;
      }

      case "invoice.payment_failed":
        // Payment failed
        console.log("Invoice payment failed");
        break;

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("stripe error: ", e.message);
  }

  return NextResponse.json({});
}
