import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    DiyCreateArgsSchema,
    DiyDeleteArgsSchema,
    DiyFindManyArgsSchema,
    DiyFindUniqueArgsSchema,
    DiyOrderByWithRelationInputSchema,
    DiySchema,
    DiyUpdateArgsSchema,
    DiyUpsertArgsSchema,
    DiyWhereInputSchema,
    DiyWhereUniqueInputSchema,
    DiyWithRelationsSchema
} from "@services/schemas";
import { DiyIncludeSchema } from "@services/schemas/inputTypeSchemas/DiyIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type DiyModel = z.infer<typeof DiySchema>;
export type DiyRelationsOptional = z.infer<typeof DiySchema> & z.infer<typeof DiyIncludeSchema>;
export type DiyRelationsComplete = z.infer<typeof DiyWithRelationsSchema>;
export type DiyCount = number;

// ============== Schema Types ============== //

const createDiySchema: ZodType<Prisma.DiyCreateArgs> = DiyCreateArgsSchema;
const upsertDiySchema: ZodType<Prisma.DiyUpsertArgs> = DiyUpsertArgsSchema;
const updateDiySchema: ZodType<Prisma.DiyUpdateArgs> = DiyUpdateArgsSchema;
const deleteDiySchema: ZodType<Prisma.DiyDeleteArgs> = DiyDeleteArgsSchema;
const selectDiySchema: ZodType<Prisma.DiyFindUniqueArgs> = DiyFindUniqueArgsSchema;
const selectManyDiySchema: ZodType<Prisma.DiyFindManyArgs> = DiyFindManyArgsSchema;
const countDiySchema: ZodType<Prisma.DiyCountArgs> = z.object({
    where: z.lazy(() => DiyWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => DiyOrderByWithRelationInputSchema),
        z.array(z.lazy(() => DiyOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => DiyWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateDiyProps = z.infer<typeof createDiySchema>;
export type UpsertDiyProps = z.infer<typeof upsertDiySchema>;
export type UpdateDiyProps = z.infer<typeof updateDiySchema>;
export type DeleteDiyProps = z.infer<typeof deleteDiySchema>;
export type FindUniqueDiyProps = z.infer<typeof selectDiySchema>;
export type FindManyDiyProps = z.infer<typeof selectManyDiySchema>;
export type CountDiyProps = z.infer<typeof countDiySchema>;

// ============== CRUD Response Types ============== //

export type CreateDiyResponse<T extends CreateDiyProps> = Prisma.DiyGetPayload<T>;
export type UpsertDiyResponse<T extends UpsertDiyProps> = Prisma.DiyGetPayload<T>;
export type UpdateDiyResponse<T extends UpdateDiyProps> = Prisma.DiyGetPayload<T>;
export type DeleteDiyResponse<T extends DeleteDiyProps> = Prisma.DiyGetPayload<T>;
export type FindUniqueDiyResponse<T extends FindUniqueDiyProps> = Prisma.DiyGetPayload<T> | null;
export type FindManyDiyResponse<T extends FindManyDiyProps> = Prisma.DiyGetPayload<T>[];
export type CountDiyResponse = DiyCount;

// ============== Services ============== //

export class DiyService {

    static async create<T extends CreateDiyProps>(props: T): Promise<ResponseFormat<CreateDiyResponse<T>>> {
        try {
            const { data, include, omit, select } = createDiySchema.parse(props);

            const diy = await PrismaInstance.diy.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: diy as CreateDiyResponse<T> };
        } catch (error) {
            console.error("DiyService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> Create -> Prisma error -> " + error.message);
                throw new Error("DiyService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create diy..." };
        }
    }

    static async upsert<T extends UpsertDiyProps>(props: T): Promise<ResponseFormat<UpsertDiyResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertDiySchema.parse(props);

            const diy = await PrismaInstance.diy.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: diy as UpsertDiyResponse<T> };
        } catch (error) {
            console.error("DiyService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("DiyService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert diy..." };
        }
    }

    static async update<T extends UpdateDiyProps>(props: T): Promise<ResponseFormat<UpdateDiyResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateDiySchema.parse(props);

            const diy = await PrismaInstance.diy.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: diy as UpdateDiyResponse<T> };
        } catch (error) {
            console.error("DiyService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> Update -> Prisma error -> " + error.message);
                throw new Error("DiyService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update diy..." };
        }
    }

    static async delete<T extends DeleteDiyProps>(props: T): Promise<ResponseFormat<DeleteDiyResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteDiySchema.parse(props);

            const diy = await PrismaInstance.diy.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: diy as DeleteDiyResponse<T> };
        } catch (error) {
            console.error("DiyService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> Delete -> Prisma error -> " + error.message);
                throw new Error("DiyService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete diy..." };
        }
    }

    static async findUnique<T extends FindUniqueDiyProps>(props: T): Promise<ResponseFormat<FindUniqueDiyResponse<T>>> {
        try {
            const { where, include, omit, select } = selectDiySchema.parse(props);

            const diy = await PrismaInstance.diy.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: diy as FindUniqueDiyResponse<T> };
        } catch (error) {
            console.error("DiyService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("DiyService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find diy..." };
        }
    }

    static async findMany<T extends FindManyDiyProps>(props: T): Promise<ResponseFormat<FindManyDiyResponse<T>>> {
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
            } = selectManyDiySchema.parse(props);

            const diyList = await PrismaInstance.diy.findMany({
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

            return { data: diyList as FindManyDiyResponse<T> };
        } catch (error) {
            console.error("DiyService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("DiyService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find diys..." };
        }
    }

    static async count(props: CountDiyProps): Promise<ResponseFormat<CountDiyResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countDiySchema.parse(props);

            const diyAmount: DiyCount = await PrismaInstance.diy.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: diyAmount };
        } catch (error) {
            console.error("DiyService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("DiyService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("DiyService -> Count -> Prisma error -> " + error.message);
                throw new Error("DiyService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count diys..." };
        }
    }
}
