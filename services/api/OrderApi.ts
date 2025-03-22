import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    OrderService,
    CountOrderProps,
    CountOrderResponse,
    FindManyOrderProps,
    FindManyOrderResponse,
    FindUniqueOrderProps,
    FindUniqueOrderResponse
} from "@services/class/OrderClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getOrderListCached = cache(
    async <T extends FindManyOrderProps>(stringParams: string): Promise<ResponseFormat<FindManyOrderResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des orders
        const response = await OrderService.findMany(params);

        console.log("getOrderList -> Revalidating orders list from database...");

        return response;
    },
    ["order"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["order"],
    },
);

export const getOrderList = async <T extends FindManyOrderProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyOrderResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des orders
        const response = await getOrderListCached<T>(stringParams);

        // Retourne la liste des orders
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getOrderListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getOrderListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getOrderListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getOrderListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getOrderUniqueCached = cache(
    async <T extends FindUniqueOrderProps>(stringParams: string): Promise<ResponseFormat<FindUniqueOrderResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le order
        const response = await OrderService.findUnique(params);
        
        console.log("getOrderUnique -> Revalidating order from database...");
        
        return response;
    },
    ["order/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["order/unique"],
    },
);

export const getOrderUnique = async <T extends FindUniqueOrderProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueOrderResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getOrderUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getOrderUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getOrderUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getOrderUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getOrderUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getOrderCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountOrderResponse>> => {
        // Parse les paramètres en objet
        const params: CountOrderProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les orders
        const response = await OrderService.count(params);
        
        console.log("getOrderCount -> Revalidating orders count from database...");
        
        return response;
    },
    ["order/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["order/count"],
    },
);

export const getOrderCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountOrderResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getOrderCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getOrderCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getOrderCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getOrderCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getOrderCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 