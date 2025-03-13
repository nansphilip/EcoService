/**
 * API pour récupérer une liste de quantitys avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de quantitys
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getQuantityListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    QuantityService,
    FindManyQuantityProps,
    FindManyQuantityResponse,
} from "@services/class/QuantityClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de quantitys mise en cache
 */
const getQuantityListCached = cache(
    async (stringParams: string): Promise<FindManyQuantityResponse> => {
        // Parse les paramètres en objet
        const params: FindManyQuantityProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des quantitys
        const response = await QuantityService.findMany(params);

        console.log("getQuantityList -> Revalidating quantitys list from database...");

        return response;
    },
    ["quantities"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["quantities"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de quantitys
 */
export const GET = async (request: NextRequest): Promise<NextResponse<FindManyQuantityResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des quantitys
        const response = await getQuantityListCached(stringParams);

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