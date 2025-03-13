import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentCreateWithoutArticleInputSchema } from './ContentCreateWithoutArticleInputSchema';
import { ContentUncheckedCreateWithoutArticleInputSchema } from './ContentUncheckedCreateWithoutArticleInputSchema';
import { ContentCreateOrConnectWithoutArticleInputSchema } from './ContentCreateOrConnectWithoutArticleInputSchema';
import { ContentCreateManyArticleInputEnvelopeSchema } from './ContentCreateManyArticleInputEnvelopeSchema';
import { ContentWhereUniqueInputSchema } from './ContentWhereUniqueInputSchema';

export const ContentUncheckedCreateNestedManyWithoutArticleInputSchema: z.ZodType<Prisma.ContentUncheckedCreateNestedManyWithoutArticleInput> = z.object({
  create: z.union([ z.lazy(() => ContentCreateWithoutArticleInputSchema),z.lazy(() => ContentCreateWithoutArticleInputSchema).array(),z.lazy(() => ContentUncheckedCreateWithoutArticleInputSchema),z.lazy(() => ContentUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutArticleInputSchema),z.lazy(() => ContentCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyArticleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ContentUncheckedCreateNestedManyWithoutArticleInputSchema;
