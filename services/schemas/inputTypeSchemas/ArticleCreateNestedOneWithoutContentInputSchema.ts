import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleCreateWithoutContentInputSchema } from './ArticleCreateWithoutContentInputSchema';
import { ArticleUncheckedCreateWithoutContentInputSchema } from './ArticleUncheckedCreateWithoutContentInputSchema';
import { ArticleCreateOrConnectWithoutContentInputSchema } from './ArticleCreateOrConnectWithoutContentInputSchema';
import { ArticleWhereUniqueInputSchema } from './ArticleWhereUniqueInputSchema';

export const ArticleCreateNestedOneWithoutContentInputSchema: z.ZodType<Prisma.ArticleCreateNestedOneWithoutContentInput> = z.object({
  create: z.union([ z.lazy(() => ArticleCreateWithoutContentInputSchema),z.lazy(() => ArticleUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ArticleCreateOrConnectWithoutContentInputSchema).optional(),
  connect: z.lazy(() => ArticleWhereUniqueInputSchema).optional()
}).strict();

export default ArticleCreateNestedOneWithoutContentInputSchema;
