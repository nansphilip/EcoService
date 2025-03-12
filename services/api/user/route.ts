/**
 * API pour récupérer une liste de users avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de users
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getUserListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    UserComplete,
    UserService,
    FindManyUserProps
} from "@services/class/UserClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Type de réponse pour l'API de liste de users
 */
export type UserListApiResponse =
    | { data: UserComplete[] | null; }
    | { error: string; };

/**
 * Récupère une liste de users mise en cache
 */
const getUserListCached = cache(
    async (stringParams: string): Promise<UserComplete[] | null> => {
        // Parse les paramètres en objet
        const params: FindManyUserProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer la liste des users
        const response = await UserService.findMany(params);
        
        // Vérifie si la réponse contient une erreur
        if ('error' in response) {
            console.error(response.error);
            return null;
        }
        
        console.log("getUserList -> Revalidating users list from database...");
        
        return response.userList;
    },
    ["users"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["users"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de users
 */
export const GET = async (request: NextRequest): Promise<NextResponse<UserListApiResponse>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des users
        const userList = await getUserListCached(stringParams);

        // Retourne la liste des users
        return NextResponse.json({ data: userList }, { status: 200 });
    } catch (error) {
        console.error("getUserListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "getUserListCached -> Invalid Zod params -> " + error.message });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getUserListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getUserListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 