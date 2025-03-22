import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    QuantityService,
    CountQuantityProps,
    CountQuantityResponse,
    FindManyQuantityProps,
    FindManyQuantityResponse,
    FindUniqueQuantityProps,
    FindUniqueQuantityResponse
} from "@services/class/QuantityClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getQuantityListCached = cache(
    async <T extends FindManyQuantityProps>(stringParams: string): Promise<ResponseFormat<FindManyQuantityResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des quantitys
        const response = await QuantityService.findMany(params);

        console.log("getQuantityList -> Revalidating quantitys list from database...");

        return response;
    },
    ["quantity"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["quantity"],
    },
);

export const getQuantityList = async <T extends FindManyQuantityProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyQuantityResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des quantitys
        const response = await getQuantityListCached<T>(stringParams);

        // Retourne la liste des quantitys
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getQuantityListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getQuantityListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getQuantityListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getQuantityListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getQuantityUniqueCached = cache(
    async <T extends FindUniqueQuantityProps>(stringParams: string): Promise<ResponseFormat<FindUniqueQuantityResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le quantity
        const response = await QuantityService.findUnique(params);
        
        console.log("getQuantityUnique -> Revalidating quantity from database...");
        
        return response;
    },
    ["quantity/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["quantity/unique"],
    },
);

export const getQuantityUnique = async <T extends FindUniqueQuantityProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueQuantityResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getQuantityUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getQuantityUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getQuantityUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getQuantityUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getQuantityUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getQuantityCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountQuantityResponse>> => {
        // Parse les paramètres en objet
        const params: CountQuantityProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les quantitys
        const response = await QuantityService.count(params);
        
        console.log("getQuantityCount -> Revalidating quantitys count from database...");
        
        return response;
    },
    ["quantity/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["quantity/count"],
    },
);

export const getQuantityCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountQuantityResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getQuantityCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getQuantityCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getQuantityCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getQuantityCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getQuantityCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 