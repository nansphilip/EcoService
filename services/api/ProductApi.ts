import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ProductService,
    CountProductProps,
    CountProductResponse,
    FindManyProductProps,
    FindManyProductResponse,
    FindUniqueProductProps,
    FindUniqueProductResponse
} from "@services/class/ProductClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getProductListCached = cache(
    async <T extends FindManyProductProps>(stringParams: string): Promise<ResponseFormat<FindManyProductResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des products
        const response = await ProductService.findMany(params);

        console.log("getProductList -> Revalidating products list from database...");

        return response;
    },
    ["product"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["product"],
    },
);

export const getProductList = async <T extends FindManyProductProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyProductResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des products
        const response = await getProductListCached<T>(stringParams);

        // Retourne la liste des products
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getProductListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getProductListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getProductListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getProductListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getProductUniqueCached = cache(
    async <T extends FindUniqueProductProps>(stringParams: string): Promise<ResponseFormat<FindUniqueProductResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le product
        const response = await ProductService.findUnique(params);
        
        console.log("getProductUnique -> Revalidating product from database...");
        
        return response;
    },
    ["product/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["product/unique"],
    },
);

export const getProductUnique = async <T extends FindUniqueProductProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueProductResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getProductUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getProductUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getProductUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getProductUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getProductUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getProductCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountProductResponse>> => {
        // Parse les paramètres en objet
        const params: CountProductProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les products
        const response = await ProductService.count(params);
        
        console.log("getProductCount -> Revalidating products count from database...");
        
        return response;
    },
    ["product/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["product/count"],
    },
);

export const getProductCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountProductResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getProductCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getProductCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getProductCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getProductCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getProductCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 