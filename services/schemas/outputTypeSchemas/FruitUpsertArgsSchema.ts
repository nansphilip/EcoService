import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FruitWhereUniqueInputSchema } from '../inputTypeSchemas/FruitWhereUniqueInputSchema'
import { FruitCreateInputSchema } from '../inputTypeSchemas/FruitCreateInputSchema'
import { FruitUncheckedCreateInputSchema } from '../inputTypeSchemas/FruitUncheckedCreateInputSchema'
import { FruitUpdateInputSchema } from '../inputTypeSchemas/FruitUpdateInputSchema'
import { FruitUncheckedUpdateInputSchema } from '../inputTypeSchemas/FruitUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FruitSelectSchema: z.ZodType<Prisma.FruitSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export const FruitUpsertArgsSchema: z.ZodType<Prisma.FruitUpsertArgs> = z.object({
  select: FruitSelectSchema.optional(),
  where: FruitWhereUniqueInputSchema,
  create: z.union([ FruitCreateInputSchema,FruitUncheckedCreateInputSchema ]),
  update: z.union([ FruitUpdateInputSchema,FruitUncheckedUpdateInputSchema ]),
}).strict() ;

export default FruitUpsertArgsSchema;
