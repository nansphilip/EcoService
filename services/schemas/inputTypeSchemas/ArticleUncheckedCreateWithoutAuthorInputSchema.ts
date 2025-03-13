import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentUncheckedCreateNestedManyWithoutArticleInputSchema } from './ContentUncheckedCreateNestedManyWithoutArticleInputSchema';

export const ArticleUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export default ArticleUncheckedCreateWithoutAuthorInputSchema;
