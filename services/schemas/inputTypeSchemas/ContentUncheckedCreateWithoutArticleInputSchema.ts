import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ContentUncheckedCreateWithoutArticleInputSchema: z.ZodType<Prisma.ContentUncheckedCreateWithoutArticleInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  image: z.string(),
  doItYourselfId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ContentUncheckedCreateWithoutArticleInputSchema;
