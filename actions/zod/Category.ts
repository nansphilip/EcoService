/**
 * Schémas de validation Zod pour Category
 * 
 * Ce fichier contient les schémas de validation Zod pour le modèle Category.
 * Il est généré automatiquement et peut être modifié manuellement si nécessaire.
 */

import { CategoryCommon, CategoryId, CategoryTimestamps, CategoryUpdate, SelectCategoryAmountProps, SelectCategoryListProps, SelectCategoryProps } from "@actions/types/Category";
import { z, ZodString, ZodType } from "zod";

// ========================== //
// ==== Zod Schema Types ==== //
// ========================== //

export const categoryIdSchema: ZodString = z.string().nanoid();

export const categoryIdObjectSchema: ZodType<CategoryId> = z.object({
    id: z.string().nanoid(),
});

export const categoryCommonSchema: ZodType<CategoryCommon> = z.object({
    name: z.string(),
    description: z.string(),
});

export const categoryTimestampsSchema: ZodType<CategoryTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const categoryUpdateSchema: ZodType<CategoryUpdate> = z.object({
    id: categoryIdSchema,
    data: categoryCommonSchema,
});

// ============================ //
// ==== Zod Select Schemas ==== //
// ============================ //

export const selectCategoryObjectSchema: ZodType<SelectCategoryProps> = z.object({
    where: z.object({
        id: categoryIdSchema,
        name: z.string().optional(),
    }),
});

export const selectCategoryListSchema: ZodType<SelectCategoryListProps> = z.object({
    orderBy: z
        .object({
            name: z.enum(["asc", "desc"]),
        })
        .optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: z
        .object({
            name: z.string(),
        })
        .optional(),
});

export const selectCategoryAmountSchema: ZodType<SelectCategoryAmountProps> = z.object({
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});
