import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleWhereUniqueInputSchema } from './ArticleWhereUniqueInputSchema';
import { ArticleCreateWithoutAuthorInputSchema } from './ArticleCreateWithoutAuthorInputSchema';
import { ArticleUncheckedCreateWithoutAuthorInputSchema } from './ArticleUncheckedCreateWithoutAuthorInputSchema';

export const ArticleCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArticleCreateWithoutAuthorInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export default ArticleCreateOrConnectWithoutAuthorInputSchema;
