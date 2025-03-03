import { GetSession } from "@lib/auth";
import PrismaInstance from "@lib/prisma";
import { stripe } from "@lib/stripe";
import { NextResponse, NextRequest } from "next/server";
import { fetchProductsFromStripe, getImageUrl } from '@lib/products';

export async function GET(req: NextRequest) {
    try {
        // Parse query parameters
        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const priceOrder = searchParams.get('priceOrder') as 'asc' | 'desc' | null;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const take = parseInt(searchParams.get('take') || '10', 10);

        // Fetch all products from Stripe
        const allProducts = await fetchProductsFromStripe();
        
        // Apply filters
        let filteredProducts = [...allProducts];
        
        // Apply category filter if specified
        if (category) {
            filteredProducts = filteredProducts.filter(product => 
                product.categoryId === category
            );
        }
        
        // Apply search filter if specified
        if (search) {
            const searchLower = search.toLowerCase();
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchLower) || 
                (product.description && product.description.toLowerCase().includes(searchLower))
            );
        }
        
        // Apply sorting if specified
        if (priceOrder === "asc") {
            filteredProducts.sort((a, b) => 
                (a.default_price?.unit_amount || 0) - (b.default_price?.unit_amount || 0)
            );
        } else if (priceOrder === "desc") {
            filteredProducts.sort((a, b) => 
                (b.default_price?.unit_amount || 0) - (a.default_price?.unit_amount || 0)
            );
        }
        
        // Get total count for pagination
        const total = filteredProducts.length;
        
        // Apply pagination
        const startIndex = (page - 1) * take;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + take);
        
        // Convert to the format expected by the ProductType on client side
        const adaptedProducts = paginatedProducts.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description || "",
            image: product.images && product.images.length > 0 ? getImageUrl(product.images[0]) : "/illustration/coton 1.jpg",
            price: product.default_price ? product.default_price.unit_amount / 100 : 0,
            stock: 100, // Default stock since Stripe doesn't track inventory
            createdAt: new Date(),
            updatedAt: new Date(),
            vendorId: "",
            categoryId: product.categoryId || null
        }));

        return NextResponse.json({ 
            products: adaptedProducts, 
            total,
            page,
            take
        });
        
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await GetSession();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const amount = formData.get("amount") as string;
        const currency = formData.get("currency") as string;
        const image = formData.get("image") as File;
        const categoryId = formData.get("categoryId") as string; // ✅ Récupérer la catégorie

        if (!name || !description || !amount || !categoryId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Vérifier si la catégorie existe en BDD
        const categoryExists = await PrismaInstance.category.findUnique({
            where: { id: categoryId },
        });

        if (!categoryExists) {
            return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
        }

        let imageUrl: string | undefined;

        if (image) {
            try {
                console.log("Uploading image:", image.name, image.type);

                // Convert File to Buffer
                const bytes = await image.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Upload file to Stripe
                const fileUpload = await stripe.files.create({
                    purpose: "dispute_evidence",
                    file: {
                        data: buffer,
                        name: image.name,
                        type: "application/octet-stream",
                    },
                });

                console.log("File uploaded to Stripe:", fileUpload.id);

                // Create a file link for the uploaded file
                const fileLink = await stripe.fileLinks.create({
                    file: fileUpload.id,
                    expires_at: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1 year from now
                });

                console.log("File link created:", fileLink.url);
                imageUrl = fileLink.url || undefined;
            } catch (uploadError) {
                console.error("Error uploading image to Stripe:", uploadError);
                throw new Error("Failed to upload image to Stripe");
            }
        }

        console.log("Creating product with image URL:", imageUrl);

        // ✅ Créer le produit en BDD avec la catégorie
        const product = await PrismaInstance.product.create({
            data: {
                name,
                description,
                image: imageUrl || "",
                price: parseFloat(amount),
                stock: 10,
                categoryId, // 🔥 Lien avec la catégorie
                vendorId: session.user.id,
            },
        });

        console.log("Product created:", product.id);

        // ✅ Créer un produit dans Stripe
        const stripeProduct = await stripe.products.create({
            name,
            description,
            images: imageUrl ? [imageUrl] : undefined,
            shippable: false,
            type: "service",
        });

        console.log("Stripe Product created:", stripeProduct.id);

        // ✅ Créer un prix Stripe pour le produit
        const price = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: Math.round(parseFloat(amount) * 100), // Convert to cents
            currency: currency.toLowerCase(),
        });

        console.log("Price created:", price.id);

        // ✅ Associer le prix Stripe au produit
        await stripe.products.update(stripeProduct.id, {
            default_price: price.id,
        });

        return NextResponse.json({ data: product });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: (error as Error).message || "Error creating product" }, { status: 500 });
    }
}
