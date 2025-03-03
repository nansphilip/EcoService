"use client";

import { useCart } from "./CartContext";
import ButtonClient from "./Button";
import { useState } from "react";

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    price: number | null;
    currency: string;
    image: string;
  };
  className?: string;
};

export default function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    // Ensure the product has a valid price
    if (!product.price) {
      console.error("Cannot add product without price to cart");
      return;
    }

    setIsLoading(true);
    
    // Simulate a short delay to show loading state
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.image
      });
      setIsLoading(false);
    }, 500);
  };

  return (
    <ButtonClient
      type="button"
      label="Ajouter au panier"
      className={className}
      onClick={handleAddToCart}
      isLoading={isLoading}
      loadingLabel="Ajout en cours..."
    >
      Ajouter au panier
    </ButtonClient>
  );
} 