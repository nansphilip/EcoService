/**
 * API pour compter les articles avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les articles avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getArticleCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ArticleCount,
    ArticleService,
    CountArticleProps
} from "@services/class/ArticleClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de articles
 */
export type ArticleCountApiResponse =
    | { data: ArticleCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de articles mis en cache
 */
const getArticleCountCached = cache(
    async (stringParams: string): Promise<ArticleCount | null> => {
        // Parse les paramètres en objet
        const params: CountArticleProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les articles
        const response = await ArticleService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.articleAmount;
    },
    ["articles"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["articles"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de articles
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ArticleCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des articles
        const articleAmount = await getArticleCountCached(stringParams);

        // Retourne le comptage des articles
        return NextResponse.json({ data: articleAmount }, { status: 200 });
    } catch (error) {
        console.error("getArticleCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getArticleCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getArticleCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getArticleCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 