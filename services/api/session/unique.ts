/**
 * API pour récupérer un(e) session unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) session par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getSessionCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    SessionService,
    FindUniqueSessionProps,
    FindUniqueSessionResponse
} from "@services/class/SessionClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) session mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la session au format JSON
 * @returns Réponse contenant le/la session ou une erreur
 */
const getSessionCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueSessionResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueSessionProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la session
        const response = await SessionService.findUnique(params);
        
        console.log("getSessionUnique -> Revalidating session from database...");
        
        return response;
    },
    ["session/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["session/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) session par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueSessionResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getSessionCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getSessionCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getSessionCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getSessionCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getSessionCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
