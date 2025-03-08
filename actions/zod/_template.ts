/**
 * Schémas de validation Zod pour ModelName
 * 
 * Ce fichier contient les schémas de validation Zod pour le modèle ModelName.
 * Il est généré automatiquement et peut être modifié manuellement si nécessaire.
 */

import { z } from "zod";

// ========================== //
// ==== Zod Schema Types ==== //
// ========================== //

export const modelNameIdSchema = z.string().nanoid();

export const modelNameIdObjectSchema = z.object({
    id: z.string().nanoid(),
});

export const modelNameCommonSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().nullable(),
    // Ajouter tous les champs requis du modèle
});

export const modelNameTimestampsSchema = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const modelNameUpdateSchema = z.object({
    id: modelNameIdSchema,
    data: modelNameCommonSchema,
});

// ========================== //
// ==== Select Schemas ====== //
// ========================== //

export const selectModelNameSchema = z.object({
    where: z.object({
        id: z.string(),
    }),
});

export const selectModelNameListSchema = z.object({
    orderBy: z
        .object({
            createdAt: z.enum(["asc", "desc"]),
        })
        .optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    where: z
        .object({
            // Définir les options de filtrage pour la liste
            // Exemple :
            // name: z.object({
            //     contains: z.string(),
            // }).optional(),
        })
        .optional(),
});

export const selectModelNameAmountSchema = z.object({
    where: z
        .object({
            // Définir les options de filtrage pour le comptage
            // Exemple :
            // name: z.object({
            //     contains: z.string(),
            // }).optional(),
        })
        .optional(),
}); 