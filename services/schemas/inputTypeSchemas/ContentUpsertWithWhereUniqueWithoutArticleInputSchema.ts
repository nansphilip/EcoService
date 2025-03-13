import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentWhereUniqueInputSchema } from './ContentWhereUniqueInputSchema';
import { ContentUpdateWithoutArticleInputSchema } from './ContentUpdateWithoutArticleInputSchema';
import { ContentUncheckedUpdateWithoutArticleInputSchema } from './ContentUncheckedUpdateWithoutArticleInputSchema';
import { ContentCreateWithoutArticleInputSchema } from './ContentCreateWithoutArticleInputSchema';
import { ContentUncheckedCreateWithoutArticleInputSchema } from './ContentUncheckedCreateWithoutArticleInputSchema';

export const ContentUpsertWithWhereUniqueWithoutArticleInputSchema: z.ZodType<Prisma.ContentUpsertWithWhereUniqueWithoutArticleInput> = z.object({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContentUpdateWithoutArticleInputSchema),z.lazy(() => ContentUncheckedUpdateWithoutArticleInputSchema) ]),
  create: z.union([ z.lazy(() => ContentCreateWithoutArticleInputSchema),z.lazy(() => ContentUncheckedCreateWithoutArticleInputSchema) ]),
}).strict();

export default ContentUpsertWithWhereUniqueWithoutArticleInputSchema;
