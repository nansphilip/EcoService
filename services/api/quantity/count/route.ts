/**
 * API pour compter les quantitys avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les quantitys avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getQuantityCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    QuantityCount,
    QuantityService,
    CountQuantityProps
} from "@services/class/QuantityClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de quantitys
 */
export type QuantityCountApiResponse =
    | { data: QuantityCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de quantitys mis en cache
 */
const getQuantityCountCached = cache(
    async (stringParams: string): Promise<QuantityCount | null> => {
        // Parse les paramètres en objet
        const params: CountQuantityProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les quantitys
        const response = await QuantityService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.quantityAmount;
    },
    ["quantitys"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["quantitys"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de quantitys
 */
export const GET = async (request: NextRequest): Promise<NextResponse<QuantityCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des quantitys
        const quantityAmount = await getQuantityCountCached(stringParams);

        // Retourne le comptage des quantitys
        return NextResponse.json({ data: quantityAmount }, { status: 200 });
    } catch (error) {
        console.error("getQuantityCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getQuantityCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getQuantityCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getQuantityCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 