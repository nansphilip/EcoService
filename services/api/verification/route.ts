/**
 * API pour récupérer une liste de verifications avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de verifications
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getVerificationListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    VerificationComplete,
    VerificationService,
    FindManyVerificationProps
} from "@services/class/VerificationClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de liste de verifications
 */
export type VerificationListApiResponse =
    | { data: VerificationComplete[] | null; }
    | { error: string; };

/**
 * Récupère une liste de verifications mise en cache
 */
const getVerificationListCached = cache(
    async (stringParams: string): Promise<VerificationComplete[] | null> => {
        // Parse les paramètres en objet
        const params: FindManyVerificationProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer la liste des verifications
        const response = await VerificationService.findMany(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        console.log("getVerificationList -> Revalidating verifications list from database...");
        
        return response.verificationList;
    },
    ["verifications"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["verifications"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de verifications
 */
export const GET = async (request: NextRequest): Promise<NextResponse<VerificationListApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des verifications
        const verificationList = await getVerificationListCached(stringParams);

        // Retourne la liste des verifications
        return NextResponse.json({ data: verificationList }, { status: 200 });
    } catch (error) {
        console.error("getVerificationListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getVerificationListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getVerificationListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getVerificationListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 