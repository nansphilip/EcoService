/**
 * API pour récupérer un(e) product unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) product par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getProductCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ProductComplete,
    ProductService,
    FindUniqueProductProps
} from "@services/class/ProductClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de product unique
 */
export type ProductUniqueApiResponse =
    | { data: ProductComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) product mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la product au format JSON
 * @returns Product ou null si non trouvé(e)
 */
const getProductCached = cache(
    async (stringParams: string): Promise<ProductComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueProductProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la product
        const response = await ProductService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.product;
    },
    ["/products/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/products/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) product par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ProductUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const product = await getProductCached(stringParams);
        
        return NextResponse.json({ data: product }, { status: 200 });
    } catch (error) {
        console.error("getProductCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getProductCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getProductCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getProductCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 