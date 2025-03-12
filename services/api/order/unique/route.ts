/**
 * API pour récupérer un(e) order unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) order par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getOrderCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    OrderComplete,
    OrderService,
    FindUniqueOrderProps
} from "@services/class/OrderClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de order unique
 */
export type OrderUniqueApiResponse =
    | { data: OrderComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) order mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la order au format JSON
 * @returns Order ou null si non trouvé(e)
 */
const getOrderCached = cache(
    async (stringParams: string): Promise<OrderComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueOrderProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la order
        const response = await OrderService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.order;
    },
    ["/orders/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/orders/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) order par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<OrderUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const order = await getOrderCached(stringParams);
        
        return NextResponse.json({ data: order }, { status: 200 });
    } catch (error) {
        console.error("getOrderCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getOrderCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getOrderCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getOrderCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 