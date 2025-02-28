import { SliderClient } from "@comps/client/Slider";
import CategoryProductSection from "@comps/server/CategoryProductSection";
import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";
import { Product, fetchProductsByCategory, fetchProductsFromStripe, formatPrice, getImageUrl } from "@lib/products";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
    const imageClass = "h-[100px] sm:h-[150px] md:h-[120px] lg:h-[160px] xl:h-[220px] rounded";
    
    // Fetch products grouped by category
    const { categories, productsByCategory } = await fetchProductsByCategory();
    
    // Also fetch all products for the featured section
    const allProducts = await fetchProductsFromStripe();
    
    // Get featured products (first 4 products or fewer if less are available)
    const featuredProducts = allProducts.slice(0, 4);
    
    // Convert Map to array for easier manipulation
    const categoriesWithProducts = categories
        .filter(category => productsByCategory.has(category.id))
        .map(category => ({
            category,
            products: productsByCategory.get(category.id) || []
        }))
        .filter(({ products }) => products.length > 0);
    
    return (
        <>
            {/* Hero Section with gradient background */}
            <section className="bg-gradient-to-br from-[#0A0A2C] to-[#1a1a4b] py-16 text-white">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                                <span className="text-secondary">Passez au</span><br />
                                zéro déchet
                            </h1>
                            <p className="mt-6 max-w-2xl text-xl text-gray-300">
                                Des solutions durables pour un avenir plus vert
                            </p>
                            <Link 
                                href="/catalogue" 
                                className="mt-8 inline-block rounded-full bg-secondary px-8 py-3 font-medium text-primary transition-all hover:bg-secondary/90"
                            >
                                Découvrir nos produits
                            </Link>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <ImageRatio
                                src="/illustration/produit 2.jpg"
                                alt="produit"
                                className={combo("rounded-lg shadow-lg", imageClass)}
                            />
                            <ImageRatio
                                src="/illustration/coton 3.jpg"
                                alt="coton"
                                className={combo("max-md:hidden rounded-lg shadow-lg", imageClass)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-primary">Produits populaires</h2>
                        <p className="mt-4 text-gray-600">Découvrez notre sélection de produits écologiques les plus appréciés</p>
                    </div>
                    
                    {featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <Link 
                                    href={`/produit/${product.id}`}
                                    key={product.id}
                                    className="group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg"
                                >
                                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                                        {product.images && product.images.length > 0 ? (
                                            <Image
                                                src={getImageUrl(product.images[0])}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="flex aspect-[3/2] w-full items-center justify-center bg-gray-100">
                                                <span className="text-gray-400">Pas d'image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="mb-1 text-lg font-semibold text-primary">{product.name}</h3>
                                        <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                                            {product.description || "Aucune description disponible"}
                                        </p>
                                        <p className="text-lg font-bold text-secondary">
                                            {product.default_price ? formatPrice(product.default_price.unit_amount) : "Prix indisponible"}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-500">Aucun produit disponible pour le moment</p>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Slider section with product images */}
            <section className="bg-gray-50 py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <h2 className="mb-8 text-center text-2xl font-bold text-primary">Nos produits en images</h2>
                    <SliderClient
                        imageList={[
                            "/illustration/pshit 1.jpg",
                            "/illustration/pshit 2.jpg",
                            "/illustration/coton 1.jpg",
                            "/illustration/coton 2.jpg",
                            "/illustration/coton 3.jpg",
                            "/illustration/lessive 1.jpg",
                            "/illustration/lessive 2.jpg",
                        ]}
                    />
                </div>
            </section>

            {/* Products by Category Sections */}
            {categoriesWithProducts.map((item, index) => (
                <CategoryProductSection 
                    key={item.category.id}
                    category={item.category}
                    products={item.products}
                    variant={index % 2 === 1 ? "dark" : "light"}
                />
            ))}

            {/* If no categorized products found, show a message */}
            {categoriesWithProducts.length === 0 && (
                <section className="flex flex-col items-center justify-center p-16 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-primary">Catégories de produits</h2>
                    <p className="mb-8 text-gray-600">
                        Nous travaillons à ajouter de nouveaux produits à notre catalogue.
                        Revenez bientôt pour découvrir nos offres écologiques par catégorie.
                    </p>
                </section>
            )}
            
            {/* Call to Action Section */}
            <section className="bg-primary py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h2 className="text-3xl font-bold">Rejoignez notre aventure écologique</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-200">
                        Ensemble, faisons un pas vers un mode de vie plus durable et respectueux de l'environnement.
                    </p>
                    <div className="mt-8">
                        <Link 
                            href="/catalogue" 
                            className="rounded-full bg-white px-8 py-3 font-medium text-primary shadow-lg transition-all hover:bg-gray-100"
                        >
                            Voir tous les produits
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
