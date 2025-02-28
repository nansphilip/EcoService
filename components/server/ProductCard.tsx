import { Product, formatPrice, getImageUrl } from "@lib/products";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { id, name, description, images, default_price } = product;
  
  // Format the price
  const price = default_price?.unit_amount 
    ? formatPrice(default_price.unit_amount, default_price.currency)
    : "Prix indisponible";
  
  // Get the product image or use a placeholder
  const imageUrl = images && images.length > 0 
    ? getImageUrl(images[0]) 
    : "/illustration/coton 1.jpg"; // Default placeholder
    
  return (
    <Link href={`/produit/${id}`} className={`group block overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg ${className}`}>
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-primary line-clamp-1">{name}</h3>
        <p className="mb-2 text-sm text-gray-600 line-clamp-2">{description || "Aucune description disponible"}</p>
        <p className="text-lg font-bold text-secondary">{price}</p>
      </div>
    </Link>
  );
} 