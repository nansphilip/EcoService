import { FetchV2 } from "@utils/FetchV2";
import { ProductFetchParams } from "./fetchParams";
import Slider from "./slider";
import Card from "@comps/server/card";
import ImageRatio from "@comps/server/imageRatio";

export default async function Page() {
    const productList = await FetchV2({
        route: "/product",
        params: ProductFetchParams,
    });

    return (
        <div className="flex min-h-screen flex-col items-start justify-start p-5">
            <h1 className="text-2xl font-bold">Incredible slider</h1>
            <p className="text-gray-500 text-sm">A custom slider made with framer motion</p>
            <Slider dataListLength={productList.length}>
                {productList.map(({ name, description, price, image }, index) => (
                    <Card
                        key={index}
                        className="h-full overflow-hidden p-0"
                    >
                        <ImageRatio src={image} alt={name} />
                        <div className="p-5">
                            <div className="flex flex-row items-end justify-between">
                                <h2 className="text-xl font-bold">{name}</h2>
                                <p className="font-bold text-nowrap text-gray-500">{price} €</p>
                            </div>
                            <p className="text-sm text-gray-500">{description}</p>
                        </div>
                    </Card>
                ))}
            </Slider>
        </div>
    );
}
