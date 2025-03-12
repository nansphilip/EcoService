/**
 * API pour récupérer un(e) content unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) content par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getContentCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ContentComplete,
    ContentService,
    FindUniqueContentProps
} from "@services/class/ContentClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de content unique
 */
export type ContentUniqueApiResponse =
    | { data: ContentComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) content mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la content au format JSON
 * @returns Content ou null si non trouvé(e)
 */
const getContentCached = cache(
    async (stringParams: string): Promise<ContentComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueContentProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la content
        const response = await ContentService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.content;
    },
    ["/contents/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/contents/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) content par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ContentUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const content = await getContentCached(stringParams);
        
        return NextResponse.json({ data: content }, { status: 200 });
    } catch (error) {
        console.error("getContentCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getContentCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getContentCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getContentCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 