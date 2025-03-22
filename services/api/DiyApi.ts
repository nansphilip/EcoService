import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    DiyService,
    CountDiyProps,
    CountDiyResponse,
    FindManyDiyProps,
    FindManyDiyResponse,
    FindUniqueDiyProps,
    FindUniqueDiyResponse
} from "@services/class/DiyClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getDiyListCached = cache(
    async <T extends FindManyDiyProps>(stringParams: string): Promise<ResponseFormat<FindManyDiyResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des diys
        const response = await DiyService.findMany(params);

        console.log("getDiyList -> Revalidating diys list from database...");

        return response;
    },
    ["diy"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["diy"],
    },
);

export const getDiyList = async <T extends FindManyDiyProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyDiyResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des diys
        const response = await getDiyListCached<T>(stringParams);

        // Retourne la liste des diys
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getDiyListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getDiyListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getDiyListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getDiyListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getDiyUniqueCached = cache(
    async <T extends FindUniqueDiyProps>(stringParams: string): Promise<ResponseFormat<FindUniqueDiyResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le diy
        const response = await DiyService.findUnique(params);
        
        console.log("getDiyUnique -> Revalidating diy from database...");
        
        return response;
    },
    ["diy/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["diy/unique"],
    },
);

export const getDiyUnique = async <T extends FindUniqueDiyProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueDiyResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getDiyUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getDiyUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getDiyUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getDiyUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getDiyUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getDiyCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountDiyResponse>> => {
        // Parse les paramètres en objet
        const params: CountDiyProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les diys
        const response = await DiyService.count(params);
        
        console.log("getDiyCount -> Revalidating diys count from database...");
        
        return response;
    },
    ["diy/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["diy/count"],
    },
);

export const getDiyCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountDiyResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getDiyCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getDiyCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getDiyCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getDiyCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getDiyCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 