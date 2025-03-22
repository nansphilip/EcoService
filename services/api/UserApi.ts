import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    UserService,
    CountUserProps,
    CountUserResponse,
    FindManyUserProps,
    FindManyUserResponse,
    FindUniqueUserProps,
    FindUniqueUserResponse
} from "@services/class/UserClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getUserListCached = cache(
    async <T extends FindManyUserProps>(stringParams: string): Promise<ResponseFormat<FindManyUserResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des users
        const response = await UserService.findMany(params);

        console.log("getUserList -> Revalidating users list from database...");

        return response;
    },
    ["user"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["user"],
    },
);

export const getUserList = async <T extends FindManyUserProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyUserResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des users
        const response = await getUserListCached<T>(stringParams);

        // Retourne la liste des users
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getUserListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getUserListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getUserListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getUserListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getUserUniqueCached = cache(
    async <T extends FindUniqueUserProps>(stringParams: string): Promise<ResponseFormat<FindUniqueUserResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le user
        const response = await UserService.findUnique(params);
        
        console.log("getUserUnique -> Revalidating user from database...");
        
        return response;
    },
    ["user/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["user/unique"],
    },
);

export const getUserUnique = async <T extends FindUniqueUserProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueUserResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getUserUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getUserUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getUserUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getUserUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getUserUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getUserCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountUserResponse>> => {
        // Parse les paramètres en objet
        const params: CountUserProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les users
        const response = await UserService.count(params);
        
        console.log("getUserCount -> Revalidating users count from database...");
        
        return response;
    },
    ["user/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["user/count"],
    },
);

export const getUserCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountUserResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getUserCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getUserCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getUserCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getUserCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getUserCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 