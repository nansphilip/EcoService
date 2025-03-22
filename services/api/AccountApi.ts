import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AccountService,
    CountAccountProps,
    CountAccountResponse,
    FindManyAccountProps,
    FindManyAccountResponse,
    FindUniqueAccountProps,
    FindUniqueAccountResponse
} from "@services/class/AccountClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getAccountListCached = cache(
    async <T extends FindManyAccountProps>(stringParams: string): Promise<ResponseFormat<FindManyAccountResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des accounts
        const response = await AccountService.findMany(params);

        console.log("getAccountList -> Revalidating accounts list from database...");

        return response;
    },
    ["account"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["account"],
    },
);

export const getAccountList = async <T extends FindManyAccountProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyAccountResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des accounts
        const response = await getAccountListCached<T>(stringParams);

        // Retourne la liste des accounts
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAccountListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAccountListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAccountListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAccountListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getAccountUniqueCached = cache(
    async <T extends FindUniqueAccountProps>(stringParams: string): Promise<ResponseFormat<FindUniqueAccountResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le account
        const response = await AccountService.findUnique(params);
        
        console.log("getAccountUnique -> Revalidating account from database...");
        
        return response;
    },
    ["account/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["account/unique"],
    },
);

export const getAccountUnique = async <T extends FindUniqueAccountProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueAccountResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getAccountUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAccountUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAccountUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAccountUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAccountUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getAccountCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountAccountResponse>> => {
        // Parse les paramètres en objet
        const params: CountAccountProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les accounts
        const response = await AccountService.count(params);
        
        console.log("getAccountCount -> Revalidating accounts count from database...");
        
        return response;
    },
    ["account/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["account/count"],
    },
);

export const getAccountCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountAccountResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getAccountCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAccountCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAccountCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAccountCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAccountCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 