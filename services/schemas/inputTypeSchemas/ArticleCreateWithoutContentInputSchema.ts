import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutArticleInputSchema } from './UserCreateNestedOneWithoutArticleInputSchema';

export const ArticleCreateWithoutContentInputSchema: z.ZodType<Prisma.ArticleCreateWithoutContentInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Author: z.lazy(() => UserCreateNestedOneWithoutArticleInputSchema)
}).strict();

export default ArticleCreateWithoutContentInputSchema;
