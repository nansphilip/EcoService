/**
 * API pour récupérer un(e) account unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) account par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getAccountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AccountComplete,
    AccountService,
    FindUniqueAccountProps
} from "@services/class/AccountClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de account unique
 */
export type AccountUniqueApiResponse =
    | { data: AccountComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) account mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la account au format JSON
 * @returns Account ou null si non trouvé(e)
 */
const getAccountCached = cache(
    async (stringParams: string): Promise<AccountComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueAccountProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la account
        const response = await AccountService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.account;
    },
    ["/accounts/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/accounts/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) account par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<AccountUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const account = await getAccountCached(stringParams);
        
        return NextResponse.json({ data: account }, { status: 200 });
    } catch (error) {
        console.error("getAccountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getAccountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAccountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAccountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 