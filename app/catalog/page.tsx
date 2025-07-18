import {
    CategoryFindManyServer,
    CategoryFindUniqueServer,
    ProductCountServer,
    ProductFindManyServer,
} from "@services/server";
import { Metadata } from "next";
import Catalog from "./components/catalog";
import { CategoryListFetchParams, ProductAmountFetchParams, ProductListFetchParams } from "./components/fetchParams";
import Pagination from "./components/pagination";
import Provider from "./components/provider";
import { SearchParamsCached, SearchParamsType } from "./components/queryParamsConfig";
import Selectors from "./components/selectors";

type PageProps = {
    searchParams: Promise<SearchParamsType>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

    const { searchParams } = props;

    const { category } = await SearchParamsCached.parse(searchParams);

    const categoryData = await CategoryFindUniqueServer({ where: { slug: category } });

    if (!categoryData) {
        return {
            title: "Catalogue - Eco Service",
        };
    }

    return {
        title: `Catalogue - Eco Service`,
        description: categoryData
            ? `Tous les produits de la catégorie ${categoryData.name} sur Eco Service.`
            : "Retrouvez l'intégralité de nos produits dans notre catalogue.",
        metadataBase: new URL(`${baseUrl}/catalog`),
        alternates: {
            canonical: categoryData ? `${baseUrl}/catalog?category=${categoryData.slug}` : `${baseUrl}/catalog`,
        },
    };
}

export default async function Page(props: PageProps) {
    const { searchParams } = props;

    // Get search params
    const { priceOrder, page, take, category, search } = await SearchParamsCached.parse(searchParams);

    // Fetch data
    const initialProductAmount = await ProductCountServer(ProductAmountFetchParams({ category, search }));

    const initialProductList = await ProductFindManyServer(
        ProductListFetchParams({ priceOrder, page, take, category, search }),
    );

    const categoryList = await CategoryFindManyServer(CategoryListFetchParams);

    return (
        <div className="flex h-full flex-col overflow-hidden">
            <h1 className="bg-eco text-ecoco px-6 pt-6 text-4xl font-bold">Catalogue</h1>
            <div className="bg-eco px-6 pt-2 text-white">
                Retrouvez l&apos;intégralité de nos produits dans notre catalogue.
            </div>
            <div className="flex h-full flex-col justify-start overflow-hidden">
                <Provider initialProductAmount={initialProductAmount}>
                    <Selectors categoryList={categoryList} />
                    <div id="scrollable-target" className="flex-1 overflow-y-auto">
                        <Catalog className="p-6" initialProductList={initialProductList} />
                        <Pagination className="mb-6" />
                    </div>
                </Provider>
            </div>
        </div>
    );
}
