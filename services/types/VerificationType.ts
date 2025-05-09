// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { VerificationCreateArgsSchema, VerificationDeleteArgsSchema, VerificationFindManyArgsSchema, VerificationFindUniqueArgsSchema, VerificationOrderByWithRelationInputSchema, VerificationSchema, VerificationUpdateArgsSchema, VerificationUpsertArgsSchema, VerificationWhereInputSchema, VerificationWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type VerificationModel = z.infer<typeof VerificationSchema>;
export type VerificationCount = number;

// ============== Props Types ============== //

export type CreateVerificationProps = Prisma.VerificationCreateArgs;
export type UpsertVerificationProps = Prisma.VerificationUpsertArgs;
export type UpdateVerificationProps = Prisma.VerificationUpdateArgs;
export type DeleteVerificationProps = Prisma.VerificationDeleteArgs;
export type FindUniqueVerificationProps = Prisma.VerificationFindUniqueArgs;
export type FindManyVerificationProps = Prisma.VerificationFindManyArgs;
export type CountVerificationProps = Prisma.VerificationCountArgs;

// ============== Schema Types ============== //

export const createVerificationSchema: ZodType<CreateVerificationProps> = VerificationCreateArgsSchema;
export const upsertVerificationSchema: ZodType<UpsertVerificationProps> = VerificationUpsertArgsSchema;
export const updateVerificationSchema: ZodType<UpdateVerificationProps> = VerificationUpdateArgsSchema;
export const deleteVerificationSchema: ZodType<DeleteVerificationProps> = VerificationDeleteArgsSchema;
export const selectVerificationSchema: ZodType<FindUniqueVerificationProps> = VerificationFindUniqueArgsSchema;
export const selectManyVerificationSchema: ZodType<FindManyVerificationProps> = VerificationFindManyArgsSchema;
export const countVerificationSchema: ZodType<CountVerificationProps> =  z.object({
    where: z.lazy(() => VerificationWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => VerificationOrderByWithRelationInputSchema),
        z.array(z.lazy(() => VerificationOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => VerificationWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

export type CreateVerificationResponse<T extends CreateVerificationProps> = Prisma.VerificationGetPayload<T>;
export type UpsertVerificationResponse<T extends UpsertVerificationProps> = Prisma.VerificationGetPayload<T>;
export type UpdateVerificationResponse<T extends UpdateVerificationProps> = Prisma.VerificationGetPayload<T>;
export type DeleteVerificationResponse<T extends DeleteVerificationProps> = Prisma.VerificationGetPayload<T>;
export type FindUniqueVerificationResponse<T extends FindUniqueVerificationProps> = Prisma.VerificationGetPayload<T> | null;
export type FindManyVerificationResponse<T extends FindManyVerificationProps> = Prisma.VerificationGetPayload<T>[];
export type CountVerificationResponse = VerificationCount;
