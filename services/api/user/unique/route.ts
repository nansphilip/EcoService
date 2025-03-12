/**
 * API pour récupérer un(e) user unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) user par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getUserCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    UserComplete,
    UserService,
    FindUniqueUserProps
} from "@services/class/UserClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de user unique
 */
export type UserUniqueApiResponse =
    | { data: UserComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) user mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la user au format JSON
 * @returns User ou null si non trouvé(e)
 */
const getUserCached = cache(
    async (stringParams: string): Promise<UserComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueUserProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la user
        const response = await UserService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.user;
    },
    ["/users/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/users/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) user par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<UserUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const user = await getUserCached(stringParams);
        
        return NextResponse.json({ data: user }, { status: 200 });
    } catch (error) {
        console.error("getUserCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getUserCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getUserCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getUserCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 