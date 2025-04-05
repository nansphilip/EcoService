"use client";

import Slider from "@comps/ui/slider";
import { useBasketStore } from "@comps/basket/basketStore";
import ImageRatio from "@comps/server/imageRatio";
import Button from "@comps/ui/button";
import { CircleCheck, CirclePlus, CircleX, ShoppingCart } from "lucide-react";
import { ProductListType } from "./fetchParams";
import Link from "next/link";
import Card from "@comps/server/card";

type ProductSliderProps = {
    dataList: ProductListType;
};

export default function ProductSlider(props: ProductSliderProps) {
    const { dataList } = props;

    const { basketProductList, addProductToBasket, removeProductFromBasket } = useBasketStore();

    const handleClick = (e: React.MouseEvent, product: (typeof dataList)[0]) => {
        e.preventDefault();

        if (basketProductList.some((id) => id === product.id)) {
            removeProductFromBasket(product.id);
        } else {
            addProductToBasket(product.id);
        }
    };

    return (
        <Slider dataListLength={dataList.length}>
            {dataList.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                    <Card className="overflow-hidden p-0">
                        <ImageRatio src={product.image} alt={product.name} />
                        <div className="p-5">
                            <h3 className="text-xl font-bold">
                                {product.name}
                            </h3>
                            <div className="text-primary mb-4 text-lg">{product.price.toFixed(2)} €</div>
                            <div className="mt-auto flex items-center justify-end">
                                <Button
                                    type="button"
                                    label="add-to-basket"
                                    onClick={(e) => handleClick(e, product)}
                                    className="group relative size-fit rounded-xl p-[10px] transition-all duration-300 hover:scale-105"
                                >
                                    {basketProductList.some((id) => id === product.id) ? (
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
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </Slider>
    );
}
