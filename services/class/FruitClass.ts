/**
 * Classe de service pour les opérations CRUD sur les fruits
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les fruits.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Fruit, FruitSchema } from "@services/schemas";
import {
    FruitCreateInputSchema,
    FruitUpdateInputSchema,
    FruitWhereInputSchema,
    FruitWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { FruitIncludeSchema } from "@services/schemas/inputTypeSchemas/FruitIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type FruitModel = z.infer<typeof FruitSchema>;

export type FruitRelations = z.infer<typeof FruitIncludeSchema>;

export type FruitComplete = z.infer<typeof FruitSchema> & z.infer<typeof FruitIncludeSchema>;

export type FruitCount = number;

// ============== Schema Types ============== //

const createFruitSchema: ZodType<Prisma.FruitCreateArgs> = z.strictObject({
    data: FruitCreateInputSchema,
});

const updateFruitSchema: ZodType<Prisma.FruitUpdateArgs> = z.strictObject({
    where: FruitWhereUniqueInputSchema,
    data: FruitUpdateInputSchema,
});

const deleteFruitSchema: ZodType<Prisma.FruitDeleteArgs> = z.strictObject({
    where: FruitWhereUniqueInputSchema,
});

const selectFruitSchema: ZodType<Prisma.FruitFindUniqueArgs> = z.strictObject({
    where: FruitWhereUniqueInputSchema,
});

const selectManyFruitSchema: ZodType<Prisma.FruitFindManyArgs> = z.strictObject({
    where: FruitWhereInputSchema,
});

const countFruitSchema: ZodType<Prisma.FruitCountArgs> = z.strictObject({
    where: FruitWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateFruitProps = z.infer<typeof createFruitSchema>;

export type UpdateFruitProps = z.infer<typeof updateFruitSchema>;

export type DeleteFruitProps = z.infer<typeof deleteFruitSchema>;

export type FindUniqueFruitProps = z.infer<typeof selectFruitSchema>;

export type FindManyFruitProps = z.infer<typeof selectManyFruitSchema>;

export type CountFruitProps = z.infer<typeof countFruitSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateFruitResponse = ResponseFormat<"fruit", FruitModel>;

export type UpdateFruitResponse = ResponseFormat<"fruit", FruitModel>;

export type DeleteFruitResponse = ResponseFormat<"fruit", FruitModel>;

export type FindUniqueFruitResponse = ResponseFormat<"fruit", FruitComplete | null>;

export type FindManyFruitResponse = ResponseFormat<"fruitList", FruitComplete[]>;

export type CountFruitResponse = ResponseFormat<"fruitAmount", FruitCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les fruits
 */
export class FruitService {
    /**
     * Crée un(e) nouveau/nouvelle fruit
     * @param props Propriétés du/de la fruit
     * @returns Fruit créé(e) ou erreur
     */
    static async create(props: CreateFruitProps): Promise<CreateFruitResponse> {
        try {
            const data = createFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.create(data);

            return { fruit };
        } catch (error) {
            console.error("FruitService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Create -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create fruit..." };
        }
    }

    /**
     * Met à jour un(e) fruit
     * @param props ID du/de la fruit et nouvelles données
     * @returns Fruit mis(e) à jour ou erreur
     */
    static async update(props: UpdateFruitProps): Promise<UpdateFruitResponse> {
        try {
            const data = updateFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.update(data);

            return { fruit };
        } catch (error) {
            console.error("FruitService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Update -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update fruit..." };
        }
    }

    /**
     * Supprime un(e) fruit
     * @param props ID du/de la fruit
     * @returns Fruit supprimé(e) ou erreur
     */
    static async delete(props: DeleteFruitProps): Promise<DeleteFruitResponse> {
        try {
            const data = deleteFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.delete(data);

            return { fruit };
        } catch (error) {
            console.error("FruitService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Delete -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete fruit..." };
        }
    }

    /**
     * Récupère un(e) fruit par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueFruitProps): Promise<FindUniqueFruitResponse> {
        try {
            const data = selectFruitSchema.parse(props);

            const fruit: FruitComplete | null = await PrismaInstance.fruit.findUnique(data);

            return { fruit };
        } catch (error) {
            console.error("FruitService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("FruitService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find fruit..." };
        }
    }

    /**
     * Récupère une liste de fruits avec filtres
     */
    static async findMany(props: FindManyFruitProps): Promise<FindManyFruitResponse> {
        try {
            const data = selectManyFruitSchema.parse(props);

            const fruitList: FruitComplete[] = await PrismaInstance.fruit.findMany(data);

            return { fruitList };
        } catch (error) {
            console.error("FruitService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("FruitService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find fruits..." };
        }
    }

    /**
     * Compte les fruits avec filtres
     */
    static async count(props: CountFruitProps): Promise<CountFruitResponse> {
        try {
            const data = countFruitSchema.parse(props);

            const fruitAmount: FruitCount = await PrismaInstance.fruit.count(data);

            return { fruitAmount };
        } catch (error) {
            console.error("FruitService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Count -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count fruits..." };
        }
    }
} 