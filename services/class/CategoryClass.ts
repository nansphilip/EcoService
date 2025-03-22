import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    CategoryCreateArgsSchema,
    CategoryDeleteArgsSchema,
    CategoryFindManyArgsSchema,
    CategoryFindUniqueArgsSchema,
    CategoryOrderByWithRelationInputSchema,
    CategorySchema,
    CategoryUpdateArgsSchema,
    CategoryUpsertArgsSchema,
    CategoryWhereInputSchema,
    CategoryWhereUniqueInputSchema,
    CategoryWithRelationsSchema
} from "@services/schemas";
import { CategoryIncludeSchema } from "@services/schemas/inputTypeSchemas/CategoryIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type CategoryModel = z.infer<typeof CategorySchema>;
export type CategoryRelationsOptional = z.infer<typeof CategorySchema> & z.infer<typeof CategoryIncludeSchema>;
export type CategoryRelationsComplete = z.infer<typeof CategoryWithRelationsSchema>;
export type CategoryCount = number;

// ============== Schema Types ============== //

const createCategorySchema: ZodType<Prisma.CategoryCreateArgs> = CategoryCreateArgsSchema;
const upsertCategorySchema: ZodType<Prisma.CategoryUpsertArgs> = CategoryUpsertArgsSchema;
const updateCategorySchema: ZodType<Prisma.CategoryUpdateArgs> = CategoryUpdateArgsSchema;
const deleteCategorySchema: ZodType<Prisma.CategoryDeleteArgs> = CategoryDeleteArgsSchema;
const selectCategorySchema: ZodType<Prisma.CategoryFindUniqueArgs> = CategoryFindUniqueArgsSchema;
const selectManyCategorySchema: ZodType<Prisma.CategoryFindManyArgs> = CategoryFindManyArgsSchema;
const countCategorySchema: ZodType<Prisma.CategoryCountArgs> = z.object({
    where: z.lazy(() => CategoryWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => CategoryOrderByWithRelationInputSchema),
        z.array(z.lazy(() => CategoryOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateCategoryProps = z.infer<typeof createCategorySchema>;
export type UpsertCategoryProps = z.infer<typeof upsertCategorySchema>;
export type UpdateCategoryProps = z.infer<typeof updateCategorySchema>;
export type DeleteCategoryProps = z.infer<typeof deleteCategorySchema>;
export type FindUniqueCategoryProps = z.infer<typeof selectCategorySchema>;
export type FindManyCategoryProps = z.infer<typeof selectManyCategorySchema>;
export type CountCategoryProps = z.infer<typeof countCategorySchema>;

// ============== CRUD Response Types ============== //

export type CreateCategoryResponse<T extends CreateCategoryProps> = Prisma.CategoryGetPayload<T>;
export type UpsertCategoryResponse<T extends UpsertCategoryProps> = Prisma.CategoryGetPayload<T>;
export type UpdateCategoryResponse<T extends UpdateCategoryProps> = Prisma.CategoryGetPayload<T>;
export type DeleteCategoryResponse<T extends DeleteCategoryProps> = Prisma.CategoryGetPayload<T>;
export type FindUniqueCategoryResponse<T extends FindUniqueCategoryProps> = Prisma.CategoryGetPayload<T> | null;
export type FindManyCategoryResponse<T extends FindManyCategoryProps> = Prisma.CategoryGetPayload<T>[];
export type CountCategoryResponse = CategoryCount;

// ============== Services ============== //

export class CategoryService {

    static async create<T extends CreateCategoryProps>(props: T): Promise<ResponseFormat<CreateCategoryResponse<T>>> {
        try {
            const { data, include, omit, select } = createCategorySchema.parse(props);

            const category = await PrismaInstance.category.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category as CreateCategoryResponse<T> };
        } catch (error) {
            console.error("CategoryService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Create -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create category..." };
        }
    }

    static async upsert<T extends UpsertCategoryProps>(props: T): Promise<ResponseFormat<UpsertCategoryResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertCategorySchema.parse(props);

            const category = await PrismaInstance.category.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category as UpsertCategoryResponse<T> };
        } catch (error) {
            console.error("CategoryService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert category..." };
        }
    }

    static async update<T extends UpdateCategoryProps>(props: T): Promise<ResponseFormat<UpdateCategoryResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateCategorySchema.parse(props);

            const category = await PrismaInstance.category.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category as UpdateCategoryResponse<T> };
        } catch (error) {
            console.error("CategoryService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Update -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update category..." };
        }
    }

    static async delete<T extends DeleteCategoryProps>(props: T): Promise<ResponseFormat<DeleteCategoryResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteCategorySchema.parse(props);

            const category = await PrismaInstance.category.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category as DeleteCategoryResponse<T> };
        } catch (error) {
            console.error("CategoryService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Delete -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete category..." };
        }
    }

    static async findUnique<T extends FindUniqueCategoryProps>(props: T): Promise<ResponseFormat<FindUniqueCategoryResponse<T>>> {
        try {
            const { where, include, omit, select } = selectCategorySchema.parse(props);

            const category = await PrismaInstance.category.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: category as FindUniqueCategoryResponse<T> };
        } catch (error) {
            console.error("CategoryService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find category..." };
        }
    }

    static async findMany<T extends FindManyCategoryProps>(props: T): Promise<ResponseFormat<FindManyCategoryResponse<T>>> {
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
            } = selectManyCategorySchema.parse(props);

            const categoryList = await PrismaInstance.category.findMany({
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

            return { data: categoryList as FindManyCategoryResponse<T> };
        } catch (error) {
            console.error("CategoryService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find categorys..." };
        }
    }

    static async count(props: CountCategoryProps): Promise<ResponseFormat<CountCategoryResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countCategorySchema.parse(props);

            const categoryAmount: CategoryCount = await PrismaInstance.category.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: categoryAmount };
        } catch (error) {
            console.error("CategoryService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("CategoryService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("CategoryService -> Count -> Prisma error -> " + error.message);
                throw new Error("CategoryService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count categorys..." };
        }
    }
}
