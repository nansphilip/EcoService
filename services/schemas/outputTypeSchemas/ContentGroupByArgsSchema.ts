import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ContentWhereInputSchema } from '../inputTypeSchemas/ContentWhereInputSchema'
import { ContentOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ContentOrderByWithAggregationInputSchema'
import { ContentScalarFieldEnumSchema } from '../inputTypeSchemas/ContentScalarFieldEnumSchema'
import { ContentScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ContentScalarWhereWithAggregatesInputSchema'

export const ContentGroupByArgsSchema: z.ZodType<Prisma.ContentGroupByArgs> = z.object({
  where: ContentWhereInputSchema.optional(),
  orderBy: z.union([ ContentOrderByWithAggregationInputSchema.array(),ContentOrderByWithAggregationInputSchema ]).optional(),
  by: ContentScalarFieldEnumSchema.array(),
  having: ContentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ContentGroupByArgsSchema;
