/**
 * Classe de service pour les opérations CRUD sur les accounts
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les accounts.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Account, AccountSchema } from "@services/schemas";
import {
    AccountCreateInputSchema,
    AccountUpdateInputSchema,
    AccountWhereInputSchema,
    AccountWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { AccountIncludeSchema } from "@services/schemas/inputTypeSchemas/AccountIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type AccountModel = z.infer<typeof AccountSchema>;

export type AccountRelations = z.infer<typeof AccountIncludeSchema>;

export type AccountComplete = z.infer<typeof AccountSchema> & z.infer<typeof AccountIncludeSchema>;

export type AccountCount = number;

// ============== Schema Types ============== //

const createAccountSchema: ZodType<Prisma.AccountCreateArgs> = z.strictObject({
    data: AccountCreateInputSchema,
});

const updateAccountSchema: ZodType<Prisma.AccountUpdateArgs> = z.strictObject({
    where: AccountWhereUniqueInputSchema,
    data: AccountUpdateInputSchema,
});

const deleteAccountSchema: ZodType<Prisma.AccountDeleteArgs> = z.strictObject({
    where: AccountWhereUniqueInputSchema,
});

const selectAccountSchema: ZodType<Prisma.AccountFindUniqueArgs> = z.strictObject({
    where: AccountWhereUniqueInputSchema,
});

const selectManyAccountSchema: ZodType<Prisma.AccountFindManyArgs> = z.strictObject({
    where: AccountWhereInputSchema,
});

const countAccountSchema: ZodType<Prisma.AccountCountArgs> = z.strictObject({
    where: AccountWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateAccountProps = z.infer<typeof createAccountSchema>;

export type UpdateAccountProps = z.infer<typeof updateAccountSchema>;

export type DeleteAccountProps = z.infer<typeof deleteAccountSchema>;

export type FindUniqueAccountProps = z.infer<typeof selectAccountSchema>;

export type FindManyAccountProps = z.infer<typeof selectManyAccountSchema>;

export type CountAccountProps = z.infer<typeof countAccountSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateAccountResponse = ResponseFormat<"account", AccountModel>;

export type UpdateAccountResponse = ResponseFormat<"account", AccountModel>;

export type DeleteAccountResponse = ResponseFormat<"account", AccountModel>;

export type FindUniqueAccountResponse = ResponseFormat<"account", AccountComplete | null>;

export type FindManyAccountResponse = ResponseFormat<"accountList", AccountComplete[]>;

export type CountAccountResponse = ResponseFormat<"accountAmount", AccountCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les accounts
 */
export class AccountService {
    /**
     * Crée un(e) nouveau/nouvelle account
     * @param props Propriétés du/de la account
     * @returns Account créé(e) ou erreur
     */
    static async create(props: CreateAccountProps): Promise<CreateAccountResponse> {
        try {
            const data = createAccountSchema.parse(props);

            const account: Account = await PrismaInstance.account.create(data);

            return { account };
        } catch (error) {
            console.error("AccountService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Create -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create account..." };
        }
    }

    /**
     * Met à jour un(e) account
     * @param props ID du/de la account et nouvelles données
     * @returns Account mis(e) à jour ou erreur
     */
    static async update(props: UpdateAccountProps): Promise<UpdateAccountResponse> {
        try {
            const data = updateAccountSchema.parse(props);

            const account: Account = await PrismaInstance.account.update(data);

            return { account };
        } catch (error) {
            console.error("AccountService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Update -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update account..." };
        }
    }

    /**
     * Supprime un(e) account
     * @param props ID du/de la account
     * @returns Account supprimé(e) ou erreur
     */
    static async delete(props: DeleteAccountProps): Promise<DeleteAccountResponse> {
        try {
            const data = deleteAccountSchema.parse(props);

            const account: Account = await PrismaInstance.account.delete(data);

            return { account };
        } catch (error) {
            console.error("AccountService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Delete -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete account..." };
        }
    }

    /**
     * Récupère un(e) account par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueAccountProps): Promise<FindUniqueAccountResponse> {
        try {
            const data = selectAccountSchema.parse(props);

            const account: AccountComplete | null = await PrismaInstance.account.findUnique(data);

            return { account };
        } catch (error) {
            console.error("AccountService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("AccountService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find account..." };
        }
    }

    /**
     * Récupère une liste de accounts avec filtres
     */
    static async findMany(props: FindManyAccountProps): Promise<FindManyAccountResponse> {
        try {
            const data = selectManyAccountSchema.parse(props);

            const accountList: AccountComplete[] = await PrismaInstance.account.findMany(data);

            return { accountList };
        } catch (error) {
            console.error("AccountService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("AccountService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find accounts..." };
        }
    }

    /**
     * Compte les accounts avec filtres
     */
    static async count(props: CountAccountProps): Promise<CountAccountResponse> {
        try {
            const data = countAccountSchema.parse(props);

            const accountAmount: AccountCount = await PrismaInstance.account.count(data);

            return { accountAmount };
        } catch (error) {
            console.error("AccountService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AccountService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AccountService -> Count -> Prisma error -> " + error.message);
                throw new Error("AccountService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count accounts..." };
        }
    }
} 