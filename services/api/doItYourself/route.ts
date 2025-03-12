/**
 * API pour récupérer une liste de doItYourselfs avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de doItYourselfs
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getDoItYourselfListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    DoItYourselfComplete,
    DoItYourselfService,
    FindManyDoItYourselfProps
} from "@services/class/DoItYourselfClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de liste de doItYourselfs
 */
export type DoItYourselfListApiResponse =
    | { data: DoItYourselfComplete[] | null; }
    | { error: string; };

/**
 * Récupère une liste de doItYourselfs mise en cache
 */
const getDoItYourselfListCached = cache(
    async (stringParams: string): Promise<DoItYourselfComplete[] | null> => {
        // Parse les paramètres en objet
        const params: FindManyDoItYourselfProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer la liste des doItYourselfs
        const response = await DoItYourselfService.findMany(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        console.log("getDoItYourselfList -> Revalidating doItYourselfs list from database...");
        
        return response.doItYourselfList;
    },
    ["doItYourselfs"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["doItYourselfs"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de doItYourselfs
 */
export const GET = async (request: NextRequest): Promise<NextResponse<DoItYourselfListApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des doItYourselfs
        const doItYourselfList = await getDoItYourselfListCached(stringParams);

        // Retourne la liste des doItYourselfs
        return NextResponse.json({ data: doItYourselfList }, { status: 200 });
    } catch (error) {
        console.error("getDoItYourselfListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getDoItYourselfListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getDoItYourselfListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getDoItYourselfListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 