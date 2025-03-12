/**
 * Classe de service pour les opérations CRUD sur les contents
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les contents.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Content, ContentSchema } from "@services/schemas";
import {
    ContentCreateInputSchema,
    ContentUpdateInputSchema,
    ContentWhereInputSchema,
    ContentWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { ContentIncludeSchema } from "@services/schemas/inputTypeSchemas/ContentIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type ContentModel = z.infer<typeof ContentSchema>;

export type ContentRelations = z.infer<typeof ContentIncludeSchema>;

export type ContentComplete = z.infer<typeof ContentSchema> & z.infer<typeof ContentIncludeSchema>;

export type ContentCount = number;

// ============== Schema Types ============== //

const createContentSchema: ZodType<Prisma.ContentCreateArgs> = z.strictObject({
    data: ContentCreateInputSchema,
});

const updateContentSchema: ZodType<Prisma.ContentUpdateArgs> = z.strictObject({
    where: ContentWhereUniqueInputSchema,
    data: ContentUpdateInputSchema,
});

const deleteContentSchema: ZodType<Prisma.ContentDeleteArgs> = z.strictObject({
    where: ContentWhereUniqueInputSchema,
});

const selectContentSchema: ZodType<Prisma.ContentFindUniqueArgs> = z.strictObject({
    where: ContentWhereUniqueInputSchema,
});

const selectManyContentSchema: ZodType<Prisma.ContentFindManyArgs> = z.strictObject({
    where: ContentWhereInputSchema,
});

const countContentSchema: ZodType<Prisma.ContentCountArgs> = z.strictObject({
    where: ContentWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateContentProps = z.infer<typeof createContentSchema>;

export type UpdateContentProps = z.infer<typeof updateContentSchema>;

export type DeleteContentProps = z.infer<typeof deleteContentSchema>;

export type FindUniqueContentProps = z.infer<typeof selectContentSchema>;

export type FindManyContentProps = z.infer<typeof selectManyContentSchema>;

export type CountContentProps = z.infer<typeof countContentSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateContentResponse = ResponseFormat<"content", ContentModel>;

export type UpdateContentResponse = ResponseFormat<"content", ContentModel>;

export type DeleteContentResponse = ResponseFormat<"content", ContentModel>;

export type FindUniqueContentResponse = ResponseFormat<"content", ContentComplete | null>;

export type FindManyContentResponse = ResponseFormat<"contentList", ContentComplete[]>;

export type CountContentResponse = ResponseFormat<"contentAmount", ContentCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les contents
 */
export class ContentService {
    /**
     * Crée un(e) nouveau/nouvelle content
     * @param props Propriétés du/de la content
     * @returns Content créé(e) ou erreur
     */
    static async create(props: CreateContentProps): Promise<CreateContentResponse> {
        try {
            const data = createContentSchema.parse(props);

            const content: Content = await PrismaInstance.content.create(data);

            return { content };
        } catch (error) {
            console.error("ContentService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Create -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create content..." };
        }
    }

    /**
     * Met à jour un(e) content
     * @param props ID du/de la content et nouvelles données
     * @returns Content mis(e) à jour ou erreur
     */
    static async update(props: UpdateContentProps): Promise<UpdateContentResponse> {
        try {
            const data = updateContentSchema.parse(props);

            const content: Content = await PrismaInstance.content.update(data);

            return { content };
        } catch (error) {
            console.error("ContentService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Update -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update content..." };
        }
    }

    /**
     * Supprime un(e) content
     * @param props ID du/de la content
     * @returns Content supprimé(e) ou erreur
     */
    static async delete(props: DeleteContentProps): Promise<DeleteContentResponse> {
        try {
            const data = deleteContentSchema.parse(props);

            const content: Content = await PrismaInstance.content.delete(data);

            return { content };
        } catch (error) {
            console.error("ContentService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Delete -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete content..." };
        }
    }

    /**
     * Récupère un(e) content par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueContentProps): Promise<FindUniqueContentResponse> {
        try {
            const data = selectContentSchema.parse(props);

            const content: ContentComplete | null = await PrismaInstance.content.findUnique(data);

            return { content };
        } catch (error) {
            console.error("ContentService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("ContentService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find content..." };
        }
    }

    /**
     * Récupère une liste de contents avec filtres
     */
    static async findMany(props: FindManyContentProps): Promise<FindManyContentResponse> {
        try {
            const data = selectManyContentSchema.parse(props);

            const contentList: ContentComplete[] = await PrismaInstance.content.findMany(data);

            return { contentList };
        } catch (error) {
            console.error("ContentService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("ContentService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find contents..." };
        }
    }

    /**
     * Compte les contents avec filtres
     */
    static async count(props: CountContentProps): Promise<CountContentResponse> {
        try {
            const data = countContentSchema.parse(props);

            const contentAmount: ContentCount = await PrismaInstance.content.count(data);

            return { contentAmount };
        } catch (error) {
            console.error("ContentService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Count -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count contents..." };
        }
    }
} 