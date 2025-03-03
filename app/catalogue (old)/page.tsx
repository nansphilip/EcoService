import { SelectCategoryList } from "@actions/database/Categories";
import Link from "next/link";
import { fetchProductsFromStripe, getImageUrl, Product as StripeProduct } from "@lib/products";
import CatalogueClient from "./components/CatalogueClient";
import FilterProvider from "./components/FilterProvider";
import FilterSelectClient from "./components/FilterSelectClient";
import { QueryParamType, queryParamCached } from "./components/FilterTypes";

type PageProps = {
    searchParams: Promise<QueryParamType>;
};

// Adapter function to convert Stripe products to the format expected by the catalogue components
function adaptToProductType(stripeProducts: StripeProduct[]) {
    return stripeProducts.map(product => ({
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
}

export default async function Page(props: PageProps) {
    const { searchParams } = props;

    const { priceOrder, page, take, category, search } = await queryParamCached.parse(searchParams);

    // Fetch products from Stripe instead of database
    const allProducts = await fetchProductsFromStripe();
    
    // Apply filters from search params
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
    
    // Apply pagination
    const startIndex = (page - 1) * take;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + take);
    
    // Get total product count for pagination
    const productAmount = filteredProducts.length;

    // Get all categories
    const categoryList = await SelectCategoryList({
        orderBy: { name: "asc" },
    }) || []; // Default to empty array instead of throwing error

    // Convert Stripe products to the format expected by the catalogue components
    const adaptedProducts = adaptToProductType(paginatedProducts);

    // Display an empty state if no products or categories exist
    if (paginatedProducts.length === 0) {
        return (
            <div className="flex flex-1 flex-col">
                <h1 className="bg-primary px-6 pt-6 text-4xl font-bold text-secondary">Catalogue</h1>
                <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
                    <h2 className="text-2xl font-semibold text-primary">Aucun produit disponible</h2>
                    <p className="max-w-md text-gray-600">
                        {search ? 
                            `Aucun produit ne correspond à votre recherche "${search}".` :
                            category ? 
                                "Aucun produit n'est disponible dans cette catégorie pour le moment." :
                                "Notre catalogue de produits est en cours de constitution."
                        }
                    </p>
                    {(search || category) && (
                        <Link 
                            href="/catalogue" 
                            className="rounded-full bg-primary px-6 py-3 text-white transition-all hover:bg-primary/90"
                        >
                            Voir tous les produits
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col">
            <h1 className="bg-primary px-6 pt-6 text-4xl font-bold text-secondary">Catalogue</h1>
            <div className="flex flex-1 flex-col justify-start gap-4 overflow-hidden">
                <FilterProvider
                    productList={adaptedProducts}
                    productAmount={productAmount}
                >
                    <FilterSelectClient categoryList={categoryList} />
                    <CatalogueClient />
                </FilterProvider>
            </div>
        </div>
    );
}
