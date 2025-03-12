/**
 * Classe de service pour les opérations CRUD sur les categorys
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les categorys.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Category, CategorySchema } from "@services/schemas";
import {
    CategoryCreateInputSchema,
    CategoryUpdateInputSchema,
    CategoryWhereInputSchema,
    CategoryWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { CategoryIncludeSchema } from "@services/schemas/inputTypeSchemas/CategoryIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type CategoryModel = z.infer<typeof CategorySchema>;

export type CategoryRelations = z.infer<typeof CategoryIncludeSchema>;

export type CategoryComplete = z.infer<typeof CategorySchema> & z.infer<typeof CategoryIncludeSchema>;

export type CategoryCount = number;

// ============== Schema Types ============== //

const createCategorySchema: ZodType<Prisma.CategoryCreateArgs> = z.strictObject({
    data: CategoryCreateInputSchema,
});

const updateCategorySchema: ZodType<Prisma.CategoryUpdateArgs> = z.strictObject({
    where: CategoryWhereUniqueInputSchema,
    data: CategoryUpdateInputSchema,
});

const deleteCategorySchema: ZodType<Prisma.CategoryDeleteArgs> = z.strictObject({
    where: CategoryWhereUniqueInputSchema,
});

const selectCategorySchema: ZodType<Prisma.CategoryFindUniqueArgs> = z.strictObject({
    where: CategoryWhereUniqueInputSchema,
});

const selectManyCategorySchema: ZodType<Prisma.CategoryFindManyArgs> = z.strictObject({
    where: CategoryWhereInputSchema,
});

const countCategorySchema: ZodType<Prisma.CategoryCountArgs> = z.strictObject({
    where: CategoryWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateCategoryProps = z.infer<typeof createCategorySchema>;

export type UpdateCategoryProps = z.infer<typeof updateCategorySchema>;

export type DeleteCategoryProps = z.infer<typeof deleteCategorySchema>;

export type FindUniqueCategoryProps = z.infer<typeof selectCategorySchema>;

export type FindManyCategoryProps = z.infer<typeof selectManyCategorySchema>;

export type CountCategoryProps = z.infer<typeof countCategorySchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateCategoryResponse = ResponseFormat<"category", CategoryModel>;

export type UpdateCategoryResponse = ResponseFormat<"category", CategoryModel>;

export type DeleteCategoryResponse = ResponseFormat<"category", CategoryModel>;

export type FindUniqueCategoryResponse = ResponseFormat<"category", CategoryComplete | null>;

export type FindManyCategoryResponse = ResponseFormat<"categoryList", CategoryComplete[]>;

export type CountCategoryResponse = ResponseFormat<"categoryAmount", CategoryCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les categorys
 */
export class CategoryService {
    /**
     * Crée un(e) nouveau/nouvelle category
     * @param props Propriétés du/de la category
     * @returns Category créé(e) ou erreur
     */
    static async create(props: CreateCategoryProps): Promise<CreateCategoryResponse> {
        try {
            const data = createCategorySchema.parse(props);

            const category: Category = await PrismaInstance.category.create(data);

            return { category };
        } catch (error) {
            console.error("CategoryService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Create -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create category..." };
        }
    }

    /**
     * Met à jour un(e) category
     * @param props ID du/de la category et nouvelles données
     * @returns Category mis(e) à jour ou erreur
     */
    static async update(props: UpdateCategoryProps): Promise<UpdateCategoryResponse> {
        try {
            const data = updateCategorySchema.parse(props);

            const category: Category = await PrismaInstance.category.update(data);

            return { category };
        } catch (error) {
            console.error("CategoryService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Update -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update category..." };
        }
    }

    /**
     * Supprime un(e) category
     * @param props ID du/de la category
     * @returns Category supprimé(e) ou erreur
     */
    static async delete(props: DeleteCategoryProps): Promise<DeleteCategoryResponse> {
        try {
            const data = deleteCategorySchema.parse(props);

            const category: Category = await PrismaInstance.category.delete(data);

            return { category };
        } catch (error) {
            console.error("CategoryService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Delete -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete category..." };
        }
    }

    /**
     * Récupère un(e) category par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueCategoryProps): Promise<FindUniqueCategoryResponse> {
        try {
            const data = selectCategorySchema.parse(props);

            const category: CategoryComplete | null = await PrismaInstance.category.findUnique(data);

            return { category };
        } catch (error) {
            console.error("CategoryService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find category..." };
        }
    }

    /**
     * Récupère une liste de categorys avec filtres
     */
    static async findMany(props: FindManyCategoryProps): Promise<FindManyCategoryResponse> {
        try {
            const data = selectManyCategorySchema.parse(props);

            const categoryList: CategoryComplete[] = await PrismaInstance.category.findMany(data);

            return { categoryList };
        } catch (error) {
            console.error("CategoryService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find categorys..." };
        }
    }

    /**
     * Compte les categorys avec filtres
     */
    static async count(props: CountCategoryProps): Promise<CountCategoryResponse> {
        try {
            const data = countCategorySchema.parse(props);

            const categoryAmount: CategoryCount = await PrismaInstance.category.count(data);

            return { categoryAmount };
        } catch (error) {
            console.error("CategoryService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Count -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count categorys..." };
        }
    }
} 