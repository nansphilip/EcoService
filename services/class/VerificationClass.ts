/**
 * Classe de service pour les opérations CRUD sur les verifications
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les verifications.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Verification, VerificationSchema } from "@services/schemas";
import {
    VerificationCreateInputSchema,
    VerificationUpdateInputSchema,
    VerificationWhereInputSchema,
    VerificationWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { VerificationIncludeSchema } from "@services/schemas/inputTypeSchemas/VerificationIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type VerificationModel = z.infer<typeof VerificationSchema>;

export type VerificationRelations = z.infer<typeof VerificationIncludeSchema>;

export type VerificationComplete = z.infer<typeof VerificationSchema> & z.infer<typeof VerificationIncludeSchema>;

export type VerificationCount = number;

// ============== Schema Types ============== //

const createVerificationSchema: ZodType<Prisma.VerificationCreateArgs> = z.strictObject({
    data: VerificationCreateInputSchema,
});

const updateVerificationSchema: ZodType<Prisma.VerificationUpdateArgs> = z.strictObject({
    where: VerificationWhereUniqueInputSchema,
    data: VerificationUpdateInputSchema,
});

const deleteVerificationSchema: ZodType<Prisma.VerificationDeleteArgs> = z.strictObject({
    where: VerificationWhereUniqueInputSchema,
});

const selectVerificationSchema: ZodType<Prisma.VerificationFindUniqueArgs> = z.strictObject({
    where: VerificationWhereUniqueInputSchema,
});

const selectManyVerificationSchema: ZodType<Prisma.VerificationFindManyArgs> = z.strictObject({
    where: VerificationWhereInputSchema,
});

const countVerificationSchema: ZodType<Prisma.VerificationCountArgs> = z.strictObject({
    where: VerificationWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateVerificationProps = z.infer<typeof createVerificationSchema>;

export type UpdateVerificationProps = z.infer<typeof updateVerificationSchema>;

export type DeleteVerificationProps = z.infer<typeof deleteVerificationSchema>;

export type FindUniqueVerificationProps = z.infer<typeof selectVerificationSchema>;

export type FindManyVerificationProps = z.infer<typeof selectManyVerificationSchema>;

export type CountVerificationProps = z.infer<typeof countVerificationSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateVerificationResponse = ResponseFormat<"verification", VerificationModel>;

export type UpdateVerificationResponse = ResponseFormat<"verification", VerificationModel>;

export type DeleteVerificationResponse = ResponseFormat<"verification", VerificationModel>;

export type FindUniqueVerificationResponse = ResponseFormat<"verification", VerificationComplete | null>;

export type FindManyVerificationResponse = ResponseFormat<"verificationList", VerificationComplete[]>;

export type CountVerificationResponse = ResponseFormat<"verificationAmount", VerificationCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les verifications
 */
export class VerificationService {
    /**
     * Crée un(e) nouveau/nouvelle verification
     * @param props Propriétés du/de la verification
     * @returns Verification créé(e) ou erreur
     */
    static async create(props: CreateVerificationProps): Promise<CreateVerificationResponse> {
        try {
            const data = createVerificationSchema.parse(props);

            const verification: Verification = await PrismaInstance.verification.create(data);

            return { verification };
        } catch (error) {
            console.error("VerificationService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Create -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create verification..." };
        }
    }

    /**
     * Met à jour un(e) verification
     * @param props ID du/de la verification et nouvelles données
     * @returns Verification mis(e) à jour ou erreur
     */
    static async update(props: UpdateVerificationProps): Promise<UpdateVerificationResponse> {
        try {
            const data = updateVerificationSchema.parse(props);

            const verification: Verification = await PrismaInstance.verification.update(data);

            return { verification };
        } catch (error) {
            console.error("VerificationService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Update -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update verification..." };
        }
    }

    /**
     * Supprime un(e) verification
     * @param props ID du/de la verification
     * @returns Verification supprimé(e) ou erreur
     */
    static async delete(props: DeleteVerificationProps): Promise<DeleteVerificationResponse> {
        try {
            const data = deleteVerificationSchema.parse(props);

            const verification: Verification = await PrismaInstance.verification.delete(data);

            return { verification };
        } catch (error) {
            console.error("VerificationService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Delete -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete verification..." };
        }
    }

    /**
     * Récupère un(e) verification par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueVerificationProps): Promise<FindUniqueVerificationResponse> {
        try {
            const data = selectVerificationSchema.parse(props);

            const verification: VerificationComplete | null = await PrismaInstance.verification.findUnique(data);

            return { verification };
        } catch (error) {
            console.error("VerificationService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find verification..." };
        }
    }

    /**
     * Récupère une liste de verifications avec filtres
     */
    static async findMany(props: FindManyVerificationProps): Promise<FindManyVerificationResponse> {
        try {
            const data = selectManyVerificationSchema.parse(props);

            const verificationList: VerificationComplete[] = await PrismaInstance.verification.findMany(data);

            return { verificationList };
        } catch (error) {
            console.error("VerificationService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find verifications..." };
        }
    }

    /**
     * Compte les verifications avec filtres
     */
    static async count(props: CountVerificationProps): Promise<CountVerificationResponse> {
        try {
            const data = countVerificationSchema.parse(props);

            const verificationAmount: VerificationCount = await PrismaInstance.verification.count(data);

            return { verificationAmount };
        } catch (error) {
            console.error("VerificationService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Count -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count verifications..." };
        }
    }
} 