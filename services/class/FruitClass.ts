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
import {
    Fruit,
    FruitCreateArgsSchema,
    FruitDeleteArgsSchema,
    FruitFindManyArgsSchema,
    FruitFindUniqueArgsSchema,
    FruitOrderByWithRelationInputSchema,
    FruitSchema,
    FruitUpdateArgsSchema,
    FruitUpsertArgsSchema,
    FruitWhereInputSchema,
    FruitWhereUniqueInputSchema
} from "@services/schemas";
import { FruitIncludeSchema } from "@services/schemas/inputTypeSchemas/FruitIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type FruitModel = z.infer<typeof FruitSchema>;

export type FruitRelations = z.infer<typeof FruitIncludeSchema>;

export type FruitComplete = z.infer<typeof FruitSchema> & z.infer<typeof FruitIncludeSchema>;

export type FruitCount = number;

// ============== Schema Types ============== //

const createFruitSchema: ZodType<Prisma.FruitCreateArgs> = FruitCreateArgsSchema;

const upsertFruitSchema: ZodType<Prisma.FruitUpsertArgs> = FruitUpsertArgsSchema;

const updateFruitSchema: ZodType<Prisma.FruitUpdateArgs> = FruitUpdateArgsSchema;

const deleteFruitSchema: ZodType<Prisma.FruitDeleteArgs> = FruitDeleteArgsSchema;

const selectFruitSchema: ZodType<Prisma.FruitFindUniqueArgs> = FruitFindUniqueArgsSchema;

const selectManyFruitSchema: ZodType<Prisma.FruitFindManyArgs> = FruitFindManyArgsSchema;

/**
 * Définition du schéma pour FruitCountArgs
 * 
 * Ce schéma correspond au type Prisma.FruitCountArgs qui est défini comme:
 * Omit<FruitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: FruitCountAggregateInputType | true
 * }
 */
const countFruitSchema: ZodType<Prisma.FruitCountArgs> = z.object({
    where: z.lazy(() => FruitWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => FruitOrderByWithRelationInputSchema),
        z.array(z.lazy(() => FruitOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => FruitWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateFruitProps = z.infer<typeof createFruitSchema>;

export type UpsertFruitProps = z.infer<typeof upsertFruitSchema>;

export type UpdateFruitProps = z.infer<typeof updateFruitSchema>;

export type DeleteFruitProps = z.infer<typeof deleteFruitSchema>;

export type FindUniqueFruitProps = z.infer<typeof selectFruitSchema>;

export type FindManyFruitProps = z.infer<typeof selectManyFruitSchema>;

export type CountFruitProps = z.infer<typeof countFruitSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateFruitResponse = ResponseFormat<"fruit", FruitModel>;

export type UpsertFruitResponse = ResponseFormat<"fruit", FruitModel>;

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
            const { data, include, omit, select } = createFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { fruit };
        } catch (error) {
            console.error("FruitService -> Create -> " + (error as Error).message);
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

    static async upsert(props: UpsertFruitProps): Promise<UpsertFruitResponse> {
        try {
            const { create, update, where, include, omit, select } = upsertFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { fruit };
        } catch (error) {
            console.error("FruitService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert fruit..." };
        }
    }

    /**
     * Met à jour un(e) fruit
     * @param props ID du/de la fruit et nouvelles données
     * @returns Fruit mis(e) à jour ou erreur
     */
    static async update(props: UpdateFruitProps): Promise<UpdateFruitResponse> {
        try {
            const { data, where, include, omit, select } = updateFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { fruit };
        } catch (error) {
            console.error("FruitService -> Update -> " + (error as Error).message);
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
            const { where, include, omit, select } = deleteFruitSchema.parse(props);

            const fruit: Fruit = await PrismaInstance.fruit.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { fruit };
        } catch (error) {
            console.error("FruitService -> Delete -> " + (error as Error).message);
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
            const { where, include, omit, select } = selectFruitSchema.parse(props);

            const fruit: FruitComplete | null = await PrismaInstance.fruit.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { fruit };
        } catch (error) {
            console.error("FruitService -> FindUnique -> " + (error as Error).message);
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
            const {
                cursor,
                distinct,
                include,
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyFruitSchema.parse(props);

            const fruitList: FruitComplete[] = await PrismaInstance.fruit.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                ...(include && { include }),
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { fruitList };
        } catch (error) {
            console.error("FruitService -> FindMany -> " + (error as Error).message);
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
            const { cursor, orderBy, select, skip = 0, take = 10, where } = countFruitSchema.parse(props);

            const fruitAmount: FruitCount = await PrismaInstance.fruit.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });
            return { fruitAmount };
        } catch (error) {
            console.error("FruitService -> Count -> " + (error as Error).message);
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