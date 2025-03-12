/**
 * API pour compter les users avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les users avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getUserCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    UserCount,
    UserService,
    CountUserProps
} from "@services/class/UserClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de users
 */
export type UserCountApiResponse =
    | { data: UserCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de users mis en cache
 */
const getUserCountCached = cache(
    async (stringParams: string): Promise<UserCount | null> => {
        // Parse les paramètres en objet
        const params: CountUserProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les users
        const response = await UserService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.userAmount;
    },
    ["users"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["users"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de users
 */
export const GET = async (request: NextRequest): Promise<NextResponse<UserCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des users
        const userAmount = await getUserCountCached(stringParams);

        // Retourne le comptage des users
        return NextResponse.json({ data: userAmount }, { status: 200 });
    } catch (error) {
        console.error("getUserCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getUserCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getUserCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getUserCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 