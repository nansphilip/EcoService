import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleScalarWhereInputSchema } from './ArticleScalarWhereInputSchema';
import { ArticleUpdateManyMutationInputSchema } from './ArticleUpdateManyMutationInputSchema';
import { ArticleUncheckedUpdateManyWithoutAuthorInputSchema } from './ArticleUncheckedUpdateManyWithoutAuthorInputSchema';

export const ArticleUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.ArticleUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => ArticleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ArticleUpdateManyMutationInputSchema),z.lazy(() => ArticleUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export default ArticleUpdateManyWithWhereWithoutAuthorInputSchema;
