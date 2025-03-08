/**
 * Schémas de validation Zod pour Order
 * 
 * Ce fichier contient les schémas de validation Zod pour le modèle Order.
 * Il est généré automatiquement et peut être modifié manuellement si nécessaire.
 */

import { OrderCommon, OrderId, OrderTimestamps, OrderUpdate, SelectOrderAmountProps, SelectOrderListProps } from "@actions/types/Order";
import { $Enums } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ========================== //
// ==== Zod Schema Types ==== //
// ========================== //

export const orderIdSchema: ZodString = z.string().nanoid();

export const orderIdObjectSchema: ZodType<OrderId> = z.object({
    id: z.string().nanoid(),
});

export const orderCommonSchema: ZodType<OrderCommon> = z.object({
    orderNumber: z.number(),
    orderStatus: z.nativeEnum($Enums.OrderStatus),
    paymentStatus: z.nativeEnum($Enums.PaymentStatus),
    userId: z.string(),
});

export const orderTimestampsSchema: ZodType<OrderTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const orderUpdateSchema: ZodType<OrderUpdate> = z.object({
    id: orderIdSchema,
    data: orderCommonSchema,
});

// ========================== //
// ==== Select Schemas ====== //
// ========================== //

export const selectOrderSchema = z.object({
    where: z.object({
        id: z.string(),
    }),
});

export const selectOrderListSchema: ZodType<SelectOrderListProps> = z.object({
    orderBy: z
        .object({
            createdAt: z.enum(["asc", "desc"]),
        })
        .optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});

export const selectOrderAmountSchema: ZodType<SelectOrderAmountProps> = z.object({
    where: z
        .object({
            // Types to validate
        })
        .optional(),
}); 