import { FetchParallelized } from "@actions/utils/FetchParallelized";
import { Category } from "@prisma/client";
import Basket from "../Basket/Basket";
import Main from "./Browser/Main";
import Sub from "./Browser/Sub";
import MobileHeader from "./Mobile/MobileHeader";

export type SearchKeywords = {
    id: string;
    type: "product" | "category";
    keyword: string;
} & ({
    type: "product";
    image: string;
    price: number;
} | {
    type: "category";
    image?: never;
    price?: never;
});

export default async function Header() {
    const [productList, categorieList] = await FetchParallelized([
        { route: "/products", params: { take: 100 } },
        { route: "/categories", params: { take: 100 } },
    ]);

    if (!productList || !categorieList) {
        return <div>Mmmm... It seems there is not data.</div>;
    }

    // Generate keyword list for search
    const keywords: SearchKeywords[] = [];
    keywords.push(
        ...productList.map(({ id, name, image, price }) => ({
            id,
            type: "product" as const,
            keyword: name,
            image,
            price,
        })),
    );
    keywords.push(
        ...categorieList.map(({ id, name }) => ({
            id,
            type: "category" as const,
            keyword: name,
        })),
    );

    return (
        <header>
            <BrowserHeader
                className="bg-white text-center max-md:hidden"
                keywords={keywords}
                categorieList={categorieList}
            />
            <MobileHeader className="md:hidden" />
        </header>
    );
}

type BrowserHeaderProps = {
    keywords: SearchKeywords[];
    categorieList: Category[];
    className?: string;
};

const BrowserHeader = (props: BrowserHeaderProps) => {
    const { className, keywords, categorieList } = props;

    return (
        <div className={className}>
            <Main />
            <Sub keywords={keywords} categorieList={categorieList} />
            <Basket />
        </div>
    );
};
