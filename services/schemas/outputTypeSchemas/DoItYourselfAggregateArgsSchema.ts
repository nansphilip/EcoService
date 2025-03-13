import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DoItYourselfWhereInputSchema } from '../inputTypeSchemas/DoItYourselfWhereInputSchema'
import { DoItYourselfOrderByWithRelationInputSchema } from '../inputTypeSchemas/DoItYourselfOrderByWithRelationInputSchema'
import { DoItYourselfWhereUniqueInputSchema } from '../inputTypeSchemas/DoItYourselfWhereUniqueInputSchema'

export const DoItYourselfAggregateArgsSchema: z.ZodType<Prisma.DoItYourselfAggregateArgs> = z.object({
  where: DoItYourselfWhereInputSchema.optional(),
  orderBy: z.union([ DoItYourselfOrderByWithRelationInputSchema.array(),DoItYourselfOrderByWithRelationInputSchema ]).optional(),
  cursor: DoItYourselfWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default DoItYourselfAggregateArgsSchema;
