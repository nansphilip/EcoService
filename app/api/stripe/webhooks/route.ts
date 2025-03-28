import { StripeInstance } from "@lib/stripe";
import { StripeError } from "@stripe/stripe-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Get the body of the request
        const body = await request.text();

        // Get the signature of the request
        const headersAwaited = await headers();
        const signature = headersAwaited.get("stripe-signature");

        // Get the secret of the webhook
        const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        // If the signature or the secret is not provided, return an error
        if (!signature || !stripeWebhookSecret) {
            return NextResponse.json({ error: "No signature or secret provided" }, { status: 400 });
        }

        // Construct the event
        const event = StripeInstance.webhooks.constructEvent(body, signature, stripeWebhookSecret);

        // Log the event
        console.log("=============>> EVENT\n", event.type);

        // Manage the event
        switch (event.type) {
            case "account.updated":
                // const account = event.data.object;
                // if (account.details_submitted && account.charges_enabled) {
                    // await PrismaInstance.user.update({
                    //     where: { stripeConnectId: account.id },
                    //     data: {
                    //         isOnboarded: true,
                    //         isSeller: true,
                    //     },
                    // });
                    // console.log("RSeller onboarding completed:", account.id);
                // }
                console.log("Account updated");
                break;

            case "charge.dispute.created":
                console.log("Charge dispute created");
                break;

            case "checkout.session.completed":
                console.log("Checkout completed");
                break;

            case "file.created":
                console.log("file.created");
                break;

            case "payment_intent.payment_failed":
                console.log("payment_intent.payment_failed");
                break;

            case "payment_intent.succeeded":
                console.log("payment_intent.succeeded");
                break;

            case "payout.failed":
                console.log("payout.failed");
                break;

            case "payout.paid":
                console.log("payout.paid");
                break;

            case "product.created":
                console.log("product.created");
                break;

            case "product.updated":
                console.log("product.updated");
                break;

            // Add other event handlers as needed
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", (error as StripeError).message);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
    }
}
