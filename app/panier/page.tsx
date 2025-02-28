import { CartPageClient } from "@comps/client/CartPageClient";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#12123A]">Votre panier</h1>
      <CartPageClient />
    </div>
  );
} 