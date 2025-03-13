import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleUpdateWithoutContentInputSchema } from './ArticleUpdateWithoutContentInputSchema';
import { ArticleUncheckedUpdateWithoutContentInputSchema } from './ArticleUncheckedUpdateWithoutContentInputSchema';
import { ArticleCreateWithoutContentInputSchema } from './ArticleCreateWithoutContentInputSchema';
import { ArticleUncheckedCreateWithoutContentInputSchema } from './ArticleUncheckedCreateWithoutContentInputSchema';
import { ArticleWhereInputSchema } from './ArticleWhereInputSchema';

export const ArticleUpsertWithoutContentInputSchema: z.ZodType<Prisma.ArticleUpsertWithoutContentInput> = z.object({
  update: z.union([ z.lazy(() => ArticleUpdateWithoutContentInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutContentInputSchema) ]),
  create: z.union([ z.lazy(() => ArticleCreateWithoutContentInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutContentInputSchema) ]),
  where: z.lazy(() => ArticleWhereInputSchema).optional()
}).strict();

export default ArticleUpsertWithoutContentInputSchema;
