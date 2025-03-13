import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentCreateNestedManyWithoutArticleInputSchema } from './ContentCreateNestedManyWithoutArticleInputSchema';

export const ArticleCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutArticleInputSchema).optional()
}).strict();

export default ArticleCreateWithoutAuthorInputSchema;
