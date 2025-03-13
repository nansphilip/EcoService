import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentWhereUniqueInputSchema } from './ContentWhereUniqueInputSchema';
import { ContentCreateWithoutArticleInputSchema } from './ContentCreateWithoutArticleInputSchema';
import { ContentUncheckedCreateWithoutArticleInputSchema } from './ContentUncheckedCreateWithoutArticleInputSchema';

export const ContentCreateOrConnectWithoutArticleInputSchema: z.ZodType<Prisma.ContentCreateOrConnectWithoutArticleInput> = z.object({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContentCreateWithoutArticleInputSchema),z.lazy(() => ContentUncheckedCreateWithoutArticleInputSchema) ]),
}).strict();

export default ContentCreateOrConnectWithoutArticleInputSchema;
