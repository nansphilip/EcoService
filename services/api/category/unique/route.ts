/**
 * API pour récupérer un(e) category unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) category par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getCategoryCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    CategoryComplete,
    CategoryService,
    FindUniqueCategoryProps
} from "@services/class/CategoryClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de category unique
 */
export type CategoryUniqueApiResponse =
    | { data: CategoryComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) category mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la category au format JSON
 * @returns Category ou null si non trouvé(e)
 */
const getCategoryCached = cache(
    async (stringParams: string): Promise<CategoryComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueCategoryProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la category
        const response = await CategoryService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.category;
    },
    ["/categorys/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/categorys/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) category par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<CategoryUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const category = await getCategoryCached(stringParams);
        
        return NextResponse.json({ data: category }, { status: 200 });
    } catch (error) {
        console.error("getCategoryCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getCategoryCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getCategoryCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getCategoryCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 