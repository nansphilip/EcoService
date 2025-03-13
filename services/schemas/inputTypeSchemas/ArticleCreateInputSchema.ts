import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentCreateNestedManyWithoutArticleInputSchema } from './ContentCreateNestedManyWithoutArticleInputSchema';
import { UserCreateNestedOneWithoutArticleInputSchema } from './UserCreateNestedOneWithoutArticleInputSchema';

export const ArticleCreateInputSchema: z.ZodType<Prisma.ArticleCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutArticleInputSchema).optional(),
  Author: z.lazy(() => UserCreateNestedOneWithoutArticleInputSchema)
}).strict();

export default ArticleCreateInputSchema;
