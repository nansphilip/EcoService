import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    QuantityCreateArgsSchema,
    QuantityDeleteArgsSchema,
    QuantityFindManyArgsSchema,
    QuantityFindUniqueArgsSchema,
    QuantityOrderByWithRelationInputSchema,
    QuantitySchema,
    QuantityUpdateArgsSchema,
    QuantityUpsertArgsSchema,
    QuantityWhereInputSchema,
    QuantityWhereUniqueInputSchema,
    QuantityWithRelationsSchema
} from "@services/schemas";
import { QuantityIncludeSchema } from "@services/schemas/inputTypeSchemas/QuantityIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type QuantityModel = z.infer<typeof QuantitySchema>;
export type QuantityRelationsOptional = z.infer<typeof QuantitySchema> & z.infer<typeof QuantityIncludeSchema>;
export type QuantityRelationsComplete = z.infer<typeof QuantityWithRelationsSchema>;
export type QuantityCount = number;

// ============== Schema Types ============== //

const createQuantitySchema: ZodType<Prisma.QuantityCreateArgs> = QuantityCreateArgsSchema;
const upsertQuantitySchema: ZodType<Prisma.QuantityUpsertArgs> = QuantityUpsertArgsSchema;
const updateQuantitySchema: ZodType<Prisma.QuantityUpdateArgs> = QuantityUpdateArgsSchema;
const deleteQuantitySchema: ZodType<Prisma.QuantityDeleteArgs> = QuantityDeleteArgsSchema;
const selectQuantitySchema: ZodType<Prisma.QuantityFindUniqueArgs> = QuantityFindUniqueArgsSchema;
const selectManyQuantitySchema: ZodType<Prisma.QuantityFindManyArgs> = QuantityFindManyArgsSchema;
const countQuantitySchema: ZodType<Prisma.QuantityCountArgs> = z.object({
    where: z.lazy(() => QuantityWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => QuantityOrderByWithRelationInputSchema),
        z.array(z.lazy(() => QuantityOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => QuantityWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateQuantityProps = z.infer<typeof createQuantitySchema>;
export type UpsertQuantityProps = z.infer<typeof upsertQuantitySchema>;
export type UpdateQuantityProps = z.infer<typeof updateQuantitySchema>;
export type DeleteQuantityProps = z.infer<typeof deleteQuantitySchema>;
export type FindUniqueQuantityProps = z.infer<typeof selectQuantitySchema>;
export type FindManyQuantityProps = z.infer<typeof selectManyQuantitySchema>;
export type CountQuantityProps = z.infer<typeof countQuantitySchema>;

// ============== CRUD Response Types ============== //

export type CreateQuantityResponse<T extends CreateQuantityProps> = Prisma.QuantityGetPayload<T>;
export type UpsertQuantityResponse<T extends UpsertQuantityProps> = Prisma.QuantityGetPayload<T>;
export type UpdateQuantityResponse<T extends UpdateQuantityProps> = Prisma.QuantityGetPayload<T>;
export type DeleteQuantityResponse<T extends DeleteQuantityProps> = Prisma.QuantityGetPayload<T>;
export type FindUniqueQuantityResponse<T extends FindUniqueQuantityProps> = Prisma.QuantityGetPayload<T> | null;
export type FindManyQuantityResponse<T extends FindManyQuantityProps> = Prisma.QuantityGetPayload<T>[];
export type CountQuantityResponse = QuantityCount;

// ============== Services ============== //

export class QuantityService {

    static async create<T extends CreateQuantityProps>(props: T): Promise<ResponseFormat<CreateQuantityResponse<T>>> {
        try {
            const { data, include, omit, select } = createQuantitySchema.parse(props);

            const quantity = await PrismaInstance.quantity.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity as CreateQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Create -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create quantity..." };
        }
    }

    static async upsert<T extends UpsertQuantityProps>(props: T): Promise<ResponseFormat<UpsertQuantityResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertQuantitySchema.parse(props);

            const quantity = await PrismaInstance.quantity.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity as UpsertQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert quantity..." };
        }
    }

    static async update<T extends UpdateQuantityProps>(props: T): Promise<ResponseFormat<UpdateQuantityResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateQuantitySchema.parse(props);

            const quantity = await PrismaInstance.quantity.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity as UpdateQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Update -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update quantity..." };
        }
    }

    static async delete<T extends DeleteQuantityProps>(props: T): Promise<ResponseFormat<DeleteQuantityResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteQuantitySchema.parse(props);

            const quantity = await PrismaInstance.quantity.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity as DeleteQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Delete -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete quantity..." };
        }
    }

    static async findUnique<T extends FindUniqueQuantityProps>(props: T): Promise<ResponseFormat<FindUniqueQuantityResponse<T>>> {
        try {
            const { where, include, omit, select } = selectQuantitySchema.parse(props);

            const quantity = await PrismaInstance.quantity.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: quantity as FindUniqueQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find quantity..." };
        }
    }

    static async findMany<T extends FindManyQuantityProps>(props: T): Promise<ResponseFormat<FindManyQuantityResponse<T>>> {
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
            } = selectManyQuantitySchema.parse(props);

            const quantityList = await PrismaInstance.quantity.findMany({
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

            return { data: quantityList as FindManyQuantityResponse<T> };
        } catch (error) {
            console.error("QuantityService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find quantitys..." };
        }
    }

    static async count(props: CountQuantityProps): Promise<ResponseFormat<CountQuantityResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countQuantitySchema.parse(props);

            const quantityAmount: QuantityCount = await PrismaInstance.quantity.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: quantityAmount };
        } catch (error) {
            console.error("QuantityService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("QuantityService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("QuantityService -> Count -> Prisma error -> " + error.message);
                throw new Error("QuantityService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count quantitys..." };
        }
    }
}
