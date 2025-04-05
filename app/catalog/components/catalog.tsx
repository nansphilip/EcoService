"use client";

import AddToCartButton from "@comps/addToCardButton";
import Card from "@comps/server/card";
import ImageRatio from "@comps/server/imageRatio";
import Loader from "@comps/ui/loader";
import { combo } from "@lib/combo";
import { ProductModel } from "@services/types";
import { useFetchV2 } from "@utils/FetchHookV2";
import Link from "next/link";
import { useContext, useEffect, unstable_ViewTransition as ViewTransition } from "react";
import { ProductAmountFetchParams, ProductListFetchParams } from "./fetchParams";
import { CatalogContext } from "./provider";
import { useCatalogParams } from "./useCatalogParams";
import { useCatalogStore } from "./useCatalogStore";

type CatalogClientProps = {
    className?: string;
};

export default function CatalogClient(props: CatalogClientProps) {
    const { className } = props;

    const { productList: productListLocal } = useContext(CatalogContext);
    const { setDataStore } = useCatalogStore();
    const { priceOrder, page, take, category, search } = useCatalogParams();

    const { data: newProductAmount, isLoading: isLoadingProductAmount } = useFetchV2({
        route: "/product/count",
        params: ProductAmountFetchParams({ category, search }),
    });

    const { data: newProductList, isLoading: isLoadingProductList } = useFetchV2({
        route: "/product",
        params: ProductListFetchParams({ priceOrder, page, take, category, search }),
    });

    useEffect(() => {
        if (newProductList && newProductAmount) {
            setDataStore({
                productList: newProductList,
                productAmount: newProductAmount,
            });
        }
    }, [newProductAmount, newProductList, setDataStore]);

    if (isLoadingProductList || isLoadingProductAmount) {
        return (
            <div className="flex w-full flex-1 items-center justify-center">
                <Loader className="size-8 border-4" />
            </div>
        );
    }

    return <ProductList produitList={productListLocal} className={className} />;
}

type ProductListProps = {
    produitList: ProductModel[] | null;
    className?: string;
};

const ProductList = (props: ProductListProps) => {
    const { produitList, className } = props;

    if (!produitList) {
        return (
            <div className={combo("flex size-full items-center justify-center", className)}>
                Aucun produit disponible pour le moment.
            </div>
        );
    }

    return (
        <div className={combo("grid grid-cols-1 gap-5 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4", className)}>
            {produitList.map((produit, index) => (
                <Link
                    key={index}
                    href={`/product/${produit.id}`}
                    className="ring-transparent outline-none focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-teal-400"
                >
                    <Card className="overflow-hidden p-0">
                        <ViewTransition name={`product-${produit.id}`}>
                            <ImageRatio src={produit.image} alt={produit.name} />
                        </ViewTransition>
                        <div className="flex flex-row items-center justify-between p-4">
                            <div>
                                <div className="text-lg font-bold">{produit.name}</div>
                                <div className="text-sm text-gray-500">{produit.price} €</div>
                            </div>
                            <AddToCartButton produit={produit} />
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
};
