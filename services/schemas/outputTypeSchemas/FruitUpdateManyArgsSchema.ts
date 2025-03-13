import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FruitUpdateManyMutationInputSchema } from '../inputTypeSchemas/FruitUpdateManyMutationInputSchema'
import { FruitUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/FruitUncheckedUpdateManyInputSchema'
import { FruitWhereInputSchema } from '../inputTypeSchemas/FruitWhereInputSchema'

export const FruitUpdateManyArgsSchema: z.ZodType<Prisma.FruitUpdateManyArgs> = z.object({
  data: z.union([ FruitUpdateManyMutationInputSchema,FruitUncheckedUpdateManyInputSchema ]),
  where: FruitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default FruitUpdateManyArgsSchema;
