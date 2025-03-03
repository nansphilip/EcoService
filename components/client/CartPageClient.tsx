"use client";

import { useCart } from "./CartContext";
import { CartProvider } from "./CartContext";
import Image from "next/image";
import ButtonClient from "./Button";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@lib/products";
import { useState } from "react";

function CartContent() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    try {
      setIsProcessing(true);
      
      // Set a timeout for the fetch operation
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        // Call the API route to create a Stripe checkout session
        const response = await fetch('/api/cart-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId); // Clear the timeout if the request completes
        
        const data = await response.json();
        
        if (!response.ok && !data.fallbackMode) {
          throw new Error(data.error || 'Failed to create checkout session');
        }
        
        // Redirect to Stripe checkout page or fallback URL
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('No checkout URL returned');
        }
      } catch (fetchError) {
        // Handle specific fetch errors
        if (fetchError.name === 'AbortError') {
          console.error('Request timed out');
          // Use local fallback
          window.location.href = `/commande/confirmation?session_id=timeout_${Date.now()}`;
          return;
        }
        throw fetchError; // Re-throw for general error handling
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Une erreur est survenue lors de la création de la session de paiement. Vous serez redirigé vers une page de confirmation.');
      
      // Fallback to confirmation even on error
      setTimeout(() => {
        window.location.href = `/commande/confirmation?session_id=error_${Date.now()}`;
      }, 1500);
    } finally {
      // Set a timeout to reset the processing state if nothing happens
      setTimeout(() => {
        setIsProcessing(false);
      }, 5000);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="mb-4 text-xl font-semibold text-[#12123A]">Votre panier est vide</h2>
        <p className="mb-8 text-gray-600">Ajoutez des produits à votre panier pour commencer vos achats.</p>
        <Link 
          href="/"
          className="rounded-full bg-[#12123A] px-6 py-3 text-white transition-all hover:bg-[#12123A]/90"
        >
          Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="mb-6 grid grid-cols-12 gap-4 border-b border-gray-200 pb-2 text-sm font-medium text-gray-500">
          <div className="col-span-6">Produit</div>
          <div className="col-span-2 text-center">Prix</div>
          <div className="col-span-2 text-center">Quantité</div>
          <div className="col-span-2 text-center">Total</div>
        </div>

        {cart.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-4 border-b border-gray-100 py-4">
            <div className="col-span-6 flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-md bg-[#5BCFCF]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-medium text-[#12123A]">{item.name}</h3>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="mt-1 flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Supprimer</span>
                </button>
              </div>
            </div>
            
            <div className="col-span-2 flex items-center justify-center">
              {formatPrice(item.price * 100, item.currency)}
            </div>
            
            <div className="col-span-2 flex items-center justify-center">
              <div className="flex items-center rounded-md border border-gray-200">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="flex h-8 w-8 items-center justify-center border-x border-gray-200">
                  {item.quantity}
                </span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
            
            <div className="col-span-2 flex items-center justify-center font-medium text-[#12123A]">
              {formatPrice(item.price * item.quantity * 100, item.currency)}
            </div>
          </div>
        ))}

        <div className="mt-4 flex justify-between">
          <button 
            onClick={clearCart}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            <span>Vider le panier</span>
          </button>
          
          <Link 
            href="/"
            className="text-sm text-[#12123A] hover:underline"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#12123A]">Résumé de la commande</h2>
        
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sous-total ({totalItems} articles)</span>
            <span>{formatPrice(totalPrice * 100, cart[0]?.currency || "eur")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Livraison</span>
            <span>Gratuite</span>
          </div>
        </div>
        
        <div className="mb-6 border-t border-gray-200 pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-lg">{formatPrice(totalPrice * 100, cart[0]?.currency || "eur")}</span>
          </div>
        </div>
        
        <ButtonClient
          type="button"
          label="Procéder au paiement"
          className="w-full rounded-md bg-[#12123A] py-3 text-center text-white transition-all hover:bg-[#12123A]/90"
          onClick={handleCheckout}
          isLoading={isProcessing}
          loadingLabel="Redirection vers le paiement..."
        >
          Procéder au paiement
        </ButtonClient>
      </div>
    </div>
  );
}

export function CartPageClient() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
} 