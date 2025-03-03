import { stripe } from "@lib/stripe";
import PrismaInstance from "@lib/prisma";
import { Category, Product as DbProduct } from "@prisma/client";
import Stripe from "stripe";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  default_price: {
    id: string;
    unit_amount: number;
    currency: string;
  } | null;
  categoryId?: string | null;
  category?: Category | null;
}

/**
 * Safely access Stripe product price details with proper type checking
 */
function extractPriceDetails(price: any): { id: string; unit_amount: number; currency: string } | null {
  if (!price) return null;
  
  try {
    return {
      id: price.id || 'unknown',
      unit_amount: typeof price.unit_amount === 'number' ? price.unit_amount : 0,
      currency: typeof price.currency === 'string' ? price.currency : 'eur'
    };
  } catch (e) {
    console.warn('Failed to extract price details:', e);
    return null;
  }
}

/**
 * Fetch all active products directly from Stripe without DB interactions
 */
export async function fetchProductsFromStripe(): Promise<Product[]> {
  try {
    // Use the safe mock implementation if no Stripe key
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn("STRIPE_SECRET_KEY is not set. Using mock products.");
      return createMockProducts();
    }

    // Use a try/catch solely for the Stripe API call
    try {
      const response = await stripe.products.list({
        expand: ["data.default_price"],
        active: true,
      });
      
      // Verify response shape
      if (!response || !Array.isArray(response.data)) {
        console.warn("Invalid response structure from Stripe API");
        return createMockProducts();
      }
      
      // Map Stripe products to our Product interface
      return response.data.map(product => {
        const priceDetails = extractPriceDetails(product.default_price);
        
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          images: Array.isArray(product.images) ? product.images : [],
          default_price: priceDetails,
          // Skip database interactions
          categoryId: null,
          category: null
        };
      });
    } catch (stripeError) {
      console.error("Error calling Stripe API:", stripeError);
      return createMockProducts();
    }
  } catch (error) {
    console.error("Error in fetchProductsFromStripe:", error);
    return createMockProducts();
  }
}

/**
 * Create mock products for development or when Stripe API fails
 */
function createMockProducts(): Product[] {
  return [
    {
      id: 'mock_prod_1',
      name: 'Coton lavable',
      description: 'Coton réutilisable et écologique pour un usage quotidien',
      images: ['/illustration/coton 1.jpg'],
      default_price: {
        id: 'mock_price_1',
        unit_amount: 995,
        currency: 'eur'
      },
      categoryId: null,
      category: null
    },
    {
      id: 'mock_prod_2',
      name: 'Spray nettoyant multi-usage',
      description: 'Solution naturelle pour nettoyer toutes les surfaces',
      images: ['/illustration/pshit 1.jpg'],
      default_price: {
        id: 'mock_price_2',
        unit_amount: 1295,
        currency: 'eur'
      },
      categoryId: null,
      category: null
    },
    {
      id: 'mock_prod_3',
      name: 'Lessive écologique',
      description: 'Lessive concentrée sans produits chimiques nocifs',
      images: ['/illustration/lessive 1.jpg'],
      default_price: {
        id: 'mock_price_3',
        unit_amount: 1495,
        currency: 'eur'
      },
      categoryId: null,
      category: null
    },
    {
      id: 'mock_prod_4',
      name: 'Kit zéro déchet',
      description: 'Ensemble de produits essentiels pour réduire vos déchets',
      images: ['/illustration/produit 2.jpg'],
      default_price: {
        id: 'mock_price_4',
        unit_amount: 2995,
        currency: 'eur'
      },
      categoryId: null,
      category: null
    }
  ];
}

/**
 * Group products by their categories - simplified to work without DB categories
 */
export function groupProductsByCategory(products: Product[]): Map<string, Product[]> {
  // Since we're not using DB categories, create mock categories based on product names
  const groupedProducts = new Map<string, Product[]>();
  
  // Group products into some default categories
  products.forEach(product => {
    let categoryId = 'default';
    let categoryName = 'Nos produits';
    
    // Try to categorize based on product name or description
    if (product.name.toLowerCase().includes('coton') || 
        (product.description && product.description.toLowerCase().includes('coton'))) {
      categoryId = 'coton';
      categoryName = 'Cotons';
    } else if (product.name.toLowerCase().includes('spray') || 
               product.name.toLowerCase().includes('nettoy') ||
               (product.description && product.description.toLowerCase().includes('nettoy'))) {
      categoryId = 'nettoyage';
      categoryName = 'Produits de nettoyage';
    } else if (product.name.toLowerCase().includes('lessive') || 
               (product.description && product.description.toLowerCase().includes('lessive'))) {
      categoryId = 'lessive';
      categoryName = 'Lessives';
    } else if (product.name.toLowerCase().includes('kit') || 
               (product.description && product.description.toLowerCase().includes('kit'))) {
      categoryId = 'kits';
      categoryName = 'Kits';
    }
    
    // Create the category if it doesn't exist
    if (!groupedProducts.has(categoryId)) {
      groupedProducts.set(categoryId, []);
      
      // Add a mock category to the product
      product.categoryId = categoryId;
      product.category = {
        id: categoryId,
        name: categoryName,
        description: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    
    // Add product to the category
    groupedProducts.get(categoryId)?.push(product);
  });
  
  return groupedProducts;
}

/**
 * Fetch all categories - simplified to use mock categories
 */
export async function fetchCategories(): Promise<Category[]> {
  // Create some default categories
  return [
    { id: 'coton', name: 'Cotons', description: null, createdAt: new Date(), updatedAt: new Date() },
    { id: 'nettoyage', name: 'Produits de nettoyage', description: null, createdAt: new Date(), updatedAt: new Date() },
    { id: 'lessive', name: 'Lessives', description: null, createdAt: new Date(), updatedAt: new Date() },
    { id: 'kits', name: 'Kits', description: null, createdAt: new Date(), updatedAt: new Date() },
    { id: 'default', name: 'Nos produits', description: null, createdAt: new Date(), updatedAt: new Date() }
  ];
}

/**
 * Fetch products grouped by category - simplified to work without DB
 */
export async function fetchProductsByCategory(): Promise<{
  categories: Category[];
  productsByCategory: Map<string, Product[]>;
}> {
  try {
    // Fetch products from Stripe
    const products = await fetchProductsFromStripe();
    
    // Get mock categories
    const categories = await fetchCategories();
    
    // Group products into categories
    const productsByCategory = groupProductsByCategory(products);
    
    return {
      categories,
      productsByCategory
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    // Return empty data instead of failing
    return {
      categories: [],
      productsByCategory: new Map()
    };
  }
}

/**
 * Format price from cents to currency format
 */
export function formatPrice(amount: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100);
}

/**
 * Get the image URL from a Stripe format
 */
export function getImageUrl(imageUrl: string): string {
  if (!imageUrl) return '/illustration/coton 1.jpg'; // Default image if none provided
  
  // If it's already a local path, return it
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  // Handle Stripe file URLs
  if (imageUrl.includes("/v1/files/")) {
    const fileId = imageUrl.split("/").pop();
    return `https://files.stripe.com/links/${fileId}`;
  }
  
  return imageUrl;
} 