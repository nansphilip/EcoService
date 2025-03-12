/**
 * Classe de service pour les opérations CRUD sur les orders
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les orders.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Order, OrderSchema } from "@services/schemas";
import {
    OrderCreateInputSchema,
    OrderUpdateInputSchema,
    OrderWhereInputSchema,
    OrderWhereUniqueInputSchema,
} from "@services/schemas/inputTypeSchemas";
import { OrderIncludeSchema } from "@services/schemas/inputTypeSchemas/OrderIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type OrderModel = z.infer<typeof OrderSchema>;

export type OrderRelations = z.infer<typeof OrderIncludeSchema>;

export type OrderComplete = z.infer<typeof OrderSchema> & z.infer<typeof OrderIncludeSchema>;

export type OrderCount = number;

// ============== Schema Types ============== //

const createOrderSchema: ZodType<Prisma.OrderCreateArgs> = z.strictObject({
    data: OrderCreateInputSchema,
});

const updateOrderSchema: ZodType<Prisma.OrderUpdateArgs> = z.strictObject({
    where: OrderWhereUniqueInputSchema,
    data: OrderUpdateInputSchema,
});

const deleteOrderSchema: ZodType<Prisma.OrderDeleteArgs> = z.strictObject({
    where: OrderWhereUniqueInputSchema,
});

const selectOrderSchema: ZodType<Prisma.OrderFindUniqueArgs> = z.strictObject({
    where: OrderWhereUniqueInputSchema,
});

const selectManyOrderSchema: ZodType<Prisma.OrderFindManyArgs> = z.strictObject({
    where: OrderWhereInputSchema,
});

const countOrderSchema: ZodType<Prisma.OrderCountArgs> = z.strictObject({
    where: OrderWhereInputSchema,
});

// ============== CRUD Props Types ============== //

export type CreateOrderProps = z.infer<typeof createOrderSchema>;

export type UpdateOrderProps = z.infer<typeof updateOrderSchema>;

export type DeleteOrderProps = z.infer<typeof deleteOrderSchema>;

export type FindUniqueOrderProps = z.infer<typeof selectOrderSchema>;

export type FindManyOrderProps = z.infer<typeof selectManyOrderSchema>;

export type CountOrderProps = z.infer<typeof countOrderSchema>;

// ============== CRUD Response Types ============== //

export type ResponseFormat<Key extends string, Response> = { [key in Key]: Response } | { error: string };

export type CreateOrderResponse = ResponseFormat<"order", OrderModel>;

export type UpdateOrderResponse = ResponseFormat<"order", OrderModel>;

export type DeleteOrderResponse = ResponseFormat<"order", OrderModel>;

export type FindUniqueOrderResponse = ResponseFormat<"order", OrderComplete | null>;

export type FindManyOrderResponse = ResponseFormat<"orderList", OrderComplete[]>;

export type CountOrderResponse = ResponseFormat<"orderAmount", OrderCount>;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les orders
 */
export class OrderService {
    /**
     * Crée un(e) nouveau/nouvelle order
     * @param props Propriétés du/de la order
     * @returns Order créé(e) ou erreur
     */
    static async create(props: CreateOrderProps): Promise<CreateOrderResponse> {
        try {
            const data = createOrderSchema.parse(props);

            const order: Order = await PrismaInstance.order.create(data);

            return { order };
        } catch (error) {
            console.error("OrderService.create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> Create -> Prisma error -> " + error.message);
                throw new Error("OrderService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create order..." };
        }
    }

    /**
     * Met à jour un(e) order
     * @param props ID du/de la order et nouvelles données
     * @returns Order mis(e) à jour ou erreur
     */
    static async update(props: UpdateOrderProps): Promise<UpdateOrderResponse> {
        try {
            const data = updateOrderSchema.parse(props);

            const order: Order = await PrismaInstance.order.update(data);

            return { order };
        } catch (error) {
            console.error("OrderService.update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> Update -> Prisma error -> " + error.message);
                throw new Error("OrderService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update order..." };
        }
    }

    /**
     * Supprime un(e) order
     * @param props ID du/de la order
     * @returns Order supprimé(e) ou erreur
     */
    static async delete(props: DeleteOrderProps): Promise<DeleteOrderResponse> {
        try {
            const data = deleteOrderSchema.parse(props);

            const order: Order = await PrismaInstance.order.delete(data);

            return { order };
        } catch (error) {
            console.error("OrderService.delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> Delete -> Prisma error -> " + error.message);
                throw new Error("OrderService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete order..." };
        }
    }

    /**
     * Récupère un(e) order par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueOrderProps): Promise<FindUniqueOrderResponse> {
        try {
            const data = selectOrderSchema.parse(props);

            const order: OrderComplete | null = await PrismaInstance.order.findUnique(data);

            return { order };
        } catch (error) {
            console.error("OrderService.findUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("OrderService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find order..." };
        }
    }

    /**
     * Récupère une liste de orders avec filtres
     */
    static async findMany(props: FindManyOrderProps): Promise<FindManyOrderResponse> {
        try {
            const data = selectManyOrderSchema.parse(props);

            const orderList: OrderComplete[] = await PrismaInstance.order.findMany(data);

            return { orderList };
        } catch (error) {
            console.error("OrderService.findMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("OrderService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find orders..." };
        }
    }

    /**
     * Compte les orders avec filtres
     */
    static async count(props: CountOrderProps): Promise<CountOrderResponse> {
        try {
            const data = countOrderSchema.parse(props);

            const orderAmount: OrderCount = await PrismaInstance.order.count(data);

            return { orderAmount };
        } catch (error) {
            console.error("OrderService.count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> Count -> Prisma error -> " + error.message);
                throw new Error("OrderService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count orders..." };
        }
    }
} 