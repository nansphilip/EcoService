import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FruitWhereInputSchema } from '../inputTypeSchemas/FruitWhereInputSchema'
import { FruitOrderByWithRelationInputSchema } from '../inputTypeSchemas/FruitOrderByWithRelationInputSchema'
import { FruitWhereUniqueInputSchema } from '../inputTypeSchemas/FruitWhereUniqueInputSchema'

export const FruitAggregateArgsSchema: z.ZodType<Prisma.FruitAggregateArgs> = z.object({
  where: FruitWhereInputSchema.optional(),
  orderBy: z.union([ FruitOrderByWithRelationInputSchema.array(),FruitOrderByWithRelationInputSchema ]).optional(),
  cursor: FruitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default FruitAggregateArgsSchema;
