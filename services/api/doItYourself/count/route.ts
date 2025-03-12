/**
 * API pour compter les doItYourselfs avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les doItYourselfs avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getDoItYourselfCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    DoItYourselfCount,
    DoItYourselfService,
    CountDoItYourselfProps
} from "@services/class/DoItYourselfClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de doItYourselfs
 */
export type DoItYourselfCountApiResponse =
    | { data: DoItYourselfCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de doItYourselfs mis en cache
 */
const getDoItYourselfCountCached = cache(
    async (stringParams: string): Promise<DoItYourselfCount | null> => {
        // Parse les paramètres en objet
        const params: CountDoItYourselfProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les doItYourselfs
        const response = await DoItYourselfService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.doItYourselfAmount;
    },
    ["doItYourselfs"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["doItYourselfs"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de doItYourselfs
 */
export const GET = async (request: NextRequest): Promise<NextResponse<DoItYourselfCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des doItYourselfs
        const doItYourselfAmount = await getDoItYourselfCountCached(stringParams);

        // Retourne le comptage des doItYourselfs
        return NextResponse.json({ data: doItYourselfAmount }, { status: 200 });
    } catch (error) {
        console.error("getDoItYourselfCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getDoItYourselfCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getDoItYourselfCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getDoItYourselfCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 