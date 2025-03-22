import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    OrderCreateArgsSchema,
    OrderDeleteArgsSchema,
    OrderFindManyArgsSchema,
    OrderFindUniqueArgsSchema,
    OrderOrderByWithRelationInputSchema,
    OrderSchema,
    OrderUpdateArgsSchema,
    OrderUpsertArgsSchema,
    OrderWhereInputSchema,
    OrderWhereUniqueInputSchema,
    OrderWithRelationsSchema
} from "@services/schemas";
import { OrderIncludeSchema } from "@services/schemas/inputTypeSchemas/OrderIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type OrderModel = z.infer<typeof OrderSchema>;
export type OrderRelationsOptional = z.infer<typeof OrderSchema> & z.infer<typeof OrderIncludeSchema>;
export type OrderRelationsComplete = z.infer<typeof OrderWithRelationsSchema>;
export type OrderCount = number;

// ============== Schema Types ============== //

const createOrderSchema: ZodType<Prisma.OrderCreateArgs> = OrderCreateArgsSchema;
const upsertOrderSchema: ZodType<Prisma.OrderUpsertArgs> = OrderUpsertArgsSchema;
const updateOrderSchema: ZodType<Prisma.OrderUpdateArgs> = OrderUpdateArgsSchema;
const deleteOrderSchema: ZodType<Prisma.OrderDeleteArgs> = OrderDeleteArgsSchema;
const selectOrderSchema: ZodType<Prisma.OrderFindUniqueArgs> = OrderFindUniqueArgsSchema;
const selectManyOrderSchema: ZodType<Prisma.OrderFindManyArgs> = OrderFindManyArgsSchema;
const countOrderSchema: ZodType<Prisma.OrderCountArgs> = z.object({
    where: z.lazy(() => OrderWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => OrderOrderByWithRelationInputSchema),
        z.array(z.lazy(() => OrderOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => OrderWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateOrderProps = z.infer<typeof createOrderSchema>;
export type UpsertOrderProps = z.infer<typeof upsertOrderSchema>;
export type UpdateOrderProps = z.infer<typeof updateOrderSchema>;
export type DeleteOrderProps = z.infer<typeof deleteOrderSchema>;
export type FindUniqueOrderProps = z.infer<typeof selectOrderSchema>;
export type FindManyOrderProps = z.infer<typeof selectManyOrderSchema>;
export type CountOrderProps = z.infer<typeof countOrderSchema>;

// ============== CRUD Response Types ============== //

export type CreateOrderResponse<T extends CreateOrderProps> = Prisma.OrderGetPayload<T>;
export type UpsertOrderResponse<T extends UpsertOrderProps> = Prisma.OrderGetPayload<T>;
export type UpdateOrderResponse<T extends UpdateOrderProps> = Prisma.OrderGetPayload<T>;
export type DeleteOrderResponse<T extends DeleteOrderProps> = Prisma.OrderGetPayload<T>;
export type FindUniqueOrderResponse<T extends FindUniqueOrderProps> = Prisma.OrderGetPayload<T> | null;
export type FindManyOrderResponse<T extends FindManyOrderProps> = Prisma.OrderGetPayload<T>[];
export type CountOrderResponse = OrderCount;

// ============== Services ============== //

export class OrderService {

    static async create<T extends CreateOrderProps>(props: T): Promise<ResponseFormat<CreateOrderResponse<T>>> {
        try {
            const { data, include, omit, select } = createOrderSchema.parse(props);

            const order = await PrismaInstance.order.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order as CreateOrderResponse<T> };
        } catch (error) {
            console.error("OrderService -> Create -> " + (error as Error).message);
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

    static async upsert<T extends UpsertOrderProps>(props: T): Promise<ResponseFormat<UpsertOrderResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertOrderSchema.parse(props);

            const order = await PrismaInstance.order.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order as UpsertOrderResponse<T> };
        } catch (error) {
            console.error("OrderService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("OrderService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert order..." };
        }
    }

    static async update<T extends UpdateOrderProps>(props: T): Promise<ResponseFormat<UpdateOrderResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateOrderSchema.parse(props);

            const order = await PrismaInstance.order.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order as UpdateOrderResponse<T> };
        } catch (error) {
            console.error("OrderService -> Update -> " + (error as Error).message);
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

    static async delete<T extends DeleteOrderProps>(props: T): Promise<ResponseFormat<DeleteOrderResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteOrderSchema.parse(props);

            const order = await PrismaInstance.order.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order as DeleteOrderResponse<T> };
        } catch (error) {
            console.error("OrderService -> Delete -> " + (error as Error).message);
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

    static async findUnique<T extends FindUniqueOrderProps>(props: T): Promise<ResponseFormat<FindUniqueOrderResponse<T>>> {
        try {
            const { where, include, omit, select } = selectOrderSchema.parse(props);

            const order = await PrismaInstance.order.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order as FindUniqueOrderResponse<T> };
        } catch (error) {
            console.error("OrderService -> FindUnique -> " + (error as Error).message);
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

    static async findMany<T extends FindManyOrderProps>(props: T): Promise<ResponseFormat<FindManyOrderResponse<T>>> {
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
            } = selectManyOrderSchema.parse(props);

            const orderList = await PrismaInstance.order.findMany({
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

            return { data: orderList as FindManyOrderResponse<T> };
        } catch (error) {
            console.error("OrderService -> FindMany -> " + (error as Error).message);
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

    static async count(props: CountOrderProps): Promise<ResponseFormat<CountOrderResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countOrderSchema.parse(props);

            const orderAmount: OrderCount = await PrismaInstance.order.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: orderAmount };
        } catch (error) {
            console.error("OrderService -> Count -> " + (error as Error).message);
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
