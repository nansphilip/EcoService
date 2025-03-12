/**
 * API pour récupérer un(e) address unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) address par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getAddressCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AddressComplete,
    AddressService,
    FindUniqueAddressProps
} from "@services/class/AddressClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de address unique
 */
export type AddressUniqueApiResponse =
    | { data: AddressComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) address mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la address au format JSON
 * @returns Address ou null si non trouvé(e)
 */
const getAddressCached = cache(
    async (stringParams: string): Promise<AddressComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueAddressProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la address
        const response = await AddressService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.address;
    },
    ["/addresss/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/addresss/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) address par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<AddressUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const address = await getAddressCached(stringParams);
        
        return NextResponse.json({ data: address }, { status: 200 });
    } catch (error) {
        console.error("getAddressCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getAddressCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAddressCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAddressCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 