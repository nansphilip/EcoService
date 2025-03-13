import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleWhereUniqueInputSchema } from './ArticleWhereUniqueInputSchema';
import { ArticleUpdateWithoutAuthorInputSchema } from './ArticleUpdateWithoutAuthorInputSchema';
import { ArticleUncheckedUpdateWithoutAuthorInputSchema } from './ArticleUncheckedUpdateWithoutAuthorInputSchema';
import { ArticleCreateWithoutAuthorInputSchema } from './ArticleCreateWithoutAuthorInputSchema';
import { ArticleUncheckedCreateWithoutAuthorInputSchema } from './ArticleUncheckedCreateWithoutAuthorInputSchema';

export const ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ArticleUpdateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export default ArticleUpsertWithWhereUniqueWithoutAuthorInputSchema;
