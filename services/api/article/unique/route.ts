/**
 * API pour récupérer un(e) article unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) article par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getArticleCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ArticleComplete,
    ArticleService,
    FindUniqueArticleProps
} from "@services/class/ArticleClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de article unique
 */
export type ArticleUniqueApiResponse =
    | { data: ArticleComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) article mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la article au format JSON
 * @returns Article ou null si non trouvé(e)
 */
const getArticleCached = cache(
    async (stringParams: string): Promise<ArticleComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueArticleProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la article
        const response = await ArticleService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.article;
    },
    ["/articles/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/articles/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) article par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ArticleUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const article = await getArticleCached(stringParams);
        
        return NextResponse.json({ data: article }, { status: 200 });
    } catch (error) {
        console.error("getArticleCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getArticleCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getArticleCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getArticleCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 