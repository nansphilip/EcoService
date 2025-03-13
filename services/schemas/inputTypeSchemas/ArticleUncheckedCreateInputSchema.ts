import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentUncheckedCreateNestedManyWithoutArticleInputSchema } from './ContentUncheckedCreateNestedManyWithoutArticleInputSchema';

export const ArticleUncheckedCreateInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export default ArticleUncheckedCreateInputSchema;
