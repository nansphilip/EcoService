/**
 * Schémas de validation Zod pour Product
 * 
 * Ce fichier contient les schémas de validation Zod pour le modèle Product.
 * Il est généré automatiquement et peut être modifié manuellement si nécessaire.
 */

import { ProductCommon, ProductId, ProductTimestamps, ProductUpdate, SelectProductAmountProps, SelectProductListProps, SelectProductProps } from "@actions/types/Product";
import { z, ZodString, ZodType } from "zod";

// ========================== //
// ==== Zod Schema Types ==== //
// ========================== //

export const productIdSchema: ZodString = z.string().nanoid();

export const productIdObjectSchema: ZodType<ProductId> = z.object({
    id: z.string().nanoid(),
});

export const productCommonSchema: ZodType<ProductCommon> = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    stock: z.number(),
    vendorId: z.string(),
    categoryId: z.string(),
});

export const productTimestampsSchema: ZodType<ProductTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const productUpdateSchema: ZodType<ProductUpdate> = z.object({
    id: productIdSchema,
    data: productCommonSchema,
});

// ============================ //
// ==== Zod Select Schemas ==== //
// ============================ //

export const selectProductObjectSchema: ZodType<SelectProductProps> = z.object({
    where: z.object({
        id: productIdSchema,
        name: z.string().optional(),
    }),
});

export const selectProductListSchema: ZodType<SelectProductListProps> = z.object({
    orderBy: z
        .object({
            price: z.enum(["asc", "desc"]),
        })
        .optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: z
        .object({
            categoryId: z.string().optional(),
            name: z
                .object({
                    contains: z.string(),
                })
                .optional(),
        })
        .optional(),
});

export const selectProductAmountSchema: ZodType<SelectProductAmountProps> = z.object({
    where: z
        .object({
            categoryId: z.string().optional(),
            name: z
                .object({
                    contains: z.string(),
                })
                .optional(),
        })
        .optional(),
});
