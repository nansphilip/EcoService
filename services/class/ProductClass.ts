/**
 * Classe de service pour les opérations CRUD sur les products
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les products.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Product, ProductSchema } from "@services/schemas";
import {
    ProductCreateInputSchema,
    ProductUpdateInputSchema,
    ProductWhereInputSchema,
    ProductWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { ProductIncludeSchema } from "@services/schemas/inputTypeSchemas/ProductIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type ProductModel = z.infer<typeof ProductSchema>;

export type ProductRelations = z.infer<typeof ProductIncludeSchema>;

export type ProductComplete = z.infer<typeof ProductSchema> & z.infer<typeof ProductIncludeSchema>;

export type ProductCount = number;

// ============== Schema Types ============== //

const createProductSchema: ZodType<Prisma.ProductCreateArgs> = z.strictObject({
    data: ProductCreateInputSchema,
});

const updateProductSchema: ZodType<Prisma.ProductUpdateArgs> = z.strictObject({
    where: ProductWhereUniqueInputSchema,
    data: ProductUpdateInputSchema,
});

const deleteProductSchema: ZodType<Prisma.ProductDeleteArgs> = z.strictObject({
    where: ProductWhereUniqueInputSchema,
});

const selectProductSchema: ZodType<Prisma.ProductFindUniqueArgs> = z.strictObject({
    where: ProductWhereUniqueInputSchema,
});

const selectManyProductSchema: ZodType<Prisma.ProductFindManyArgs> = z.strictObject({
    where: ProductWhereInputSchema,
});

const countProductSchema: ZodType<Prisma.ProductCountArgs> = z.strictObject({
    where: ProductWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateProductProps = z.infer<typeof createProductSchema>;

export type UpdateProductProps = z.infer<typeof updateProductSchema>;

export type DeleteProductProps = z.infer<typeof deleteProductSchema>;

export type FindUniqueProductProps = z.infer<typeof selectProductSchema>;

export type FindManyProductProps = z.infer<typeof selectManyProductSchema>;

export type CountProductProps = z.infer<typeof countProductSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateProductResponse = ResponseFormat<"product", ProductModel>;

export type UpdateProductResponse = ResponseFormat<"product", ProductModel>;

export type DeleteProductResponse = ResponseFormat<"product", ProductModel>;

export type FindUniqueProductResponse = ResponseFormat<"product", ProductComplete | null>;

export type FindManyProductResponse = ResponseFormat<"productList", ProductComplete[]>;

export type CountProductResponse = ResponseFormat<"productAmount", ProductCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les products
 */
export class ProductService {
    /**
     * Crée un(e) nouveau/nouvelle product
     * @param props Propriétés du/de la product
     * @returns Product créé(e) ou erreur
     */
    static async create(props: CreateProductProps): Promise<CreateProductResponse> {
        try {
            const data = createProductSchema.parse(props);

            const product: Product = await PrismaInstance.product.create(data);

            return { product };
        } catch (error) {
            console.error("ProductService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> Create -> Prisma error -> " + error.message);
                throw new Error("ProductService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create product..." };
        }
    }

    /**
     * Met à jour un(e) product
     * @param props ID du/de la product et nouvelles données
     * @returns Product mis(e) à jour ou erreur
     */
    static async update(props: UpdateProductProps): Promise<UpdateProductResponse> {
        try {
            const data = updateProductSchema.parse(props);

            const product: Product = await PrismaInstance.product.update(data);

            return { product };
        } catch (error) {
            console.error("ProductService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> Update -> Prisma error -> " + error.message);
                throw new Error("ProductService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update product..." };
        }
    }

    /**
     * Supprime un(e) product
     * @param props ID du/de la product
     * @returns Product supprimé(e) ou erreur
     */
    static async delete(props: DeleteProductProps): Promise<DeleteProductResponse> {
        try {
            const data = deleteProductSchema.parse(props);

            const product: Product = await PrismaInstance.product.delete(data);

            return { product };
        } catch (error) {
            console.error("ProductService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> Delete -> Prisma error -> " + error.message);
                throw new Error("ProductService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete product..." };
        }
    }

    /**
     * Récupère un(e) product par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueProductProps): Promise<FindUniqueProductResponse> {
        try {
            const data = selectProductSchema.parse(props);

            const product: ProductComplete | null = await PrismaInstance.product.findUnique(data);

            return { product };
        } catch (error) {
            console.error("ProductService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("ProductService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find product..." };
        }
    }

    /**
     * Récupère une liste de products avec filtres
     */
    static async findMany(props: FindManyProductProps): Promise<FindManyProductResponse> {
        try {
            const data = selectManyProductSchema.parse(props);

            const productList: ProductComplete[] = await PrismaInstance.product.findMany(data);

            return { productList };
        } catch (error) {
            console.error("ProductService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("ProductService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find products..." };
        }
    }

    /**
     * Compte les products avec filtres
     */
    static async count(props: CountProductProps): Promise<CountProductResponse> {
        try {
            const data = countProductSchema.parse(props);

            const productAmount: ProductCount = await PrismaInstance.product.count(data);

            return { productAmount };
        } catch (error) {
            console.error("ProductService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> Count -> Prisma error -> " + error.message);
                throw new Error("ProductService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count products..." };
        }
    }
} 