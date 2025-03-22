import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    FruitService,
    CountFruitProps,
    CountFruitResponse,
    FindManyFruitProps,
    FindManyFruitResponse,
    FindUniqueFruitProps,
    FindUniqueFruitResponse
} from "@services/class/FruitClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getFruitListCached = cache(
    async <T extends FindManyFruitProps>(stringParams: string): Promise<ResponseFormat<FindManyFruitResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des fruits
        const response = await FruitService.findMany(params);

        console.log("getFruitList -> Revalidating fruits list from database...");

        return response;
    },
    ["fruit"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["fruit"],
    },
);

export const getFruitList = async <T extends FindManyFruitProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyFruitResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des fruits
        const response = await getFruitListCached<T>(stringParams);

        // Retourne la liste des fruits
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getFruitListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getFruitListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getFruitListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getFruitListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getFruitUniqueCached = cache(
    async <T extends FindUniqueFruitProps>(stringParams: string): Promise<ResponseFormat<FindUniqueFruitResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le fruit
        const response = await FruitService.findUnique(params);
        
        console.log("getFruitUnique -> Revalidating fruit from database...");
        
        return response;
    },
    ["fruit/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["fruit/unique"],
    },
);

export const getFruitUnique = async <T extends FindUniqueFruitProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueFruitResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getFruitUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getFruitUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getFruitUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getFruitUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getFruitUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getFruitCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountFruitResponse>> => {
        // Parse les paramètres en objet
        const params: CountFruitProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les fruits
        const response = await FruitService.count(params);
        
        console.log("getFruitCount -> Revalidating fruits count from database...");
        
        return response;
    },
    ["fruit/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["fruit/count"],
    },
);

export const getFruitCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountFruitResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getFruitCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getFruitCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getFruitCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getFruitCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getFruitCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 