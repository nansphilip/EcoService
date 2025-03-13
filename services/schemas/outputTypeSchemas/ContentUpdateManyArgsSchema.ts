import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ContentUpdateManyMutationInputSchema } from '../inputTypeSchemas/ContentUpdateManyMutationInputSchema'
import { ContentUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ContentUncheckedUpdateManyInputSchema'
import { ContentWhereInputSchema } from '../inputTypeSchemas/ContentWhereInputSchema'

export const ContentUpdateManyArgsSchema: z.ZodType<Prisma.ContentUpdateManyArgs> = z.object({
  data: z.union([ ContentUpdateManyMutationInputSchema,ContentUncheckedUpdateManyInputSchema ]),
  where: ContentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ContentUpdateManyArgsSchema;
