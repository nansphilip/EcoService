import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ContentUncheckedCreateWithoutDoItYourselfInputSchema: z.ZodType<Prisma.ContentUncheckedCreateWithoutDoItYourselfInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  image: z.string(),
  articleId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ContentUncheckedCreateWithoutDoItYourselfInputSchema;
