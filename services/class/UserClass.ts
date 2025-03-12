/**
 * Classe de service pour les opérations CRUD sur les users
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les users.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User, UserSchema } from "@services/schemas";
import {
    UserCreateInputSchema,
    UserUpdateInputSchema,
    UserWhereInputSchema,
    UserWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { UserIncludeSchema } from "@services/schemas/inputTypeSchemas/UserIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type UserModel = z.infer<typeof UserSchema>;

export type UserRelations = z.infer<typeof UserIncludeSchema>;

export type UserComplete = z.infer<typeof UserSchema> & z.infer<typeof UserIncludeSchema>;

export type UserCount = number;

// ============== Schema Types ============== //

const createUserSchema: ZodType<Prisma.UserCreateArgs> = z.strictObject({
    data: UserCreateInputSchema,
});

const updateUserSchema: ZodType<Prisma.UserUpdateArgs> = z.strictObject({
    where: UserWhereUniqueInputSchema,
    data: UserUpdateInputSchema,
});

const deleteUserSchema: ZodType<Prisma.UserDeleteArgs> = z.strictObject({
    where: UserWhereUniqueInputSchema,
});

const selectUserSchema: ZodType<Prisma.UserFindUniqueArgs> = z.strictObject({
    where: UserWhereUniqueInputSchema,
});

const selectManyUserSchema: ZodType<Prisma.UserFindManyArgs> = z.strictObject({
    where: UserWhereInputSchema,
});

const countUserSchema: ZodType<Prisma.UserCountArgs> = z.strictObject({
    where: UserWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateUserProps = z.infer<typeof createUserSchema>;

export type UpdateUserProps = z.infer<typeof updateUserSchema>;

export type DeleteUserProps = z.infer<typeof deleteUserSchema>;

export type FindUniqueUserProps = z.infer<typeof selectUserSchema>;

export type FindManyUserProps = z.infer<typeof selectManyUserSchema>;

export type CountUserProps = z.infer<typeof countUserSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateUserResponse = ResponseFormat<"user", UserModel>;

export type UpdateUserResponse = ResponseFormat<"user", UserModel>;

export type DeleteUserResponse = ResponseFormat<"user", UserModel>;

export type FindUniqueUserResponse = ResponseFormat<"user", UserComplete | null>;

export type FindManyUserResponse = ResponseFormat<"userList", UserComplete[]>;

export type CountUserResponse = ResponseFormat<"userAmount", UserCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les users
 */
export class UserService {
    /**
     * Crée un(e) nouveau/nouvelle user
     * @param props Propriétés du/de la user
     * @returns User créé(e) ou erreur
     */
    static async create(props: CreateUserProps): Promise<CreateUserResponse> {
        try {
            const data = createUserSchema.parse(props);

            const user: User = await PrismaInstance.user.create(data);

            return { user };
        } catch (error) {
            console.error("UserService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Create -> Prisma error -> " + error.message);
                throw new Error("UserService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create user..." };
        }
    }

    /**
     * Met à jour un(e) user
     * @param props ID du/de la user et nouvelles données
     * @returns User mis(e) à jour ou erreur
     */
    static async update(props: UpdateUserProps): Promise<UpdateUserResponse> {
        try {
            const data = updateUserSchema.parse(props);

            const user: User = await PrismaInstance.user.update(data);

            return { user };
        } catch (error) {
            console.error("UserService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Update -> Prisma error -> " + error.message);
                throw new Error("UserService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update user..." };
        }
    }

    /**
     * Supprime un(e) user
     * @param props ID du/de la user
     * @returns User supprimé(e) ou erreur
     */
    static async delete(props: DeleteUserProps): Promise<DeleteUserResponse> {
        try {
            const data = deleteUserSchema.parse(props);

            const user: User = await PrismaInstance.user.delete(data);

            return { user };
        } catch (error) {
            console.error("UserService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Delete -> Prisma error -> " + error.message);
                throw new Error("UserService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete user..." };
        }
    }

    /**
     * Récupère un(e) user par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueUserProps): Promise<FindUniqueUserResponse> {
        try {
            const data = selectUserSchema.parse(props);

            const user: UserComplete | null = await PrismaInstance.user.findUnique(data);

            return { user };
        } catch (error) {
            console.error("UserService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("UserService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find user..." };
        }
    }

    /**
     * Récupère une liste de users avec filtres
     */
    static async findMany(props: FindManyUserProps): Promise<FindManyUserResponse> {
        try {
            const data = selectManyUserSchema.parse(props);

            const userList: UserComplete[] = await PrismaInstance.user.findMany(data);

            return { userList };
        } catch (error) {
            console.error("UserService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("UserService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find users..." };
        }
    }

    /**
     * Compte les users avec filtres
     */
    static async count(props: CountUserProps): Promise<CountUserResponse> {
        try {
            const data = countUserSchema.parse(props);

            const userAmount: UserCount = await PrismaInstance.user.count(data);

            return { userAmount };
        } catch (error) {
            console.error("UserService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Count -> Prisma error -> " + error.message);
                throw new Error("UserService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count users..." };
        }
    }
} 