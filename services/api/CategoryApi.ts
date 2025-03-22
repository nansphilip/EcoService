import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    CategoryService,
    CountCategoryProps,
    CountCategoryResponse,
    FindManyCategoryProps,
    FindManyCategoryResponse,
    FindUniqueCategoryProps,
    FindUniqueCategoryResponse
} from "@services/class/CategoryClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getCategoryListCached = cache(
    async <T extends FindManyCategoryProps>(stringParams: string): Promise<ResponseFormat<FindManyCategoryResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des categorys
        const response = await CategoryService.findMany(params);

        console.log("getCategoryList -> Revalidating categorys list from database...");

        return response;
    },
    ["category"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["category"],
    },
);

export const getCategoryList = async <T extends FindManyCategoryProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyCategoryResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des categorys
        const response = await getCategoryListCached<T>(stringParams);

        // Retourne la liste des categorys
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getCategoryListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getCategoryListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getCategoryListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getCategoryListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getCategoryUniqueCached = cache(
    async <T extends FindUniqueCategoryProps>(stringParams: string): Promise<ResponseFormat<FindUniqueCategoryResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le category
        const response = await CategoryService.findUnique(params);
        
        console.log("getCategoryUnique -> Revalidating category from database...");
        
        return response;
    },
    ["category/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["category/unique"],
    },
);

export const getCategoryUnique = async <T extends FindUniqueCategoryProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueCategoryResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getCategoryUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getCategoryUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getCategoryUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getCategoryUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getCategoryUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getCategoryCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountCategoryResponse>> => {
        // Parse les paramètres en objet
        const params: CountCategoryProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les categorys
        const response = await CategoryService.count(params);
        
        console.log("getCategoryCount -> Revalidating categorys count from database...");
        
        return response;
    },
    ["category/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["category/count"],
    },
);

export const getCategoryCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountCategoryResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getCategoryCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getCategoryCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getCategoryCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getCategoryCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getCategoryCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 