import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleWhereInputSchema } from './ArticleWhereInputSchema';
import { ArticleUpdateWithoutContentInputSchema } from './ArticleUpdateWithoutContentInputSchema';
import { ArticleUncheckedUpdateWithoutContentInputSchema } from './ArticleUncheckedUpdateWithoutContentInputSchema';

export const ArticleUpdateToOneWithWhereWithoutContentInputSchema: z.ZodType<Prisma.ArticleUpdateToOneWithWhereWithoutContentInput> = z.object({
  where: z.lazy(() => ArticleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ArticleUpdateWithoutContentInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutContentInputSchema) ]),
}).strict();

export default ArticleUpdateToOneWithWhereWithoutContentInputSchema;
