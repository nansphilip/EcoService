/**
 * API pour compter les accounts avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les accounts avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getAccountCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AccountCount,
    AccountService,
    CountAccountProps
} from "@services/class/AccountClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de accounts
 */
export type AccountCountApiResponse =
    | { data: AccountCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de accounts mis en cache
 */
const getAccountCountCached = cache(
    async (stringParams: string): Promise<AccountCount | null> => {
        // Parse les paramètres en objet
        const params: CountAccountProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les accounts
        const response = await AccountService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.accountAmount;
    },
    ["accounts"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["accounts"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de accounts
 */
export const GET = async (request: NextRequest): Promise<NextResponse<AccountCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des accounts
        const accountAmount = await getAccountCountCached(stringParams);

        // Retourne le comptage des accounts
        return NextResponse.json({ data: accountAmount }, { status: 200 });
    } catch (error) {
        console.error("getAccountCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getAccountCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAccountCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAccountCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 