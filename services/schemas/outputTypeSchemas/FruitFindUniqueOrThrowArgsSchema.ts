import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FruitWhereUniqueInputSchema } from '../inputTypeSchemas/FruitWhereUniqueInputSchema'
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

export const FruitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FruitFindUniqueOrThrowArgs> = z.object({
  select: FruitSelectSchema.optional(),
  where: FruitWhereUniqueInputSchema,
}).strict() ;

export default FruitFindUniqueOrThrowArgsSchema;
