import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ContentCreateManyInputSchema } from '../inputTypeSchemas/ContentCreateManyInputSchema'

export const ContentCreateManyArgsSchema: z.ZodType<Prisma.ContentCreateManyArgs> = z.object({
  data: z.union([ ContentCreateManyInputSchema,ContentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default ContentCreateManyArgsSchema;
