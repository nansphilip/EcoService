/**
 * Classe de service pour les opérations CRUD sur les addresss
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les addresss.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Address, AddressSchema } from "@services/schemas";
import {
    AddressCreateInputSchema,
    AddressUpdateInputSchema,
    AddressWhereInputSchema,
    AddressWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { AddressIncludeSchema } from "@services/schemas/inputTypeSchemas/AddressIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type AddressModel = z.infer<typeof AddressSchema>;

export type AddressRelations = z.infer<typeof AddressIncludeSchema>;

export type AddressComplete = z.infer<typeof AddressSchema> & z.infer<typeof AddressIncludeSchema>;

export type AddressCount = number;

// ============== Schema Types ============== //

const createAddressSchema: ZodType<Prisma.AddressCreateArgs> = z.strictObject({
    data: AddressCreateInputSchema,
});

const updateAddressSchema: ZodType<Prisma.AddressUpdateArgs> = z.strictObject({
    where: AddressWhereUniqueInputSchema,
    data: AddressUpdateInputSchema,
});

const deleteAddressSchema: ZodType<Prisma.AddressDeleteArgs> = z.strictObject({
    where: AddressWhereUniqueInputSchema,
});

const selectAddressSchema: ZodType<Prisma.AddressFindUniqueArgs> = z.strictObject({
    where: AddressWhereUniqueInputSchema,
});

const selectManyAddressSchema: ZodType<Prisma.AddressFindManyArgs> = z.strictObject({
    where: AddressWhereInputSchema,
});

const countAddressSchema: ZodType<Prisma.AddressCountArgs> = z.strictObject({
    where: AddressWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateAddressProps = z.infer<typeof createAddressSchema>;

export type UpdateAddressProps = z.infer<typeof updateAddressSchema>;

export type DeleteAddressProps = z.infer<typeof deleteAddressSchema>;

export type FindUniqueAddressProps = z.infer<typeof selectAddressSchema>;

export type FindManyAddressProps = z.infer<typeof selectManyAddressSchema>;

export type CountAddressProps = z.infer<typeof countAddressSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateAddressResponse = ResponseFormat<"address", AddressModel>;

export type UpdateAddressResponse = ResponseFormat<"address", AddressModel>;

export type DeleteAddressResponse = ResponseFormat<"address", AddressModel>;

export type FindUniqueAddressResponse = ResponseFormat<"address", AddressComplete | null>;

export type FindManyAddressResponse = ResponseFormat<"addressList", AddressComplete[]>;

export type CountAddressResponse = ResponseFormat<"addressAmount", AddressCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les addresss
 */
export class AddressService {
    /**
     * Crée un(e) nouveau/nouvelle address
     * @param props Propriétés du/de la address
     * @returns Address créé(e) ou erreur
     */
    static async create(props: CreateAddressProps): Promise<CreateAddressResponse> {
        try {
            const data = createAddressSchema.parse(props);

            const address: Address = await PrismaInstance.address.create(data);

            return { address };
        } catch (error) {
            console.error("AddressService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Create -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create address..." };
        }
    }

    /**
     * Met à jour un(e) address
     * @param props ID du/de la address et nouvelles données
     * @returns Address mis(e) à jour ou erreur
     */
    static async update(props: UpdateAddressProps): Promise<UpdateAddressResponse> {
        try {
            const data = updateAddressSchema.parse(props);

            const address: Address = await PrismaInstance.address.update(data);

            return { address };
        } catch (error) {
            console.error("AddressService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Update -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update address..." };
        }
    }

    /**
     * Supprime un(e) address
     * @param props ID du/de la address
     * @returns Address supprimé(e) ou erreur
     */
    static async delete(props: DeleteAddressProps): Promise<DeleteAddressResponse> {
        try {
            const data = deleteAddressSchema.parse(props);

            const address: Address = await PrismaInstance.address.delete(data);

            return { address };
        } catch (error) {
            console.error("AddressService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Delete -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete address..." };
        }
    }

    /**
     * Récupère un(e) address par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueAddressProps): Promise<FindUniqueAddressResponse> {
        try {
            const data = selectAddressSchema.parse(props);

            const address: AddressComplete | null = await PrismaInstance.address.findUnique(data);

            return { address };
        } catch (error) {
            console.error("AddressService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("AddressService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find address..." };
        }
    }

    /**
     * Récupère une liste de addresss avec filtres
     */
    static async findMany(props: FindManyAddressProps): Promise<FindManyAddressResponse> {
        try {
            const data = selectManyAddressSchema.parse(props);

            const addressList: AddressComplete[] = await PrismaInstance.address.findMany(data);

            return { addressList };
        } catch (error) {
            console.error("AddressService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("AddressService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find addresss..." };
        }
    }

    /**
     * Compte les addresss avec filtres
     */
    static async count(props: CountAddressProps): Promise<CountAddressResponse> {
        try {
            const data = countAddressSchema.parse(props);

            const addressAmount: AddressCount = await PrismaInstance.address.count(data);

            return { addressAmount };
        } catch (error) {
            console.error("AddressService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("AddressService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("AddressService -> Count -> Prisma error -> " + error.message);
                throw new Error("AddressService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count addresss..." };
        }
    }
} 