import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FruitCreateInputSchema } from '../inputTypeSchemas/FruitCreateInputSchema'
import { FruitUncheckedCreateInputSchema } from '../inputTypeSchemas/FruitUncheckedCreateInputSchema'
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

export const FruitCreateArgsSchema: z.ZodType<Prisma.FruitCreateArgs> = z.object({
  select: FruitSelectSchema.optional(),
  data: z.union([ FruitCreateInputSchema,FruitUncheckedCreateInputSchema ]),
}).strict() ;

export default FruitCreateArgsSchema;
