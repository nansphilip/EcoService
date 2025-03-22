import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ContentService,
    CountContentProps,
    CountContentResponse,
    FindManyContentProps,
    FindManyContentResponse,
    FindUniqueContentProps,
    FindUniqueContentResponse
} from "@services/class/ContentClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getContentListCached = cache(
    async <T extends FindManyContentProps>(stringParams: string): Promise<ResponseFormat<FindManyContentResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des contents
        const response = await ContentService.findMany(params);

        console.log("getContentList -> Revalidating contents list from database...");

        return response;
    },
    ["content"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["content"],
    },
);

export const getContentList = async <T extends FindManyContentProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyContentResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des contents
        const response = await getContentListCached<T>(stringParams);

        // Retourne la liste des contents
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getContentListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getContentListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getContentListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getContentListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getContentUniqueCached = cache(
    async <T extends FindUniqueContentProps>(stringParams: string): Promise<ResponseFormat<FindUniqueContentResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le content
        const response = await ContentService.findUnique(params);
        
        console.log("getContentUnique -> Revalidating content from database...");
        
        return response;
    },
    ["content/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["content/unique"],
    },
);

export const getContentUnique = async <T extends FindUniqueContentProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueContentResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getContentUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getContentUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getContentUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getContentUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getContentUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getContentCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountContentResponse>> => {
        // Parse les paramètres en objet
        const params: CountContentProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les contents
        const response = await ContentService.count(params);
        
        console.log("getContentCount -> Revalidating contents count from database...");
        
        return response;
    },
    ["content/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["content/count"],
    },
);

export const getContentCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountContentResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getContentCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getContentCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getContentCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getContentCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getContentCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 