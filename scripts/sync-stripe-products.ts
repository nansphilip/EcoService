import { PrismaClient } from '@prisma/client';
import { stripe } from '../lib/stripe';

const prisma = new PrismaClient();

// Set a hardcoded public URL for testing
const PUBLIC_SITE_URL = 'https://raw.githubusercontent.com/public-apis/public-apis/master/assets';
const USE_REAL_IMAGES = true; // Force using real images for testing

/**
 * Syncs all database products to Stripe
 * - Creates products in Stripe for all database products that don't exist yet
 * - Creates prices for each product
 */
async function main() {
  console.log('🔄 Syncing database products to Stripe...');
  console.log(`✅ Using public image URL for testing: ${PUBLIC_SITE_URL}`);

  try {
    // Check if we have a Stripe API key
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ Error: STRIPE_SECRET_KEY is not set in your environment variables.');
      console.log('Please set your Stripe secret key and try again.');
      process.exit(1);
    }

    // Get all products from the database
    const dbProducts = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    if (dbProducts.length === 0) {
      console.log('ℹ️ No products found in the database. Nothing to sync.');
      return;
    }

    console.log(`Found ${dbProducts.length} products in the database.`);

    // Get existing Stripe products to avoid duplication
    const stripeProducts = await stripe.products.list({
      limit: 100,
      active: true,
    });

    console.log(`Found ${stripeProducts.data.length} products in Stripe.`);

    // Create a map of existing Stripe products by name for quick lookup
    const existingStripeProductsByName = new Map();
    for (const product of stripeProducts.data) {
      existingStripeProductsByName.set(product.name.toLowerCase(), product);
    }

    // Created and updated counters
    let created = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    // Process each product
    for (const dbProduct of dbProducts) {
      console.log(`\n🔄 Processing: ${dbProduct.name} (ID: ${dbProduct.id})`);

      try {
        // Create a real public image URL for this product
        const imagesArray = [`${PUBLIC_SITE_URL}/logo.png`];
        console.log(`🖼️ Using public test image: ${imagesArray[0]}`);

        // Check if product already exists in Stripe by looking up its name
        const existingProduct = existingStripeProductsByName.get(dbProduct.name.toLowerCase());

        if (existingProduct) {
          console.log(`📋 Product already exists in Stripe (ID: ${existingProduct.id})`);

          // Update the product in Stripe with any changes
          const updatedProduct = await stripe.products.update(existingProduct.id, {
            name: dbProduct.name,
            description: dbProduct.description || undefined,
            images: imagesArray,
            metadata: {
              dbProductId: dbProduct.id.toString(),
              categoryId: dbProduct.categoryId?.toString() || '',
              categoryName: dbProduct.category?.name || '',
            },
          });

          console.log(`✅ Updated product in Stripe: ${updatedProduct.id}`);

          // Check if the product has a price already
          const existingPrices = await stripe.prices.list({
            product: existingProduct.id,
            active: true,
            limit: 1,
          });

          const existingPrice = existingPrices.data[0];
          const currentPriceInCents = Math.round(dbProduct.price * 100);

          // If there's an existing price and it matches the current price, skip price creation
          if (existingPrice && existingPrice.unit_amount === currentPriceInCents) {
            console.log(`💰 Price already exists and is current: ${existingPrice.id} (${dbProduct.price}€)`);
          } else {
            // Create a new price for the product
            const newPrice = await stripe.prices.create({
              product: updatedProduct.id,
              unit_amount: currentPriceInCents,
              currency: 'eur',
            });
            console.log(`💰 Created new price: ${newPrice.id} (${dbProduct.price}€)`);

            // Deactivate the old price if it exists
            if (existingPrice) {
              await stripe.prices.update(existingPrice.id, { active: false });
              console.log(`💰 Deactivated old price: ${existingPrice.id}`);
            }
          }

          updated++;
        } else {
          // Create a new product in Stripe
          console.log('🆕 Creating new product in Stripe...');
          const newProduct = await stripe.products.create({
            name: dbProduct.name,
            description: dbProduct.description || undefined,
            images: imagesArray,
            metadata: {
              dbProductId: dbProduct.id.toString(),
              categoryId: dbProduct.categoryId?.toString() || '',
              categoryName: dbProduct.category?.name || '',
            },
          });

          console.log(`✅ Created product in Stripe: ${newProduct.id}`);

          // Create a price for the product
          const priceInCents = Math.round(dbProduct.price * 100);
          const newPrice = await stripe.prices.create({
            product: newProduct.id,
            unit_amount: priceInCents,
            currency: 'eur',
          });

          console.log(`💰 Created price: ${newPrice.id} (${dbProduct.price}€)`);
          created++;
        }
      } catch (error: any) {
        console.error(`❌ Error processing product ${dbProduct.name} (${dbProduct.id}):`, error.message);
        if (error.type === 'StripeInvalidRequestError') {
          console.log(`   Stripe API Error: ${error.message}`);
          console.log(`   For more information, see: ${error.doc_url || 'https://stripe.com/docs'}`);
        }
        errors++;
      }
    }

    // Summary
    console.log('\n=== Sync Summary ===');
    console.log(`✅ Created: ${created} products`);
    console.log(`🔄 Updated: ${updated} products`);
    console.log(`⏭️ Skipped: ${skipped} products`);
    console.log(`❌ Errors: ${errors} products`);
    console.log('====================');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => console.log('✅ Sync complete!'))
  .catch((error) => {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }); 