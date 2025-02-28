"use client";

import AddToCartButton from "./AddToCartButton";
import { CartProvider } from "./CartContext";

type AddToCartButtonWrapperProps = {
  product: {
    id: string;
    name: string;
    price: number | null;
    currency: string;
    image: string;
  };
  className?: string;
};

export function AddToCartButtonWrapper({ product, className }: AddToCartButtonWrapperProps) {
  return (
    <CartProvider>
      <AddToCartButton 
        product={product} 
        className={className}
      />
    </CartProvider>
  );
} 