import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DoItYourselfWhereInputSchema } from '../inputTypeSchemas/DoItYourselfWhereInputSchema'
import { DoItYourselfOrderByWithAggregationInputSchema } from '../inputTypeSchemas/DoItYourselfOrderByWithAggregationInputSchema'
import { DoItYourselfScalarFieldEnumSchema } from '../inputTypeSchemas/DoItYourselfScalarFieldEnumSchema'
import { DoItYourselfScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/DoItYourselfScalarWhereWithAggregatesInputSchema'

export const DoItYourselfGroupByArgsSchema: z.ZodType<Prisma.DoItYourselfGroupByArgs> = z.object({
  where: DoItYourselfWhereInputSchema.optional(),
  orderBy: z.union([ DoItYourselfOrderByWithAggregationInputSchema.array(),DoItYourselfOrderByWithAggregationInputSchema ]).optional(),
  by: DoItYourselfScalarFieldEnumSchema.array(),
  having: DoItYourselfScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default DoItYourselfGroupByArgsSchema;
