import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentWhereUniqueInputSchema } from './ContentWhereUniqueInputSchema';
import { ContentUpdateWithoutArticleInputSchema } from './ContentUpdateWithoutArticleInputSchema';
import { ContentUncheckedUpdateWithoutArticleInputSchema } from './ContentUncheckedUpdateWithoutArticleInputSchema';

export const ContentUpdateWithWhereUniqueWithoutArticleInputSchema: z.ZodType<Prisma.ContentUpdateWithWhereUniqueWithoutArticleInput> = z.object({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContentUpdateWithoutArticleInputSchema),z.lazy(() => ContentUncheckedUpdateWithoutArticleInputSchema) ]),
}).strict();

export default ContentUpdateWithWhereUniqueWithoutArticleInputSchema;
