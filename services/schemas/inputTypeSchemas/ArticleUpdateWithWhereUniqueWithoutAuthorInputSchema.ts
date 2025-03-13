import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleWhereUniqueInputSchema } from './ArticleWhereUniqueInputSchema';
import { ArticleUpdateWithoutAuthorInputSchema } from './ArticleUpdateWithoutAuthorInputSchema';
import { ArticleUncheckedUpdateWithoutAuthorInputSchema } from './ArticleUncheckedUpdateWithoutAuthorInputSchema';

export const ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export default ArticleUpdateWithWhereUniqueWithoutAuthorInputSchema;
