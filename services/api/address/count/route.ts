/**
 * API pour compter les addresss avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les addresss avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getAddressCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AddressCount,
    AddressService,
    CountAddressProps
} from "@services/class/AddressClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de addresss
 */
export type AddressCountApiResponse =
    | { data: AddressCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de addresss mis en cache
 */
const getAddressCountCached = cache(
    async (stringParams: string): Promise<AddressCount | null> => {
        // Parse les paramètres en objet
        const params: CountAddressProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les addresss
        const response = await AddressService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.addressAmount;
    },
    ["addresss"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["addresss"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de addresss
 */
export const GET = async (request: NextRequest): Promise<NextResponse<AddressCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des addresss
        const addressAmount = await getAddressCountCached(stringParams);

        // Retourne le comptage des addresss
        return NextResponse.json({ data: addressAmount }, { status: 200 });
    } catch (error) {
        console.error("getAddressCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getAddressCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAddressCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAddressCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 