import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ContentWhereInputSchema } from '../inputTypeSchemas/ContentWhereInputSchema'
import { ContentOrderByWithRelationInputSchema } from '../inputTypeSchemas/ContentOrderByWithRelationInputSchema'
import { ContentWhereUniqueInputSchema } from '../inputTypeSchemas/ContentWhereUniqueInputSchema'

export const ContentAggregateArgsSchema: z.ZodType<Prisma.ContentAggregateArgs> = z.object({
  where: ContentWhereInputSchema.optional(),
  orderBy: z.union([ ContentOrderByWithRelationInputSchema.array(),ContentOrderByWithRelationInputSchema ]).optional(),
  cursor: ContentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default ContentAggregateArgsSchema;
