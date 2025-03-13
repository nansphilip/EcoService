import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleWhereUniqueInputSchema } from './ArticleWhereUniqueInputSchema';
import { ArticleCreateWithoutContentInputSchema } from './ArticleCreateWithoutContentInputSchema';
import { ArticleUncheckedCreateWithoutContentInputSchema } from './ArticleUncheckedCreateWithoutContentInputSchema';

export const ArticleCreateOrConnectWithoutContentInputSchema: z.ZodType<Prisma.ArticleCreateOrConnectWithoutContentInput> = z.object({
  where: z.lazy(() => ArticleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ArticleCreateWithoutContentInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutContentInputSchema) ]),
}).strict();

export default ArticleCreateOrConnectWithoutContentInputSchema;
