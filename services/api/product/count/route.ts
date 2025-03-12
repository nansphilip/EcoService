/**
 * API pour compter les products avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les products avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getProductCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ProductCount,
    ProductService,
    CountProductProps
} from "@services/class/ProductClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de products
 */
export type ProductCountApiResponse =
    | { data: ProductCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de products mis en cache
 */
const getProductCountCached = cache(
    async (stringParams: string): Promise<ProductCount | null> => {
        // Parse les paramètres en objet
        const params: CountProductProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les products
        const response = await ProductService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.productAmount;
    },
    ["products"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["products"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de products
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ProductCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des products
        const productAmount = await getProductCountCached(stringParams);

        // Retourne le comptage des products
        return NextResponse.json({ data: productAmount }, { status: 200 });
    } catch (error) {
        console.error("getProductCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getProductCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getProductCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getProductCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 