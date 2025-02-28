import { fetchProductsFromStripe, formatPrice, getImageUrl } from "@lib/products";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButtonWrapper } from "@comps/client/AddToCartButtonWrapper";

type PageProps = {
    params: { id: string };
};

export default async function Page({ params }: PageProps) {
    // Always cast params.id as string to ensure it's not a Promise
    const id = params.id as string;

    // Fetch all products
    const products = await fetchProductsFromStripe();
    
    // Find the specific product by ID
    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="flex h-96 flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-primary">Produit non trouvé</h1>
                <p className="mt-4 text-gray-600">Le produit que vous recherchez n'existe pas.</p>
                <Link 
                    href="/catalogue" 
                    className="mt-8 rounded-full bg-primary px-6 py-2 text-white transition-all hover:bg-primary/90"
                >
                    Retour au catalogue
                </Link>
            </div>
        );
    }

    // Get similar products (excluding current product)
    const similarProducts = products
        .filter(p => p.id !== id)
        .filter(p => p.categoryId === product.categoryId || !product.categoryId)
        .slice(0, 3);

    // Format product details
    const price = product.default_price 
        ? formatPrice(product.default_price.unit_amount, product.default_price.currency)
        : "Prix indisponible";
    
    const priceValue = product.default_price?.unit_amount 
        ? product.default_price.unit_amount / 100
        : null;
        
    const currency = product.default_price?.currency || "eur";
    
    const imageUrl = product.images && product.images.length > 0
        ? getImageUrl(product.images[0])
        : "/illustration/coton 1.jpg";

    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            {/* Main product section */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {/* Product image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#5BCFCF]">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain"
                        unoptimized
                    />
                </div>

                {/* Product info */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-[#12123A] md:text-4xl">
                        {product.name}
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Réf: {product.id.substring(0, 8)}
                    </p>
                    <div className="mt-6 text-2xl font-bold text-[#12123A]">
                        {price}
                    </div>
                    <div className="mt-6 text-gray-700">
                        {product.description || "Aucune description disponible pour ce produit."}
                    </div>
                    <div className="mt-8">
                        <AddToCartButtonWrapper
                            product={{
                                id: product.id,
                                name: product.name,
                                price: priceValue,
                                currency: currency,
                                image: imageUrl
                            }}
                            className="rounded-full bg-[#12123A] px-6 py-3 text-white transition-all hover:bg-[#12123A]/90"
                        />
                    </div>
                </div>
            </div>

            {/* Similar products section */}
            <div className="mt-24">
                <h2 className="mb-8 text-2xl font-bold text-[#12123A]">
                    Produits similaires
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {similarProducts.map(relatedProduct => {
                        const relatedImageUrl = relatedProduct.images && relatedProduct.images.length > 0
                            ? getImageUrl(relatedProduct.images[0])
                            : "/illustration/coton 1.jpg";

                        return (
                            <Link
                                key={relatedProduct.id}
                                href={`/produit/${relatedProduct.id}`}
                                className="overflow-hidden rounded-lg transition-transform hover:scale-105"
                            >
                                <div className="aspect-[4/3] bg-[#5BCFCF]">
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={relatedImageUrl}
                                            alt={relatedProduct.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Newsletter section */}
            <div className="mt-24 rounded-lg bg-[#12123A] px-8 py-12 text-white">
                <h2 className="mb-6 text-2xl font-bold">
                    Inscrivez-vous à notre newsletter
                </h2>
                <p className="mb-6 text-gray-300">
                    Recevez les dernières nouvelles et offres spéciales directement dans votre boîte de réception.
                </p>
                <div className="flex max-w-md flex-col gap-4 sm:flex-row">
                    <input
                        type="email"
                        placeholder="Votre email"
                        className="flex-1 rounded-md border border-gray-600 bg-transparent px-4 py-2 text-white"
                    />
                    <Link
                        href="#"
                        className="rounded-md bg-[#5BCFCF] px-6 py-2 text-[#12123A] transition-all hover:bg-[#5BCFCF]/90"
                    >
                        Envoyer
                    </Link>
                </div>
            </div>
        </div>
    );
}
