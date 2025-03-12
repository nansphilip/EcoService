/**
 * API pour compter les sessions avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les sessions avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getSessionCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    SessionCount,
    SessionService,
    CountSessionProps
} from "@services/class/SessionClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de sessions
 */
export type SessionCountApiResponse =
    | { data: SessionCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de sessions mis en cache
 */
const getSessionCountCached = cache(
    async (stringParams: string): Promise<SessionCount | null> => {
        // Parse les paramètres en objet
        const params: CountSessionProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les sessions
        const response = await SessionService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.sessionAmount;
    },
    ["sessions"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["sessions"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de sessions
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SessionCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des sessions
        const sessionAmount = await getSessionCountCached(stringParams);

        // Retourne le comptage des sessions
        return NextResponse.json({ data: sessionAmount }, { status: 200 });
    } catch (error) {
        console.error("getSessionCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getSessionCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getSessionCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getSessionCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 