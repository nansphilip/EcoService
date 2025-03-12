/**
 * API pour compter les verifications avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les verifications avec filtrage.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats.
 * 
 * La fonction getVerificationCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    VerificationCount,
    VerificationService,
    CountVerificationProps
} from "@services/class/VerificationClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de comptage de verifications
 */
export type VerificationCountApiResponse =
    | { data: VerificationCount | null; }
    | { error: string; };

/**
 * Récupère un comptage de verifications mis en cache
 */
const getVerificationCountCached = cache(
    async (stringParams: string): Promise<VerificationCount | null> => {
        // Parse les paramètres en objet
        const params: CountVerificationProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les verifications
        const response = await VerificationService.count(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.verificationAmount;
    },
    ["verifications"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["verifications"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de comptage de verifications
 */
export const GET = async (request: NextRequest): Promise<NextResponse<VerificationCountApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère le comptage des verifications
        const verificationAmount = await getVerificationCountCached(stringParams);

        // Retourne le comptage des verifications
        return NextResponse.json({ data: verificationAmount }, { status: 200 });
    } catch (error) {
        console.error("getVerificationCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getVerificationCountCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getVerificationCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getVerificationCountCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 