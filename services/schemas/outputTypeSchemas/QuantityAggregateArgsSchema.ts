import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuantityWhereInputSchema } from '../inputTypeSchemas/QuantityWhereInputSchema'
import { QuantityOrderByWithRelationInputSchema } from '../inputTypeSchemas/QuantityOrderByWithRelationInputSchema'
import { QuantityWhereUniqueInputSchema } from '../inputTypeSchemas/QuantityWhereUniqueInputSchema'

export const QuantityAggregateArgsSchema: z.ZodType<Prisma.QuantityAggregateArgs> = z.object({
  where: QuantityWhereInputSchema.optional(),
  orderBy: z.union([ QuantityOrderByWithRelationInputSchema.array(),QuantityOrderByWithRelationInputSchema ]).optional(),
  cursor: QuantityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default QuantityAggregateArgsSchema;
