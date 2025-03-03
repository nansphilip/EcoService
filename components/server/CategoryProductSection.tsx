import { Category } from "@prisma/client";
import { Product } from "@lib/products";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { urlSerializer } from "@app/catalogue/components/FilterTypes";

interface CategoryProductSectionProps {
  category: Category;
  products: Product[];
  variant?: "light" | "dark";
}

export default function CategoryProductSection({ 
  category, 
  products,
  variant = "light" 
}: CategoryProductSectionProps) {
  
  // Early return if there are no products
  if (!products || products.length === 0) {
    return null;
  }
  
  // Use at most 4 products for the display
  const displayProducts = products.slice(0, 4);
  
  // Determine text color classes based on the variant
  const titleClass = variant === "dark" ? "text-white" : "text-primary";
  const bgClass = variant === "dark" ? "bg-primary" : "bg-white";
  const seeMoreClass = variant === "dark" ? "text-secondary hover:text-secondary/80" : "text-primary hover:text-primary/80";
  
  return (
    <section className={`space-y-6 p-8 ${bgClass}`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${titleClass}`}>
          {category.name}
        </h2>
        
        <Link 
          href={urlSerializer("/catalogue", { category: category.id })}
          className={`font-medium ${seeMoreClass} transition-colors`}
        >
          Voir plus →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
} 