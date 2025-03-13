import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FruitCreateManyInputSchema } from '../inputTypeSchemas/FruitCreateManyInputSchema'

export const FruitCreateManyArgsSchema: z.ZodType<Prisma.FruitCreateManyArgs> = z.object({
  data: z.union([ FruitCreateManyInputSchema,FruitCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default FruitCreateManyArgsSchema;
