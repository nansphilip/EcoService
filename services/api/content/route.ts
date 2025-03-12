/**
 * API pour récupérer une liste de contents avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de contents
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getContentListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ContentComplete,
    ContentService,
    FindManyContentProps
} from "@services/class/ContentClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de liste de contents
 */
export type ContentListApiResponse =
    | { data: ContentComplete[] | null; }
    | { error: string; };

/**
 * Récupère une liste de contents mise en cache
 */
const getContentListCached = cache(
    async (stringParams: string): Promise<ContentComplete[] | null> => {
        // Parse les paramètres en objet
        const params: FindManyContentProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer la liste des contents
        const response = await ContentService.findMany(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        console.log("getContentList -> Revalidating contents list from database...");
        
        return response.contentList;
    },
    ["contents"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["contents"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de contents
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ContentListApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des contents
        const contentList = await getContentListCached(stringParams);

        // Retourne la liste des contents
        return NextResponse.json({ data: contentList }, { status: 200 });
    } catch (error) {
        console.error("getContentListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getContentListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getContentListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getContentListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 