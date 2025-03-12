/**
 * API pour récupérer une liste de articles avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de articles
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getArticleListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ArticleComplete,
    ArticleService,
    FindManyArticleProps
} from "@services/class/ArticleClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de liste de articles
 */
export type ArticleListApiResponse =
    | { data: ArticleComplete[] | null; }
    | { error: string; };

/**
 * Récupère une liste de articles mise en cache
 */
const getArticleListCached = cache(
    async (stringParams: string): Promise<ArticleComplete[] | null> => {
        // Parse les paramètres en objet
        const params: FindManyArticleProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer la liste des articles
        const response = await ArticleService.findMany(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        console.log("getArticleList -> Revalidating articles list from database...");
        
        return response.articleList;
    },
    ["articles"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["articles"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de articles
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ArticleListApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des articles
        const articleList = await getArticleListCached(stringParams);

        // Retourne la liste des articles
        return NextResponse.json({ data: articleList }, { status: 200 });
    } catch (error) {
        console.error("getArticleListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getArticleListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getArticleListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getArticleListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 