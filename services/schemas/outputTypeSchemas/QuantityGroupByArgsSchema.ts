import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuantityWhereInputSchema } from '../inputTypeSchemas/QuantityWhereInputSchema'
import { QuantityOrderByWithAggregationInputSchema } from '../inputTypeSchemas/QuantityOrderByWithAggregationInputSchema'
import { QuantityScalarFieldEnumSchema } from '../inputTypeSchemas/QuantityScalarFieldEnumSchema'
import { QuantityScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/QuantityScalarWhereWithAggregatesInputSchema'

export const QuantityGroupByArgsSchema: z.ZodType<Prisma.QuantityGroupByArgs> = z.object({
  where: QuantityWhereInputSchema.optional(),
  orderBy: z.union([ QuantityOrderByWithAggregationInputSchema.array(),QuantityOrderByWithAggregationInputSchema ]).optional(),
  by: QuantityScalarFieldEnumSchema.array(),
  having: QuantityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default QuantityGroupByArgsSchema;
