"use client";

import { useCart } from "./CartContext";
import ButtonClient from "./Button";
import { ShoppingBag } from "lucide-react";

export default function CartIndicator() {
  const { totalItems, totalPrice } = useCart();
  
  return (
    <ButtonClient
      type="link"
      href="/panier"
      label="Voir le panier"
      className="relative"
    >
      <ShoppingBag className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5BCFCF] text-xs font-medium text-[#12123A]">
          {totalItems}
        </span>
      )}
    </ButtonClient>
  );
} 