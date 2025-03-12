/**
 * API pour récupérer un(e) quantity unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) quantity par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getQuantityCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    QuantityComplete,
    QuantityService,
    FindUniqueQuantityProps
} from "@services/class/QuantityClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de quantity unique
 */
export type QuantityUniqueApiResponse =
    | { data: QuantityComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) quantity mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la quantity au format JSON
 * @returns Quantity ou null si non trouvé(e)
 */
const getQuantityCached = cache(
    async (stringParams: string): Promise<QuantityComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueQuantityProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la quantity
        const response = await QuantityService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.quantity;
    },
    ["/quantitys/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/quantitys/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) quantity par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<QuantityUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const quantity = await getQuantityCached(stringParams);
        
        return NextResponse.json({ data: quantity }, { status: 200 });
    } catch (error) {
        console.error("getQuantityCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getQuantityCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getQuantityCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getQuantityCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 