/**
 * API pour récupérer une liste de orders avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de orders
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getOrderListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    OrderComplete,
    OrderService,
    FindManyOrderProps
} from "@services/class/OrderClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de liste de orders
 */
export type OrderListApiResponse =
    | { data: OrderComplete[] | null; }
    | { error: string; };

/**
 * Récupère une liste de orders mise en cache
 */
const getOrderListCached = cache(
    async (stringParams: string): Promise<OrderComplete[] | null> => {
        // Parse les paramètres en objet
        const params: FindManyOrderProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer la liste des orders
        const response = await OrderService.findMany(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        console.log("getOrderList -> Revalidating orders list from database...");
        
        return response.orderList;
    },
    ["orders"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["orders"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de orders
 */
export const GET = async (request: NextRequest): Promise<NextResponse<OrderListApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des orders
        const orderList = await getOrderListCached(stringParams);

        // Retourne la liste des orders
        return NextResponse.json({ data: orderList }, { status: 200 });
    } catch (error) {
        console.error("getOrderListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getOrderListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getOrderListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getOrderListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 