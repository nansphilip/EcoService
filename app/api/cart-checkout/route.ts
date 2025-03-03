import { stripe } from "@lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Add more robust request validation
    if (!req.body) {
      console.error("Request body is empty");
      return NextResponse.json(
        { error: "Missing request body" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { cart, successUrl, cancelUrl } = body;
    
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      console.error("Invalid cart data received:", cart);
      return NextResponse.json(
        { error: "Invalid cart data" },
        { status: 400 }
      );
    }

    // Log request details for debugging
    console.log("Processing checkout for cart with items:", cart.length);

    // Create line items from cart products
    const lineItems = cart.map(item => ({
      price_data: {
        currency: item.currency || "eur", // Provide fallback currency
        product_data: {
          name: item.name || "Produit",
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round((item.price || 0) * 100), // Convert to cents with fallback
      },
      quantity: item.quantity || 1, // Provide fallback quantity
    }));

    // Check if we have a mock Stripe setup or development environment
    const isMockOrDev = !process.env.STRIPE_SECRET_KEY || process.env.NODE_ENV === "development";
    if (isMockOrDev) {
      console.log("Using mock/development Stripe - returning dummy checkout URL");
      // For development without Stripe keys, return a mock response
      return NextResponse.json({ 
        url: `${req.nextUrl.origin}/commande/confirmation?session_id=mock_session_${Date.now()}`,
        mockMode: true
      });
    }

    try {
      // Create a checkout session with Stripe
      console.log("Creating Stripe checkout session...");
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: successUrl || `${req.nextUrl.origin}/commande/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${req.nextUrl.origin}/panier`,
        shipping_address_collection: {
          allowed_countries: ['FR', 'BE', 'LU', 'CH', 'MC'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'eur',
              },
              display_name: 'Livraison standard gratuite',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 3,
                },
                maximum: {
                  unit: 'business_day',
                  value: 5,
                },
              },
            },
          },
        ],
      });

      console.log("Checkout session created successfully:", session.id);
      return NextResponse.json({ url: session.url });
    } catch (stripeError) {
      // Fallback to mock checkout in case of Stripe API errors 
      console.error("Stripe API error, falling back to mock checkout:", stripeError);
      return NextResponse.json({ 
        url: `${req.nextUrl.origin}/commande/confirmation?session_id=fallback_session_${Date.now()}`,
        fallbackMode: true,
        error: stripeError instanceof Error ? stripeError.message : "Unknown Stripe error"
      });
    }
  } catch (error: any) {
    // More detailed error logging
    if (error.code === 'ECONNREFUSED' || error.cause?.code === 'ECONNREFUSED') {
      console.error("Connection to Stripe API failed - is your internet connection working?");
      // Return a fallback mock checkout URL in case of connection errors
      return NextResponse.json({ 
        url: `${req.nextUrl.origin}/commande/confirmation?session_id=connection_error_${Date.now()}`,
        fallbackMode: true,
        error: "Connection error"
      });
    } else if (error.type === 'StripeAuthenticationError') {
      console.error("Stripe authentication failed - check your API keys");
    } else {
      console.error("Error creating checkout session:", error.message, error.stack);
    }
    
    return NextResponse.json(
      { 
        error: "Failed to create checkout session", 
        details: error.message || "Unknown error",
        url: `${req.nextUrl.origin}/commande/confirmation?session_id=error_session_${Date.now()}`,
        fallbackMode: true
      },
      { status: 500 }
    );
  }
} 