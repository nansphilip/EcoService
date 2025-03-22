import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    SessionService,
    CountSessionProps,
    CountSessionResponse,
    FindManySessionProps,
    FindManySessionResponse,
    FindUniqueSessionProps,
    FindUniqueSessionResponse
} from "@services/class/SessionClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getSessionListCached = cache(
    async <T extends FindManySessionProps>(stringParams: string): Promise<ResponseFormat<FindManySessionResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des sessions
        const response = await SessionService.findMany(params);

        console.log("getSessionList -> Revalidating sessions list from database...");

        return response;
    },
    ["session"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["session"],
    },
);

export const getSessionList = async <T extends FindManySessionProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManySessionResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des sessions
        const response = await getSessionListCached<T>(stringParams);

        // Retourne la liste des sessions
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getSessionListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getSessionListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getSessionListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getSessionListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getSessionUniqueCached = cache(
    async <T extends FindUniqueSessionProps>(stringParams: string): Promise<ResponseFormat<FindUniqueSessionResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le session
        const response = await SessionService.findUnique(params);
        
        console.log("getSessionUnique -> Revalidating session from database...");
        
        return response;
    },
    ["session/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["session/unique"],
    },
);

export const getSessionUnique = async <T extends FindUniqueSessionProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueSessionResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getSessionUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getSessionUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getSessionUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getSessionUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getSessionUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getSessionCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountSessionResponse>> => {
        // Parse les paramètres en objet
        const params: CountSessionProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les sessions
        const response = await SessionService.count(params);
        
        console.log("getSessionCount -> Revalidating sessions count from database...");
        
        return response;
    },
    ["session/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["session/count"],
    },
);

export const getSessionCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountSessionResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getSessionCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getSessionCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getSessionCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getSessionCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getSessionCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 