/**
 * Classe de service pour les opérations CRUD sur les quantitys
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les quantitys.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Quantity, QuantitySchema } from "@services/schemas";
import {
    QuantityCreateInputSchema,
    QuantityUpdateInputSchema,
    QuantityWhereInputSchema,
    QuantityWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { QuantityIncludeSchema } from "@services/schemas/inputTypeSchemas/QuantityIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type QuantityModel = z.infer<typeof QuantitySchema>;

export type QuantityRelations = z.infer<typeof QuantityIncludeSchema>;

export type QuantityComplete = z.infer<typeof QuantitySchema> & z.infer<typeof QuantityIncludeSchema>;

export type QuantityCount = number;

// ============== Schema Types ============== //

const createQuantitySchema: ZodType<Prisma.QuantityCreateArgs> = z.strictObject({
    data: QuantityCreateInputSchema,
});

const updateQuantitySchema: ZodType<Prisma.QuantityUpdateArgs> = z.strictObject({
    where: QuantityWhereUniqueInputSchema,
    data: QuantityUpdateInputSchema,
});

const deleteQuantitySchema: ZodType<Prisma.QuantityDeleteArgs> = z.strictObject({
    where: QuantityWhereUniqueInputSchema,
});

const selectQuantitySchema: ZodType<Prisma.QuantityFindUniqueArgs> = z.strictObject({
    where: QuantityWhereUniqueInputSchema,
});

const selectManyQuantitySchema: ZodType<Prisma.QuantityFindManyArgs> = z.strictObject({
    where: QuantityWhereInputSchema,
});

const countQuantitySchema: ZodType<Prisma.QuantityCountArgs> = z.strictObject({
    where: QuantityWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateQuantityProps = z.infer<typeof createQuantitySchema>;

export type UpdateQuantityProps = z.infer<typeof updateQuantitySchema>;

export type DeleteQuantityProps = z.infer<typeof deleteQuantitySchema>;

export type FindUniqueQuantityProps = z.infer<typeof selectQuantitySchema>;

export type FindManyQuantityProps = z.infer<typeof selectManyQuantitySchema>;

export type CountQuantityProps = z.infer<typeof countQuantitySchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateQuantityResponse = ResponseFormat<"quantity", QuantityModel>;

export type UpdateQuantityResponse = ResponseFormat<"quantity", QuantityModel>;

export type DeleteQuantityResponse = ResponseFormat<"quantity", QuantityModel>;

export type FindUniqueQuantityResponse = ResponseFormat<"quantity", QuantityComplete | null>;

export type FindManyQuantityResponse = ResponseFormat<"quantityList", QuantityComplete[]>;

export type CountQuantityResponse = ResponseFormat<"quantityAmount", QuantityCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les quantitys
 */
export class QuantityService {
    /**
     * Crée un(e) nouveau/nouvelle quantity
     * @param props Propriétés du/de la quantity
     * @returns Quantity créé(e) ou erreur
     */
    static async create(props: CreateQuantityProps): Promise<CreateQuantityResponse> {
        try {
            const data = createQuantitySchema.parse(props);

            const quantity: Quantity = await PrismaInstance.quantity.create(data);

            return { quantity };
        } catch (error) {
            console.error("QuantityService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Create -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create quantity..." };
        }
    }

    /**
     * Met à jour un(e) quantity
     * @param props ID du/de la quantity et nouvelles données
     * @returns Quantity mis(e) à jour ou erreur
     */
    static async update(props: UpdateQuantityProps): Promise<UpdateQuantityResponse> {
        try {
            const data = updateQuantitySchema.parse(props);

            const quantity: Quantity = await PrismaInstance.quantity.update(data);

            return { quantity };
        } catch (error) {
            console.error("QuantityService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Update -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update quantity..." };
        }
    }

    /**
     * Supprime un(e) quantity
     * @param props ID du/de la quantity
     * @returns Quantity supprimé(e) ou erreur
     */
    static async delete(props: DeleteQuantityProps): Promise<DeleteQuantityResponse> {
        try {
            const data = deleteQuantitySchema.parse(props);

            const quantity: Quantity = await PrismaInstance.quantity.delete(data);

            return { quantity };
        } catch (error) {
            console.error("QuantityService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Delete -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete quantity..." };
        }
    }

    /**
     * Récupère un(e) quantity par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueQuantityProps): Promise<FindUniqueQuantityResponse> {
        try {
            const data = selectQuantitySchema.parse(props);

            const quantity: QuantityComplete | null = await PrismaInstance.quantity.findUnique(data);

            return { quantity };
        } catch (error) {
            console.error("QuantityService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find quantity..." };
        }
    }

    /**
     * Récupère une liste de quantitys avec filtres
     */
    static async findMany(props: FindManyQuantityProps): Promise<FindManyQuantityResponse> {
        try {
            const data = selectManyQuantitySchema.parse(props);

            const quantityList: QuantityComplete[] = await PrismaInstance.quantity.findMany(data);

            return { quantityList };
        } catch (error) {
            console.error("QuantityService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find quantitys..." };
        }
    }

    /**
     * Compte les quantitys avec filtres
     */
    static async count(props: CountQuantityProps): Promise<CountQuantityResponse> {
        try {
            const data = countQuantitySchema.parse(props);

            const quantityAmount: QuantityCount = await PrismaInstance.quantity.count(data);

            return { quantityAmount };
        } catch (error) {
            console.error("QuantityService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Count -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count quantitys..." };
        }
    }
} 