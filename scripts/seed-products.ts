import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with products and categories...');

  // Create a vendor user if not exists
  let vendorUser = await prisma.user.findFirst({
    where: { email: 'vendor@ecoservice.com' }
  });

  if (!vendorUser) {
    vendorUser = await prisma.user.create({
      data: {
        name: 'Eco Service Vendor',
        email: 'vendor@ecoservice.com',
        emailVerified: true,
        isOnboarded: true,
        isSeller: true,
        role: 'VENDOR',
      }
    });
    console.log('Created vendor user for product association');
  } else {
    console.log('Using existing vendor user for product association');
  }

  // Create categories
  const categories = [
    {
      name: 'Produits de nettoyage',
      description: 'Produits écologiques pour l\'entretien de la maison',
    },
    {
      name: 'Cotons',
      description: 'Cotons réutilisables et alternatives durables',
    },
    {
      name: 'Lessives',
      description: 'Lessives écologiques et zéro déchet',
    },
    {
      name: 'Kits',
      description: 'Ensembles de produits écologiques',
    },
  ];

  for (const category of categories) {
    const existingCategory = await prisma.category.findFirst({
      where: { name: category.name },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: category,
      });
      console.log(`Created category: ${category.name}`);
    } else {
      console.log(`Category ${category.name} already exists`);
    }
  }

  // Get all categories
  const allCategories = await prisma.category.findMany();
  
  // Create products
  const products = [
    {
      name: 'Spray nettoyant multi-usage',
      description: 'Solution naturelle pour nettoyer toutes les surfaces de la maison',
      image: '/illustration/pshit 1.jpg',
      price: 12.95,
      stock: 50,
      categoryId: allCategories.find(c => c.name === 'Produits de nettoyage')?.id,
    },
    {
      name: 'Cotons lavables',
      description: 'Cotons réutilisables et écologiques pour un usage quotidien',
      image: '/illustration/coton 1.jpg',
      price: 9.95,
      stock: 100,
      categoryId: allCategories.find(c => c.name === 'Cotons')?.id,
    },
    {
      name: 'Lessive écologique concentrée',
      description: 'Lessive concentrée sans produits chimiques nocifs',
      image: '/illustration/lessive 1.jpg',
      price: 14.95,
      stock: 30,
      categoryId: allCategories.find(c => c.name === 'Lessives')?.id,
    },
    {
      name: 'Kit zéro déchet débutant',
      description: 'Ensemble de produits essentiels pour réduire vos déchets',
      image: '/illustration/produit 2.jpg',
      price: 29.95,
      stock: 20,
      categoryId: allCategories.find(c => c.name === 'Kits')?.id,
    },
    {
      name: 'Nettoyant pour vitres',
      description: 'Nettoyant écologique pour des vitres sans traces',
      image: '/illustration/pshit 2.jpg',
      price: 11.50,
      stock: 40,
      categoryId: allCategories.find(c => c.name === 'Produits de nettoyage')?.id,
    },
    {
      name: 'Cotons démaquillants',
      description: 'Cotons lavables spécialement conçus pour le démaquillage',
      image: '/illustration/coton 2.jpg',
      price: 11.95,
      stock: 85,
      categoryId: allCategories.find(c => c.name === 'Cotons')?.id,
    },
    {
      name: 'Lessive pour linge délicat',
      description: 'Lessive douce pour vos vêtements délicats',
      image: '/illustration/lessive 2.jpg',
      price: 16.95,
      stock: 25,
      categoryId: allCategories.find(c => c.name === 'Lessives')?.id,
    },
    {
      name: 'Kit salle de bain',
      description: 'Ensemble complet pour une salle de bain zéro déchet',
      image: '/illustration/coton 3.jpg',
      price: 34.95,
      stock: 15,
      categoryId: allCategories.find(c => c.name === 'Kits')?.id,
    },
  ];

  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: {
          ...product,
          vendorId: vendorUser.id, // Use the vendor user id for all products
        },
      });
      console.log(`Created product: ${product.name}`);
    } else {
      console.log(`Product ${product.name} already exists`);
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 