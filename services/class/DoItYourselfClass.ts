/**
 * Classe de service pour les opérations CRUD sur les doItYourselfs
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les doItYourselfs.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DoItYourself, DoItYourselfSchema } from "@services/schemas";
import {
    DoItYourselfCreateInputSchema,
    DoItYourselfUpdateInputSchema,
    DoItYourselfWhereInputSchema,
    DoItYourselfWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { DoItYourselfIncludeSchema } from "@services/schemas/inputTypeSchemas/DoItYourselfIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type DoItYourselfModel = z.infer<typeof DoItYourselfSchema>;

export type DoItYourselfRelations = z.infer<typeof DoItYourselfIncludeSchema>;

export type DoItYourselfComplete = z.infer<typeof DoItYourselfSchema> & z.infer<typeof DoItYourselfIncludeSchema>;

export type DoItYourselfCount = number;

// ============== Schema Types ============== //

const createDoItYourselfSchema: ZodType<Prisma.DoItYourselfCreateArgs> = z.strictObject({
    data: DoItYourselfCreateInputSchema,
});

const updateDoItYourselfSchema: ZodType<Prisma.DoItYourselfUpdateArgs> = z.strictObject({
    where: DoItYourselfWhereUniqueInputSchema,
    data: DoItYourselfUpdateInputSchema,
});

const deleteDoItYourselfSchema: ZodType<Prisma.DoItYourselfDeleteArgs> = z.strictObject({
    where: DoItYourselfWhereUniqueInputSchema,
});

const selectDoItYourselfSchema: ZodType<Prisma.DoItYourselfFindUniqueArgs> = z.strictObject({
    where: DoItYourselfWhereUniqueInputSchema,
});

const selectManyDoItYourselfSchema: ZodType<Prisma.DoItYourselfFindManyArgs> = z.strictObject({
    where: DoItYourselfWhereInputSchema,
});

const countDoItYourselfSchema: ZodType<Prisma.DoItYourselfCountArgs> = z.strictObject({
    where: DoItYourselfWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateDoItYourselfProps = z.infer<typeof createDoItYourselfSchema>;

export type UpdateDoItYourselfProps = z.infer<typeof updateDoItYourselfSchema>;

export type DeleteDoItYourselfProps = z.infer<typeof deleteDoItYourselfSchema>;

export type FindUniqueDoItYourselfProps = z.infer<typeof selectDoItYourselfSchema>;

export type FindManyDoItYourselfProps = z.infer<typeof selectManyDoItYourselfSchema>;

export type CountDoItYourselfProps = z.infer<typeof countDoItYourselfSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateDoItYourselfResponse = ResponseFormat<"doItYourself", DoItYourselfModel>;

export type UpdateDoItYourselfResponse = ResponseFormat<"doItYourself", DoItYourselfModel>;

export type DeleteDoItYourselfResponse = ResponseFormat<"doItYourself", DoItYourselfModel>;

export type FindUniqueDoItYourselfResponse = ResponseFormat<"doItYourself", DoItYourselfComplete | null>;

export type FindManyDoItYourselfResponse = ResponseFormat<"doItYourselfList", DoItYourselfComplete[]>;

export type CountDoItYourselfResponse = ResponseFormat<"doItYourselfAmount", DoItYourselfCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les doItYourselfs
 */
export class DoItYourselfService {
    /**
     * Crée un(e) nouveau/nouvelle doItYourself
     * @param props Propriétés du/de la doItYourself
     * @returns DoItYourself créé(e) ou erreur
     */
    static async create(props: CreateDoItYourselfProps): Promise<CreateDoItYourselfResponse> {
        try {
            const data = createDoItYourselfSchema.parse(props);

            const doItYourself: DoItYourself = await PrismaInstance.doItYourself.create(data);

            return { doItYourself };
        } catch (error) {
            console.error("DoItYourselfService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> Create -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create doItYourself..." };
        }
    }

    /**
     * Met à jour un(e) doItYourself
     * @param props ID du/de la doItYourself et nouvelles données
     * @returns DoItYourself mis(e) à jour ou erreur
     */
    static async update(props: UpdateDoItYourselfProps): Promise<UpdateDoItYourselfResponse> {
        try {
            const data = updateDoItYourselfSchema.parse(props);

            const doItYourself: DoItYourself = await PrismaInstance.doItYourself.update(data);

            return { doItYourself };
        } catch (error) {
            console.error("DoItYourselfService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> Update -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update doItYourself..." };
        }
    }

    /**
     * Supprime un(e) doItYourself
     * @param props ID du/de la doItYourself
     * @returns DoItYourself supprimé(e) ou erreur
     */
    static async delete(props: DeleteDoItYourselfProps): Promise<DeleteDoItYourselfResponse> {
        try {
            const data = deleteDoItYourselfSchema.parse(props);

            const doItYourself: DoItYourself = await PrismaInstance.doItYourself.delete(data);

            return { doItYourself };
        } catch (error) {
            console.error("DoItYourselfService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> Delete -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete doItYourself..." };
        }
    }

    /**
     * Récupère un(e) doItYourself par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueDoItYourselfProps): Promise<FindUniqueDoItYourselfResponse> {
        try {
            const data = selectDoItYourselfSchema.parse(props);

            const doItYourself: DoItYourselfComplete | null = await PrismaInstance.doItYourself.findUnique(data);

            return { doItYourself };
        } catch (error) {
            console.error("DoItYourselfService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find doItYourself..." };
        }
    }

    /**
     * Récupère une liste de doItYourselfs avec filtres
     */
    static async findMany(props: FindManyDoItYourselfProps): Promise<FindManyDoItYourselfResponse> {
        try {
            const data = selectManyDoItYourselfSchema.parse(props);

            const doItYourselfList: DoItYourselfComplete[] = await PrismaInstance.doItYourself.findMany(data);

            return { doItYourselfList };
        } catch (error) {
            console.error("DoItYourselfService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find doItYourselfs..." };
        }
    }

    /**
     * Compte les doItYourselfs avec filtres
     */
    static async count(props: CountDoItYourselfProps): Promise<CountDoItYourselfResponse> {
        try {
            const data = countDoItYourselfSchema.parse(props);

            const doItYourselfAmount: DoItYourselfCount = await PrismaInstance.doItYourself.count(data);

            return { doItYourselfAmount };
        } catch (error) {
            console.error("DoItYourselfService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DoItYourselfService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DoItYourselfService -> Count -> Prisma error -> " + error.message);
                throw new Error("DoItYourselfService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count doItYourselfs..." };
        }
    }
} 