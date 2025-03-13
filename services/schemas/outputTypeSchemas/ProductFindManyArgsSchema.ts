import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ProductIncludeSchema } from "../inputTypeSchemas/ProductIncludeSchema";
import { ProductWhereInputSchema } from "../inputTypeSchemas/ProductWhereInputSchema";
import { ProductOrderByWithRelationInputSchema } from "../inputTypeSchemas/ProductOrderByWithRelationInputSchema";
import { ProductWhereUniqueInputSchema } from "../inputTypeSchemas/ProductWhereUniqueInputSchema";
import { ProductScalarFieldEnumSchema } from "../inputTypeSchemas/ProductScalarFieldEnumSchema";
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema";
import { QuantityFindManyArgsSchema } from "../outputTypeSchemas/QuantityFindManyArgsSchema";
import { CategoryArgsSchema } from "../outputTypeSchemas/CategoryArgsSchema";
import { ProductCountOutputTypeArgsSchema } from "../outputTypeSchemas/ProductCountOutputTypeArgsSchema";
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z
    .object({
        id: z.boolean().optional(),
        name: z.boolean().optional(),
        description: z.boolean().optional(),
        image: z.boolean().optional(),
        price: z.boolean().optional(),
        stock: z.boolean().optional(),
        vendorId: z.boolean().optional(),
        categoryId: z.boolean().optional(),
        createdAt: z.boolean().optional(),
        updatedAt: z.boolean().optional(),
        Vendor: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
        Quantity: z.union([z.boolean(), z.lazy(() => QuantityFindManyArgsSchema)]).optional(),
        Category: z.union([z.boolean(), z.lazy(() => CategoryArgsSchema)]).optional(),
        _count: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
    })
    .strict();

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> = z
    .object({
        select: ProductSelectSchema.optional(),
        include: z.lazy(() => ProductIncludeSchema).optional(),
        where: ProductWhereInputSchema.optional(),
        orderBy: z
            .union([ProductOrderByWithRelationInputSchema.array(), ProductOrderByWithRelationInputSchema])
            .optional(),
        cursor: ProductWhereUniqueInputSchema.optional(),
        take: z.number().optional(),
        skip: z.number().optional(),
        distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional(),
    })
    .strict();

export default ProductFindManyArgsSchema;
