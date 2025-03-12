/**
 * API pour compter les fruits avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les fruits avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getFruitCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    FruitCount,
    FruitService,
    CountFruitProps
} from "@services/class/FruitClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de fruits
 */
export type FruitCountApiResponse =
    | { data: FruitCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de fruits mis en cache
 */
const getFruitCountCached = cache(
    async (stringParams: string): Promise<FruitCount | null> => {
        // Parse les paramètres en objet
        const params: CountFruitProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les fruits
        const response = await FruitService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.fruitAmount;
    },
    ["fruits"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["fruits"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de fruits
 */
export const GET = async (request: NextRequest): Promise<NextResponse<FruitCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des fruits
        const fruitAmount = await getFruitCountCached(stringParams);

        // Retourne le comptage des fruits
        return NextResponse.json({ data: fruitAmount }, { status: 200 });
    } catch (error) {
        console.error("getFruitCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getFruitCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getFruitCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getFruitCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 