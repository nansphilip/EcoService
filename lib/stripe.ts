import Stripe from "stripe";

// More comprehensive mock Stripe client for development when API key is not set
const createMockStripe = () => {
  console.warn("Using mock Stripe client because STRIPE_SECRET_KEY is not set");
  
  // Utility function to create mock responses with safe defaults
  const createSafeResponse = <T>(data: T[]): any => {
    // Return a structure that matches what's needed but bypass strict typing
    return {
      object: 'list',
      data: data,
      has_more: false,
      url: '/mock',
      // Add the missing lastResponse property required by Stripe types
      lastResponse: {
        headers: {},
        requestId: 'mock_req_id',
        statusCode: 200,
        apiVersion: '2025-01-27',
      }
    };
  };
  
  // Return a robust mock implementation that handles common Stripe operations
  return {
    products: {
      list: async () => createSafeResponse([
        // Optional: Add some mock products for development
        // {
        //   id: 'mock_prod_1',
        //   name: 'Mock Product 1',
        //   description: 'A mock product for development',
        //   images: ['/illustration/coton 1.jpg'],
        //   active: true,
        //   default_price: {
        //     id: 'mock_price_1',
        //     unit_amount: 1000,
        //     currency: 'eur',
        //   },
        // }
      ]),
      retrieve: async () => ({
        id: 'mock_product',
        name: 'Mock Product',
        description: 'This is a mock product',
        images: [],
        active: true,
      }),
      create: async () => ({
        id: 'mock_product',
        name: 'Mock Product',
        description: 'This is a mock product',
        images: [],
        active: true,
      }),
    },
    prices: {
      list: async () => createSafeResponse([]),
      retrieve: async () => ({
        id: 'mock_price',
        product: 'mock_product',
        unit_amount: 1000,
        currency: 'eur',
        active: true,
      }),
    },
    checkout: {
      sessions: {
        create: async () => ({
          id: 'mock_session',
          url: '#',
        }),
      },
    },
    // Add other mock implementations as needed
  } as unknown as Stripe;
};

// Initialize Stripe client with a safer approach
let stripeClient: Stripe;

try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-01-27.acacia", // Use a valid API version
      typescript: true,
      appInfo: {
        name: "EcoService Marketplace",
        version: "0.1.0",
      },
    });
  } else {
    stripeClient = createMockStripe();
  }
} catch (error) {
  console.error("Failed to initialize Stripe client:", error);
  stripeClient = createMockStripe();
}

export const stripe = stripeClient;

export const getStripePublicKey = () => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
        console.warn("STRIPE_PUBLISHABLE_KEY is not set in environment variables");
        return "pk_test_mock_key"; // Return a mock key for development
    }
    return key;
};
