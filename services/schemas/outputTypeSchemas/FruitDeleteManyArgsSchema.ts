import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FruitWhereInputSchema } from '../inputTypeSchemas/FruitWhereInputSchema'

export const FruitDeleteManyArgsSchema: z.ZodType<Prisma.FruitDeleteManyArgs> = z.object({
  where: FruitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default FruitDeleteManyArgsSchema;
