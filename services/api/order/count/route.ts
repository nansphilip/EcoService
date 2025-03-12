/**
 * API pour compter les orders avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les orders avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getOrderCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    OrderCount,
    OrderService,
    CountOrderProps
} from "@services/class/OrderClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de orders
 */
export type OrderCountApiResponse =
    | { data: OrderCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de orders mis en cache
 */
const getOrderCountCached = cache(
    async (stringParams: string): Promise<OrderCount | null> => {
        // Parse les paramètres en objet
        const params: CountOrderProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les orders
        const response = await OrderService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.orderAmount;
    },
    ["orders"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["orders"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de orders
 */
export const GET = async (request: NextRequest): Promise<NextResponse<OrderCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des orders
        const orderAmount = await getOrderCountCached(stringParams);

        // Retourne le comptage des orders
        return NextResponse.json({ data: orderAmount }, { status: 200 });
    } catch (error) {
        console.error("getOrderCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getOrderCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getOrderCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getOrderCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 