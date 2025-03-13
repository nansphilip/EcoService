import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ContentCreateManyInputSchema: z.ZodType<Prisma.ContentCreateManyInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  image: z.string(),
  articleId: z.string().optional().nullable(),
  doItYourselfId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ContentCreateManyInputSchema;
