import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentScalarWhereInputSchema } from './ContentScalarWhereInputSchema';
import { ContentUpdateManyMutationInputSchema } from './ContentUpdateManyMutationInputSchema';
import { ContentUncheckedUpdateManyWithoutArticleInputSchema } from './ContentUncheckedUpdateManyWithoutArticleInputSchema';

export const ContentUpdateManyWithWhereWithoutArticleInputSchema: z.ZodType<Prisma.ContentUpdateManyWithWhereWithoutArticleInput> = z.object({
  where: z.lazy(() => ContentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContentUpdateManyMutationInputSchema),z.lazy(() => ContentUncheckedUpdateManyWithoutArticleInputSchema) ]),
}).strict();

export default ContentUpdateManyWithWhereWithoutArticleInputSchema;
