import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ProductCreateArgsSchema,
    ProductDeleteArgsSchema,
    ProductFindManyArgsSchema,
    ProductFindUniqueArgsSchema,
    ProductOrderByWithRelationInputSchema,
    ProductSchema,
    ProductUpdateArgsSchema,
    ProductUpsertArgsSchema,
    ProductWhereInputSchema,
    ProductWhereUniqueInputSchema,
    ProductWithRelationsSchema
} from "@services/schemas";
import { ProductIncludeSchema } from "@services/schemas/inputTypeSchemas/ProductIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type ProductModel = z.infer<typeof ProductSchema>;
export type ProductRelationsOptional = z.infer<typeof ProductSchema> & z.infer<typeof ProductIncludeSchema>;
export type ProductRelationsComplete = z.infer<typeof ProductWithRelationsSchema>;
export type ProductCount = number;

// ============== Schema Types ============== //

const createProductSchema: ZodType<Prisma.ProductCreateArgs> = ProductCreateArgsSchema;
const upsertProductSchema: ZodType<Prisma.ProductUpsertArgs> = ProductUpsertArgsSchema;
const updateProductSchema: ZodType<Prisma.ProductUpdateArgs> = ProductUpdateArgsSchema;
const deleteProductSchema: ZodType<Prisma.ProductDeleteArgs> = ProductDeleteArgsSchema;
const selectProductSchema: ZodType<Prisma.ProductFindUniqueArgs> = ProductFindUniqueArgsSchema;
const selectManyProductSchema: ZodType<Prisma.ProductFindManyArgs> = ProductFindManyArgsSchema;
const countProductSchema: ZodType<Prisma.ProductCountArgs> = z.object({
    where: z.lazy(() => ProductWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => ProductOrderByWithRelationInputSchema),
        z.array(z.lazy(() => ProductOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateProductProps = z.infer<typeof createProductSchema>;
export type UpsertProductProps = z.infer<typeof upsertProductSchema>;
export type UpdateProductProps = z.infer<typeof updateProductSchema>;
export type DeleteProductProps = z.infer<typeof deleteProductSchema>;
export type FindUniqueProductProps = z.infer<typeof selectProductSchema>;
export type FindManyProductProps = z.infer<typeof selectManyProductSchema>;
export type CountProductProps = z.infer<typeof countProductSchema>;

// ============== CRUD Response Types ============== //

export type CreateProductResponse<T extends CreateProductProps> = Prisma.ProductGetPayload<T>;
export type UpsertProductResponse<T extends UpsertProductProps> = Prisma.ProductGetPayload<T>;
export type UpdateProductResponse<T extends UpdateProductProps> = Prisma.ProductGetPayload<T>;
export type DeleteProductResponse<T extends DeleteProductProps> = Prisma.ProductGetPayload<T>;
export type FindUniqueProductResponse<T extends FindUniqueProductProps> = Prisma.ProductGetPayload<T> | null;
export type FindManyProductResponse<T extends FindManyProductProps> = Prisma.ProductGetPayload<T>[];
export type CountProductResponse = ProductCount;

// ============== Services ============== //

export class ProductService {

    static async create<T extends CreateProductProps>(props: T): Promise<ResponseFormat<CreateProductResponse<T>>> {
        try {
            const { data, include, omit, select } = createProductSchema.parse(props);

            const product = await PrismaInstance.product.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: product as CreateProductResponse<T> };
        } catch (error) {
            console.error("ProductService -> Create -> " + (error as Error).message);
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

    static async upsert<T extends UpsertProductProps>(props: T): Promise<ResponseFormat<UpsertProductResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertProductSchema.parse(props);

            const product = await PrismaInstance.product.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: product as UpsertProductResponse<T> };
        } catch (error) {
            console.error("ProductService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("ProductService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("ProductService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("ProductService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert product..." };
        }
    }

    static async update<T extends UpdateProductProps>(props: T): Promise<ResponseFormat<UpdateProductResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateProductSchema.parse(props);

            const product = await PrismaInstance.product.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: product as UpdateProductResponse<T> };
        } catch (error) {
            console.error("ProductService -> Update -> " + (error as Error).message);
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

    static async delete<T extends DeleteProductProps>(props: T): Promise<ResponseFormat<DeleteProductResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteProductSchema.parse(props);

            const product = await PrismaInstance.product.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: product as DeleteProductResponse<T> };
        } catch (error) {
            console.error("ProductService -> Delete -> " + (error as Error).message);
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

    static async findUnique<T extends FindUniqueProductProps>(props: T): Promise<ResponseFormat<FindUniqueProductResponse<T>>> {
        try {
            const { where, include, omit, select } = selectProductSchema.parse(props);

            const product = await PrismaInstance.product.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: product as FindUniqueProductResponse<T> };
        } catch (error) {
            console.error("ProductService -> FindUnique -> " + (error as Error).message);
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

    static async findMany<T extends FindManyProductProps>(props: T): Promise<ResponseFormat<FindManyProductResponse<T>>> {
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
            } = selectManyProductSchema.parse(props);

            const productList = await PrismaInstance.product.findMany({
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

            return { data: productList as FindManyProductResponse<T> };
        } catch (error) {
            console.error("ProductService -> FindMany -> " + (error as Error).message);
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

    static async count(props: CountProductProps): Promise<ResponseFormat<CountProductResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countProductSchema.parse(props);

            const productAmount: ProductCount = await PrismaInstance.product.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: productAmount };
        } catch (error) {
            console.error("ProductService -> Count -> " + (error as Error).message);
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
