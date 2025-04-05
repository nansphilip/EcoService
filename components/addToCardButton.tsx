"use client";

import Button from "@comps/ui/button";
import { CircleCheck, CirclePlus, CircleX, ShoppingCart } from "lucide-react";
import { ProductModel } from "@services/types";
import { useBasketStore } from "./basket/basketStore";

type AddToCartButtonProps = {
    produit: ProductModel;
};

export default function AddToCartButton(props: AddToCartButtonProps) {
    const { produit } = props;
    const { basketProductList, addProductToBasket, removeProductFromBasket } = useBasketStore();

    const isInBasket = basketProductList.some((currentId) => currentId === produit.id);

    return (
        <Button
            type="button"
            label="add-to-basket"
            onClick={(e) => {
                e.preventDefault();
                return isInBasket ? removeProductFromBasket(produit.id) : addProductToBasket(produit.id);
            }}
            baseStyleOnly={["outline"]}
            className="group relative size-fit rounded-xl p-[10px] transition-all duration-300 hover:scale-105"
        >
            {isInBasket ? (
                <>
                    <CircleCheck className="group-hover:hidden" />
                    <CircleX className="hidden group-hover:block" />
                </>
            ) : (
                <>
                    <CirclePlus className="absolute translate-x-[45%] translate-y-[-35%] scale-[0.8] fill-white stroke-black stroke-[3px]" />
                    <ShoppingCart />
                </>
            )}
        </Button>
    );
}
