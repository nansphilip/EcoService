/**
 * Classe de service pour les opérations CRUD sur les sessions
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les sessions.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Session, SessionSchema } from "@services/schemas";
import {
    SessionCreateInputSchema,
    SessionUpdateInputSchema,
    SessionWhereInputSchema,
    SessionWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { SessionIncludeSchema } from "@services/schemas/inputTypeSchemas/SessionIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type SessionModel = z.infer<typeof SessionSchema>;

export type SessionRelations = z.infer<typeof SessionIncludeSchema>;

export type SessionComplete = z.infer<typeof SessionSchema> & z.infer<typeof SessionIncludeSchema>;

export type SessionCount = number;

// ============== Schema Types ============== //

const createSessionSchema: ZodType<Prisma.SessionCreateArgs> = z.strictObject({
    data: SessionCreateInputSchema,
});

const updateSessionSchema: ZodType<Prisma.SessionUpdateArgs> = z.strictObject({
    where: SessionWhereUniqueInputSchema,
    data: SessionUpdateInputSchema,
});

const deleteSessionSchema: ZodType<Prisma.SessionDeleteArgs> = z.strictObject({
    where: SessionWhereUniqueInputSchema,
});

const selectSessionSchema: ZodType<Prisma.SessionFindUniqueArgs> = z.strictObject({
    where: SessionWhereUniqueInputSchema,
});

const selectManySessionSchema: ZodType<Prisma.SessionFindManyArgs> = z.strictObject({
    where: SessionWhereInputSchema,
});

const countSessionSchema: ZodType<Prisma.SessionCountArgs> = z.strictObject({
    where: SessionWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateSessionProps = z.infer<typeof createSessionSchema>;

export type UpdateSessionProps = z.infer<typeof updateSessionSchema>;

export type DeleteSessionProps = z.infer<typeof deleteSessionSchema>;

export type FindUniqueSessionProps = z.infer<typeof selectSessionSchema>;

export type FindManySessionProps = z.infer<typeof selectManySessionSchema>;

export type CountSessionProps = z.infer<typeof countSessionSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateSessionResponse = ResponseFormat<"session", SessionModel>;

export type UpdateSessionResponse = ResponseFormat<"session", SessionModel>;

export type DeleteSessionResponse = ResponseFormat<"session", SessionModel>;

export type FindUniqueSessionResponse = ResponseFormat<"session", SessionComplete | null>;

export type FindManySessionResponse = ResponseFormat<"sessionList", SessionComplete[]>;

export type CountSessionResponse = ResponseFormat<"sessionAmount", SessionCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les sessions
 */
export class SessionService {
    /**
     * Crée un(e) nouveau/nouvelle session
     * @param props Propriétés du/de la session
     * @returns Session créé(e) ou erreur
     */
    static async create(props: CreateSessionProps): Promise<CreateSessionResponse> {
        try {
            const data = createSessionSchema.parse(props);

            const session: Session = await PrismaInstance.session.create(data);

            return { session };
        } catch (error) {
            console.error("SessionService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> Create -> Prisma error -> " + error.message);
                throw new Error("SessionService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create session..." };
        }
    }

    /**
     * Met à jour un(e) session
     * @param props ID du/de la session et nouvelles données
     * @returns Session mis(e) à jour ou erreur
     */
    static async update(props: UpdateSessionProps): Promise<UpdateSessionResponse> {
        try {
            const data = updateSessionSchema.parse(props);

            const session: Session = await PrismaInstance.session.update(data);

            return { session };
        } catch (error) {
            console.error("SessionService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> Update -> Prisma error -> " + error.message);
                throw new Error("SessionService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update session..." };
        }
    }

    /**
     * Supprime un(e) session
     * @param props ID du/de la session
     * @returns Session supprimé(e) ou erreur
     */
    static async delete(props: DeleteSessionProps): Promise<DeleteSessionResponse> {
        try {
            const data = deleteSessionSchema.parse(props);

            const session: Session = await PrismaInstance.session.delete(data);

            return { session };
        } catch (error) {
            console.error("SessionService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> Delete -> Prisma error -> " + error.message);
                throw new Error("SessionService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete session..." };
        }
    }

    /**
     * Récupère un(e) session par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueSessionProps): Promise<FindUniqueSessionResponse> {
        try {
            const data = selectSessionSchema.parse(props);

            const session: SessionComplete | null = await PrismaInstance.session.findUnique(data);

            return { session };
        } catch (error) {
            console.error("SessionService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("SessionService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find session..." };
        }
    }

    /**
     * Récupère une liste de sessions avec filtres
     */
    static async findMany(props: FindManySessionProps): Promise<FindManySessionResponse> {
        try {
            const data = selectManySessionSchema.parse(props);

            const sessionList: SessionComplete[] = await PrismaInstance.session.findMany(data);

            return { sessionList };
        } catch (error) {
            console.error("SessionService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("SessionService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find sessions..." };
        }
    }

    /**
     * Compte les sessions avec filtres
     */
    static async count(props: CountSessionProps): Promise<CountSessionResponse> {
        try {
            const data = countSessionSchema.parse(props);

            const sessionAmount: SessionCount = await PrismaInstance.session.count(data);

            return { sessionAmount };
        } catch (error) {
            console.error("SessionService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("SessionService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("SessionService -> Count -> Prisma error -> " + error.message);
                throw new Error("SessionService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count sessions..." };
        }
    }
} 