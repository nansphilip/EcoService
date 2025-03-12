/**
 * API pour récupérer un(e) fruit unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) fruit par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getFruitCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    FruitComplete,
    FruitService,
    FindUniqueFruitProps
} from "@services/class/FruitClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de fruit unique
 */
export type FruitUniqueApiResponse =
    | { data: FruitComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) fruit mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la fruit au format JSON
 * @returns Fruit ou null si non trouvé(e)
 */
const getFruitCached = cache(
    async (stringParams: string): Promise<FruitComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueFruitProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la fruit
        const response = await FruitService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.fruit;
    },
    ["/fruits/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/fruits/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) fruit par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<FruitUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const fruit = await getFruitCached(stringParams);
        
        return NextResponse.json({ data: fruit }, { status: 200 });
    } catch (error) {
        console.error("getFruitCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getFruitCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getFruitCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getFruitCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 