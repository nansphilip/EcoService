/**
 * API pour récupérer une liste de catégories avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de catégories
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getCategoryListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 * 
 * Le gestionnaire GET traite les requêtes HTTP et formate les réponses.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    CategoryComplete,
    CategoryService,
    FindManyCategoryProps
} from "@services/class/CategoryClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de liste de catégories
 */
export type CategoryListApiResponse =
    | { data: CategoryComplete[] | null; }
    | { error: string; };

/**
 * Récupère une liste de catégories mise en cache
 */
const getCategoryListCached = cache(
    async (stringParams: string): Promise<CategoryComplete[] | null> => {
        // Parse les paramètres en objet
        const params: FindManyCategoryProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer la liste des catégories
        const response = await CategoryService.findMany(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        console.log("getCategoryList -> Revalidating categories list from database...");
        
        return response.categoryList;
    },
    ["categories"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["categories"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de catégories
 */
export const GET = async (request: NextRequest): Promise<NextResponse<CategoryListApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des catégories
        const categoryList = await getCategoryListCached(stringParams);

        // Retourne la liste des catégories
        return NextResponse.json({ data: categoryList }, { status: 200 });
    } catch (error) {
        console.error("getCategoryListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getCategoryListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getCategoryListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getCategoryListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};