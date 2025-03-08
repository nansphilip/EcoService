import { ModelName, Prisma } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================= //
// ==== ModelName Types ==== //
// ======================= //

/** Represents a complete ModelName entity */
export type ModelNameType = ModelName;

/** Represents the ModelName's unique identifier */
export type ModelNameId = Pick<ModelName, "id">;

/** Represents common ModelName properties without system-managed fields */
export type ModelNameCommon = Omit<ModelName, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a ModelName */
export type ModelNameUpdate = {
    id: ModelName["id"];
    data: ModelNameCommon;
};

/** Represents system-managed timestamp fields */
export type ModelNameTimestamps = Pick<ModelName, "createdAt" | "updatedAt">;

/** Find one options for ModelNames */
export type SelectModelNameProps = Pick<Prisma.ModelNameFindUniqueArgs, "where">;

/** Find many options for ModelNames */
export type SelectModelNameListProps = Pick<Prisma.ModelNameFindManyArgs, "orderBy" | "take" | "skip" | "where">;

/** Count options for ModelNames */
export type SelectModelNameAmountProps = Pick<Prisma.ModelNameCountArgs, "where">;

// ========================== //
// ==== Zod Schema Types ==== //
// ========================== //

export const modelNameIdSchema: ZodString = z.string().nanoid();

export const modelNameIdObjectSchema: ZodType<ModelNameId> = z.object({
    id: z.string().nanoid(),
});

export const modelNameCommonSchema: ZodType<ModelNameCommon> = z.object({
    // Définir ici les champs du modèle selon le schéma Prisma
    // Exemple :
    name: z.string(),
    description: z.string(),
    image: z.string().nullable(),
    // Ajouter tous les champs requis du modèle
});

export const modelNameTimestampsSchema: ZodType<ModelNameTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const modelNameUpdateSchema: ZodType<ModelNameUpdate> = z.object({
    id: modelNameIdSchema,
    data: modelNameCommonSchema,
});

// ============================ //
// ==== Zod Select Schemas ==== //
// ============================ //

export const selectModelNameObjectSchema: ZodType<SelectModelNameProps> = z.object({
    where: z.object({
        id: modelNameIdSchema,
        name: z.string().optional(),
        // Ajouter d'autres champs de filtrage si nécessaire
    }),
});

export const selectModelNameListSchema: ZodType<SelectModelNameListProps> = z.object({
    orderBy: z
        .object({
            // Définir les options de tri
            // Exemple :
            name: z.enum(["asc", "desc"]),
            // Ajouter d'autres champs de tri si nécessaire
        })
        .optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: z
        .object({
            // Définir les options de filtrage
            // Exemple :
            name: z
                .object({
                    contains: z.string(),
                })
                .optional(),
            // Ajouter d'autres champs de filtrage si nécessaire
        })
        .optional(),
});

export const selectModelNameAmountSchema: ZodType<SelectModelNameAmountProps> = z.object({
    where: z
        .object({
            // Définir les options de filtrage pour le comptage
            // Exemple :
            name: z
                .object({
                    contains: z.string(),
                })
                .optional(),
            // Ajouter d'autres champs de filtrage si nécessaire
        })
        .optional(),
}); 