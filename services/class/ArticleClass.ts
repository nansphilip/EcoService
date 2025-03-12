/**
 * Classe de service pour les opérations CRUD sur les articles
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les articles.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Article, ArticleSchema } from "@services/schemas";
import {
    ArticleCreateInputSchema,
    ArticleUpdateInputSchema,
    ArticleWhereInputSchema,
    ArticleWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { ArticleIncludeSchema } from "@services/schemas/inputTypeSchemas/ArticleIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type ArticleModel = z.infer<typeof ArticleSchema>;

export type ArticleRelations = z.infer<typeof ArticleIncludeSchema>;

export type ArticleComplete = z.infer<typeof ArticleSchema> & z.infer<typeof ArticleIncludeSchema>;

export type ArticleCount = number;

// ============== Schema Types ============== //

const createArticleSchema: ZodType<Prisma.ArticleCreateArgs> = z.strictObject({
    data: ArticleCreateInputSchema,
});

const updateArticleSchema: ZodType<Prisma.ArticleUpdateArgs> = z.strictObject({
    where: ArticleWhereUniqueInputSchema,
    data: ArticleUpdateInputSchema,
});

const deleteArticleSchema: ZodType<Prisma.ArticleDeleteArgs> = z.strictObject({
    where: ArticleWhereUniqueInputSchema,
});

const selectArticleSchema: ZodType<Prisma.ArticleFindUniqueArgs> = z.strictObject({
    where: ArticleWhereUniqueInputSchema,
});

const selectManyArticleSchema: ZodType<Prisma.ArticleFindManyArgs> = z.strictObject({
    where: ArticleWhereInputSchema,
});

const countArticleSchema: ZodType<Prisma.ArticleCountArgs> = z.strictObject({
    where: ArticleWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateArticleProps = z.infer<typeof createArticleSchema>;

export type UpdateArticleProps = z.infer<typeof updateArticleSchema>;

export type DeleteArticleProps = z.infer<typeof deleteArticleSchema>;

export type FindUniqueArticleProps = z.infer<typeof selectArticleSchema>;

export type FindManyArticleProps = z.infer<typeof selectManyArticleSchema>;

export type CountArticleProps = z.infer<typeof countArticleSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateArticleResponse = ResponseFormat<"article", ArticleModel>;

export type UpdateArticleResponse = ResponseFormat<"article", ArticleModel>;

export type DeleteArticleResponse = ResponseFormat<"article", ArticleModel>;

export type FindUniqueArticleResponse = ResponseFormat<"article", ArticleComplete | null>;

export type FindManyArticleResponse = ResponseFormat<"articleList", ArticleComplete[]>;

export type CountArticleResponse = ResponseFormat<"articleAmount", ArticleCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les articles
 */
export class ArticleService {
    /**
     * Crée un(e) nouveau/nouvelle article
     * @param props Propriétés du/de la article
     * @returns Article créé(e) ou erreur
     */
    static async create(props: CreateArticleProps): Promise<CreateArticleResponse> {
        try {
            const data = createArticleSchema.parse(props);

            const article: Article = await PrismaInstance.article.create(data);

            return { article };
        } catch (error) {
            console.error("ArticleService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> Create -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create article..." };
        }
    }

    /**
     * Met à jour un(e) article
     * @param props ID du/de la article et nouvelles données
     * @returns Article mis(e) à jour ou erreur
     */
    static async update(props: UpdateArticleProps): Promise<UpdateArticleResponse> {
        try {
            const data = updateArticleSchema.parse(props);

            const article: Article = await PrismaInstance.article.update(data);

            return { article };
        } catch (error) {
            console.error("ArticleService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> Update -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update article..." };
        }
    }

    /**
     * Supprime un(e) article
     * @param props ID du/de la article
     * @returns Article supprimé(e) ou erreur
     */
    static async delete(props: DeleteArticleProps): Promise<DeleteArticleResponse> {
        try {
            const data = deleteArticleSchema.parse(props);

            const article: Article = await PrismaInstance.article.delete(data);

            return { article };
        } catch (error) {
            console.error("ArticleService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> Delete -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete article..." };
        }
    }

    /**
     * Récupère un(e) article par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueArticleProps): Promise<FindUniqueArticleResponse> {
        try {
            const data = selectArticleSchema.parse(props);

            const article: ArticleComplete | null = await PrismaInstance.article.findUnique(data);

            return { article };
        } catch (error) {
            console.error("ArticleService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find article..." };
        }
    }

    /**
     * Récupère une liste de articles avec filtres
     */
    static async findMany(props: FindManyArticleProps): Promise<FindManyArticleResponse> {
        try {
            const data = selectManyArticleSchema.parse(props);

            const articleList: ArticleComplete[] = await PrismaInstance.article.findMany(data);

            return { articleList };
        } catch (error) {
            console.error("ArticleService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find articles..." };
        }
    }

    /**
     * Compte les articles avec filtres
     */
    static async count(props: CountArticleProps): Promise<CountArticleResponse> {
        try {
            const data = countArticleSchema.parse(props);

            const articleAmount: ArticleCount = await PrismaInstance.article.count(data);

            return { articleAmount };
        } catch (error) {
            console.error("ArticleService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ArticleService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ArticleService -> Count -> Prisma error -> " + error.message);
                throw new Error("ArticleService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count articles..." };
        }
    }
} 