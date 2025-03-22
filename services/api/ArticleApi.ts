import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ArticleService,
    CountArticleProps,
    CountArticleResponse,
    FindManyArticleProps,
    FindManyArticleResponse,
    FindUniqueArticleProps,
    FindUniqueArticleResponse
} from "@services/class/ArticleClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getArticleListCached = cache(
    async <T extends FindManyArticleProps>(stringParams: string): Promise<ResponseFormat<FindManyArticleResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des articles
        const response = await ArticleService.findMany(params);

        console.log("getArticleList -> Revalidating articles list from database...");

        return response;
    },
    ["article"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["article"],
    },
);

export const getArticleList = async <T extends FindManyArticleProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyArticleResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des articles
        const response = await getArticleListCached<T>(stringParams);

        // Retourne la liste des articles
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getArticleListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getArticleListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getArticleListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getArticleListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getArticleUniqueCached = cache(
    async <T extends FindUniqueArticleProps>(stringParams: string): Promise<ResponseFormat<FindUniqueArticleResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le article
        const response = await ArticleService.findUnique(params);
        
        console.log("getArticleUnique -> Revalidating article from database...");
        
        return response;
    },
    ["article/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["article/unique"],
    },
);

export const getArticleUnique = async <T extends FindUniqueArticleProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueArticleResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getArticleUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getArticleUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getArticleUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getArticleUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getArticleUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getArticleCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountArticleResponse>> => {
        // Parse les paramètres en objet
        const params: CountArticleProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les articles
        const response = await ArticleService.count(params);
        
        console.log("getArticleCount -> Revalidating articles count from database...");
        
        return response;
    },
    ["article/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["article/count"],
    },
);

export const getArticleCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountArticleResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getArticleCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getArticleCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getArticleCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getArticleCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getArticleCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 