/**
 * API pour compter les contents avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les contents avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getContentCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ContentCount,
    ContentService,
    CountContentProps
} from "@services/class/ContentClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de contents
 */
export type ContentCountApiResponse =
    | { data: ContentCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de contents mis en cache
 */
const getContentCountCached = cache(
    async (stringParams: string): Promise<ContentCount | null> => {
        // Parse les paramètres en objet
        const params: CountContentProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les contents
        const response = await ContentService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.contentAmount;
    },
    ["contents"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["contents"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de contents
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ContentCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des contents
        const contentAmount = await getContentCountCached(stringParams);

        // Retourne le comptage des contents
        return NextResponse.json({ data: contentAmount }, { status: 200 });
    } catch (error) {
        console.error("getContentCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getContentCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getContentCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getContentCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 