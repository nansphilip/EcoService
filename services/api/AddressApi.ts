import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AddressService,
    CountAddressProps,
    CountAddressResponse,
    FindManyAddressProps,
    FindManyAddressResponse,
    FindUniqueAddressProps,
    FindUniqueAddressResponse
} from "@services/class/AddressClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// ==================== LISTE DES S ====================

const getAddressListCached = cache(
    async <T extends FindManyAddressProps>(stringParams: string): Promise<ResponseFormat<FindManyAddressResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des addresss
        const response = await AddressService.findMany(params);

        console.log("getAddressList -> Revalidating addresss list from database...");

        return response;
    },
    ["address"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["address"],
    },
);

export const getAddressList = async <T extends FindManyAddressProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyAddressResponse<T>>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des addresss
        const response = await getAddressListCached<T>(stringParams);

        // Retourne la liste des addresss
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAddressListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAddressListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAddressListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAddressListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ====================  UNIQUE ====================

const getAddressUniqueCached = cache(
    async <T extends FindUniqueAddressProps>(stringParams: string): Promise<ResponseFormat<FindUniqueAddressResponse<T>>> => {
        // Parse les paramètres en objet
        const params: T = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le address
        const response = await AddressService.findUnique(params);
        
        console.log("getAddressUnique -> Revalidating address from database...");
        
        return response;
    },
    ["address/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["address/unique"],
    },
);

export const getAddressUnique = async <T extends FindUniqueAddressProps>(request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueAddressResponse<T>>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getAddressUniqueCached<T>(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAddressUniqueCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAddressUniqueCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAddressUniqueCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAddressUniqueCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};

// ==================== COMPTE DES S ====================

const getAddressCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountAddressResponse>> => {
        // Parse les paramètres en objet
        const params: CountAddressProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les addresss
        const response = await AddressService.count(params);
        
        console.log("getAddressCount -> Revalidating addresss count from database...");
        
        return response;
    },
    ["address/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["address/count"],
    },
);

export const getAddressCount = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountAddressResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getAddressCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAddressCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAddressCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAddressCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAddressCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 