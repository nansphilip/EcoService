import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ArticleUncheckedCreateWithoutContentInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutContentInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default ArticleUncheckedCreateWithoutContentInputSchema;
