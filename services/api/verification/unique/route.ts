/**
 * API pour récupérer un(e) verification unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) verification par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getVerificationCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    VerificationComplete,
    VerificationService,
    FindUniqueVerificationProps
} from "@services/class/VerificationClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de verification unique
 */
export type VerificationUniqueApiResponse =
    | { data: VerificationComplete | null; }
    | { error: string; };

/**
 * Récupère un(e) verification mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la verification au format JSON
 * @returns Verification ou null si non trouvé(e)
 */
const getVerificationCached = cache(
    async (stringParams: string): Promise<VerificationComplete | null> => {
        // Parse les paramètres en objet
        const params: FindUniqueVerificationProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la verification
        const response = await VerificationService.findUnique(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        return response.verification;
    },
    ["/verifications/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/verifications/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) verification par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<VerificationUniqueApiResponse>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const verification = await getVerificationCached(stringParams);
        
        return NextResponse.json({ data: verification }, { status: 200 });
    } catch (error) {
        console.error("getVerificationCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getVerificationCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getVerificationCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getVerificationCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 