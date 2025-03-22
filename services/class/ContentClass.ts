import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ContentCreateArgsSchema,
    ContentDeleteArgsSchema,
    ContentFindManyArgsSchema,
    ContentFindUniqueArgsSchema,
    ContentOrderByWithRelationInputSchema,
    ContentSchema,
    ContentUpdateArgsSchema,
    ContentUpsertArgsSchema,
    ContentWhereInputSchema,
    ContentWhereUniqueInputSchema,
    ContentWithRelationsSchema
} from "@services/schemas";
import { ContentIncludeSchema } from "@services/schemas/inputTypeSchemas/ContentIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type ContentModel = z.infer<typeof ContentSchema>;
export type ContentRelationsOptional = z.infer<typeof ContentSchema> & z.infer<typeof ContentIncludeSchema>;
export type ContentRelationsComplete = z.infer<typeof ContentWithRelationsSchema>;
export type ContentCount = number;

// ============== Schema Types ============== //

const createContentSchema: ZodType<Prisma.ContentCreateArgs> = ContentCreateArgsSchema;
const upsertContentSchema: ZodType<Prisma.ContentUpsertArgs> = ContentUpsertArgsSchema;
const updateContentSchema: ZodType<Prisma.ContentUpdateArgs> = ContentUpdateArgsSchema;
const deleteContentSchema: ZodType<Prisma.ContentDeleteArgs> = ContentDeleteArgsSchema;
const selectContentSchema: ZodType<Prisma.ContentFindUniqueArgs> = ContentFindUniqueArgsSchema;
const selectManyContentSchema: ZodType<Prisma.ContentFindManyArgs> = ContentFindManyArgsSchema;
const countContentSchema: ZodType<Prisma.ContentCountArgs> = z.object({
    where: z.lazy(() => ContentWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => ContentOrderByWithRelationInputSchema),
        z.array(z.lazy(() => ContentOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => ContentWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateContentProps = z.infer<typeof createContentSchema>;
export type UpsertContentProps = z.infer<typeof upsertContentSchema>;
export type UpdateContentProps = z.infer<typeof updateContentSchema>;
export type DeleteContentProps = z.infer<typeof deleteContentSchema>;
export type FindUniqueContentProps = z.infer<typeof selectContentSchema>;
export type FindManyContentProps = z.infer<typeof selectManyContentSchema>;
export type CountContentProps = z.infer<typeof countContentSchema>;

// ============== CRUD Response Types ============== //

export type CreateContentResponse<T extends CreateContentProps> = Prisma.ContentGetPayload<T>;
export type UpsertContentResponse<T extends UpsertContentProps> = Prisma.ContentGetPayload<T>;
export type UpdateContentResponse<T extends UpdateContentProps> = Prisma.ContentGetPayload<T>;
export type DeleteContentResponse<T extends DeleteContentProps> = Prisma.ContentGetPayload<T>;
export type FindUniqueContentResponse<T extends FindUniqueContentProps> = Prisma.ContentGetPayload<T> | null;
export type FindManyContentResponse<T extends FindManyContentProps> = Prisma.ContentGetPayload<T>[];
export type CountContentResponse = ContentCount;

// ============== Services ============== //

export class ContentService {

    static async create<T extends CreateContentProps>(props: T): Promise<ResponseFormat<CreateContentResponse<T>>> {
        try {
            const { data, include, omit, select } = createContentSchema.parse(props);

            const content = await PrismaInstance.content.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content as CreateContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Create -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create content..." };
        }
    }

    static async upsert<T extends UpsertContentProps>(props: T): Promise<ResponseFormat<UpsertContentResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertContentSchema.parse(props);

            const content = await PrismaInstance.content.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content as UpsertContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert content..." };
        }
    }

    static async update<T extends UpdateContentProps>(props: T): Promise<ResponseFormat<UpdateContentResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateContentSchema.parse(props);

            const content = await PrismaInstance.content.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content as UpdateContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Update -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update content..." };
        }
    }

    static async delete<T extends DeleteContentProps>(props: T): Promise<ResponseFormat<DeleteContentResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteContentSchema.parse(props);

            const content = await PrismaInstance.content.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content as DeleteContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Delete -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete content..." };
        }
    }

    static async findUnique<T extends FindUniqueContentProps>(props: T): Promise<ResponseFormat<FindUniqueContentResponse<T>>> {
        try {
            const { where, include, omit, select } = selectContentSchema.parse(props);

            const content = await PrismaInstance.content.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: content as FindUniqueContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("ContentService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find content..." };
        }
    }

    static async findMany<T extends FindManyContentProps>(props: T): Promise<ResponseFormat<FindManyContentResponse<T>>> {
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
            } = selectManyContentSchema.parse(props);

            const contentList = await PrismaInstance.content.findMany({
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

            return { data: contentList as FindManyContentResponse<T> };
        } catch (error) {
            console.error("ContentService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("ContentService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find contents..." };
        }
    }

    static async count(props: CountContentProps): Promise<ResponseFormat<CountContentResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countContentSchema.parse(props);

            const contentAmount: ContentCount = await PrismaInstance.content.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: contentAmount };
        } catch (error) {
            console.error("ContentService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ContentService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ContentService -> Count -> Prisma error -> " + error.message);
                throw new Error("ContentService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count contents..." };
        }
    }
}
