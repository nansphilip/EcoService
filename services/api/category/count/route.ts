/**
 * API pour compter les categorys avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les categorys avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getCategoryCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    CategoryCount,
    CategoryService,
    CountCategoryProps
} from "@services/class/CategoryClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de categorys
 */
export type CategoryCountApiResponse =
    | { data: CategoryCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de categorys mis en cache
 */
const getCategoryCountCached = cache(
    async (stringParams: string): Promise<CategoryCount | null> => {
        // Parse les paramètres en objet
        const params: CountCategoryProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les categorys
        const response = await CategoryService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.categoryAmount;
    },
    ["categorys"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["categorys"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de categorys
 */
export const GET = async (request: NextRequest): Promise<NextResponse<CategoryCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des categorys
        const categoryAmount = await getCategoryCountCached(stringParams);

        // Retourne le comptage des categorys
        return NextResponse.json({ data: categoryAmount }, { status: 200 });
    } catch (error) {
        console.error("getCategoryCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getCategoryCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getCategoryCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getCategoryCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 