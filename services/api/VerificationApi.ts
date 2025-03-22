import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    VerificationService,
    CountVerificationProps,
    CountVerificationResponse,
    FindManyVerificationProps,
    FindManyVerificationResponse,
    FindUniqueVerificationProps,
    FindUniqueVerificationResponse
} from "@services/class/VerificationClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getVerificationListCached = cache(
    async <T extends FindManyVerificationProps>(stringParams: string): Promise<ResponseFormat<FindManyVerificationResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des verifications
        const response = await VerificationService.findMany(params);

        console.log("getVerificationList -> Revalidating verifications list from database...");

        return response;
    },
    ["verification"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["verification"],
    },
);

export const getVerificationList = async <T extends FindManyVerificationProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyVerificationResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des verifications
        const response = await getVerificationListCached<T>(stringParams);

        // Retourne la liste des verifications
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getVerificationListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getVerificationListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getVerificationListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getVerificationListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getVerificationUniqueCached = cache(
    async <T extends FindUniqueVerificationProps>(stringParams: string): Promise<ResponseFormat<FindUniqueVerificationResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le verification
        const response = await VerificationService.findUnique(params);
        
        console.log("getVerificationUnique -> Revalidating verification from database...");
        
        return response;
    },
    ["verification/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["verification/unique"],
    },
);

export const getVerificationUnique = async <T extends FindUniqueVerificationProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueVerificationResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getVerificationUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getVerificationUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getVerificationUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getVerificationUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getVerificationUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getVerificationCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountVerificationResponse>> => {
        // Parse les paramètres en objet
        const params: CountVerificationProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les verifications
        const response = await VerificationService.count(params);
        
        console.log("getVerificationCount -> Revalidating verifications count from database...");
        
        return response;
    },
    ["verification/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["verification/count"],
    },
);

export const getVerificationCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountVerificationResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getVerificationCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getVerificationCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getVerificationCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getVerificationCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getVerificationCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 