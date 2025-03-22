import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    FruitCreateArgsSchema,
    FruitDeleteArgsSchema,
    FruitFindManyArgsSchema,
    FruitFindUniqueArgsSchema,
    FruitOrderByWithRelationInputSchema,
    FruitSchema,
    FruitUpdateArgsSchema,
    FruitUpsertArgsSchema,
    FruitWhereInputSchema,
    FruitWhereUniqueInputSchema
} from "@services/schemas";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type FruitModel = z.infer<typeof FruitSchema>;
export type FruitCount = number;

// ============== Schema Types ============== //

const createFruitSchema: ZodType<Prisma.FruitCreateArgs> = FruitCreateArgsSchema;
const upsertFruitSchema: ZodType<Prisma.FruitUpsertArgs> = FruitUpsertArgsSchema;
const updateFruitSchema: ZodType<Prisma.FruitUpdateArgs> = FruitUpdateArgsSchema;
const deleteFruitSchema: ZodType<Prisma.FruitDeleteArgs> = FruitDeleteArgsSchema;
const selectFruitSchema: ZodType<Prisma.FruitFindUniqueArgs> = FruitFindUniqueArgsSchema;
const selectManyFruitSchema: ZodType<Prisma.FruitFindManyArgs> = FruitFindManyArgsSchema;
const countFruitSchema: ZodType<Prisma.FruitCountArgs> = z.object({
    where: z.lazy(() => FruitWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => FruitOrderByWithRelationInputSchema),
        z.array(z.lazy(() => FruitOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => FruitWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateFruitProps = z.infer<typeof createFruitSchema>;
export type UpsertFruitProps = z.infer<typeof upsertFruitSchema>;
export type UpdateFruitProps = z.infer<typeof updateFruitSchema>;
export type DeleteFruitProps = z.infer<typeof deleteFruitSchema>;
export type FindUniqueFruitProps = z.infer<typeof selectFruitSchema>;
export type FindManyFruitProps = z.infer<typeof selectManyFruitSchema>;
export type CountFruitProps = z.infer<typeof countFruitSchema>;

// ============== CRUD Response Types ============== //

export type CreateFruitResponse<T extends CreateFruitProps> = Prisma.FruitGetPayload<T>;
export type UpsertFruitResponse<T extends UpsertFruitProps> = Prisma.FruitGetPayload<T>;
export type UpdateFruitResponse<T extends UpdateFruitProps> = Prisma.FruitGetPayload<T>;
export type DeleteFruitResponse<T extends DeleteFruitProps> = Prisma.FruitGetPayload<T>;
export type FindUniqueFruitResponse<T extends FindUniqueFruitProps> = Prisma.FruitGetPayload<T> | null;
export type FindManyFruitResponse<T extends FindManyFruitProps> = Prisma.FruitGetPayload<T>[];
export type CountFruitResponse = FruitCount;

// ============== Services ============== //

export class FruitService {

    static async create<T extends CreateFruitProps>(props: T): Promise<ResponseFormat<CreateFruitResponse<T>>> {
        try {
            const { data, omit, select } = createFruitSchema.parse(props);

            const fruit = await PrismaInstance.fruit.create({
                data,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit as CreateFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Create -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create fruit..." };
        }
    }

    static async upsert<T extends UpsertFruitProps>(props: T): Promise<ResponseFormat<UpsertFruitResponse<T>>> {
        try {
            const { create, update, where, omit, select } = upsertFruitSchema.parse(props);

            const fruit = await PrismaInstance.fruit.upsert({
                create,
                update,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit as UpsertFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert fruit..." };
        }
    }

    static async update<T extends UpdateFruitProps>(props: T): Promise<ResponseFormat<UpdateFruitResponse<T>>> {
        try {
            const { data, where, omit, select } = updateFruitSchema.parse(props);

            const fruit = await PrismaInstance.fruit.update({
                data,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit as UpdateFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Update -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update fruit..." };
        }
    }

    static async delete<T extends DeleteFruitProps>(props: T): Promise<ResponseFormat<DeleteFruitResponse<T>>> {
        try {
            const { where, omit, select } = deleteFruitSchema.parse(props);

            const fruit = await PrismaInstance.fruit.delete({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit as DeleteFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Delete -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete fruit..." };
        }
    }

    static async findUnique<T extends FindUniqueFruitProps>(props: T): Promise<ResponseFormat<FindUniqueFruitResponse<T>>> {
        try {
            const { where, omit, select } = selectFruitSchema.parse(props);

            const fruit = await PrismaInstance.fruit.findUnique({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: fruit as FindUniqueFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("FruitService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find fruit..." };
        }
    }

    static async findMany<T extends FindManyFruitProps>(props: T): Promise<ResponseFormat<FindManyFruitResponse<T>>> {
        try {
            const {
                cursor,
                distinct,
                
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyFruitSchema.parse(props);

            const fruitList = await PrismaInstance.fruit.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: fruitList as FindManyFruitResponse<T> };
        } catch (error) {
            console.error("FruitService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("FruitService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find fruits..." };
        }
    }

    static async count(props: CountFruitProps): Promise<ResponseFormat<CountFruitResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countFruitSchema.parse(props);

            const fruitAmount: FruitCount = await PrismaInstance.fruit.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: fruitAmount };
        } catch (error) {
            console.error("FruitService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("FruitService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("FruitService -> Count -> Prisma error -> " + error.message);
                throw new Error("FruitService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count fruits..." };
        }
    }
}
