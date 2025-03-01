"use client";

import ButtonClient from "@comps/client/Button";
import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { useHeaderStore } from "../HeaderStore";

export default function Basket() {
    const { basketOpen, setBasketOpen } = useHeaderStore();

    type BasketItem = {
        id: string;
        name: string;
        price: number;
        image: string;
    };

    const basketItem: BasketItem[] = [
        {
            id: "1",
            name: "Produit 1",
            price: 100,
            image: "/illustration/produit 1.jpg",
        },
        {
            id: "2",
            name: "Produit 2",
            price: 200,
            image: "/illustration/produit 2.jpg",
        },
        {
            id: "3",
            name: "Produit 3",
            price: 300,
            image: "/illustration/produit 3.jpg",
        },
    ];

    return (
        <div
            className={combo(
                "absolute z-50 flex size-full flex-row",
                basketOpen ? "pointer-events-auto" : "pointer-events-none",
            )}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: basketOpen ? 0.4 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="w-full bg-black"
            >
                <button type="button" onClick={() => setBasketOpen(false)} className="size-full"></button>
            </motion.div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: basketOpen ? "400px" : 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-100"
            >
                <div className="absolute top-0 h-3 w-full bg-gradient-to-b from-gray-300 to-transparent" />
                <div className="w-[400px] space-y-4 px-5 py-6">
                    <div>
                        <h3 className="w-full text-2xl font-bold text-primary">Mon Panier</h3>
                        <div className="text-xs text-gray-500">Vous avez {basketItem.length} produits dans votre panier.</div>
                    </div>

                    {basketItem.map((item, index) => (
                        <BasketItem key={index} {...item} />
                    ))}

                    <ButtonClient type="button" label="paiement" className="w-full scale-100 rounded-full py-2 font-semibold transition-transform duration-200 hover:scale-[1.02]">
                        Acheter maintenant !
                    </ButtonClient>
                </div>
            </motion.div>
        </div>
    );
}

type BasketItemProps = {
    name: string;
    price: number;
    image: string;
};

const BasketItem = (props: BasketItemProps) => {
    const { name, price, image } = props;
    
    return (
        <div className="flex w-full flex-row gap-4">
            <ImageRatio className="w-1/3 rounded" src={image} alt="Product" />
            <div className="text-left">
                <h4 className="text-lg font-bold">{name}</h4>
                <p className="text-sm text-gray-500">{price}€</p>
            </div>
        </div>
    );
};
