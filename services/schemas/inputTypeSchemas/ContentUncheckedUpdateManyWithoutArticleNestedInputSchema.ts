import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentCreateWithoutArticleInputSchema } from './ContentCreateWithoutArticleInputSchema';
import { ContentUncheckedCreateWithoutArticleInputSchema } from './ContentUncheckedCreateWithoutArticleInputSchema';
import { ContentCreateOrConnectWithoutArticleInputSchema } from './ContentCreateOrConnectWithoutArticleInputSchema';
import { ContentUpsertWithWhereUniqueWithoutArticleInputSchema } from './ContentUpsertWithWhereUniqueWithoutArticleInputSchema';
import { ContentCreateManyArticleInputEnvelopeSchema } from './ContentCreateManyArticleInputEnvelopeSchema';
import { ContentWhereUniqueInputSchema } from './ContentWhereUniqueInputSchema';
import { ContentUpdateWithWhereUniqueWithoutArticleInputSchema } from './ContentUpdateWithWhereUniqueWithoutArticleInputSchema';
import { ContentUpdateManyWithWhereWithoutArticleInputSchema } from './ContentUpdateManyWithWhereWithoutArticleInputSchema';
import { ContentScalarWhereInputSchema } from './ContentScalarWhereInputSchema';

export const ContentUncheckedUpdateManyWithoutArticleNestedInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateManyWithoutArticleNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContentCreateWithoutArticleInputSchema),z.lazy(() => ContentCreateWithoutArticleInputSchema).array(),z.lazy(() => ContentUncheckedCreateWithoutArticleInputSchema),z.lazy(() => ContentUncheckedCreateWithoutArticleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutArticleInputSchema),z.lazy(() => ContentCreateOrConnectWithoutArticleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContentUpsertWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => ContentUpsertWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyArticleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContentUpdateWithWhereUniqueWithoutArticleInputSchema),z.lazy(() => ContentUpdateWithWhereUniqueWithoutArticleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContentUpdateManyWithWhereWithoutArticleInputSchema),z.lazy(() => ContentUpdateManyWithWhereWithoutArticleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContentScalarWhereInputSchema),z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ContentUncheckedUpdateManyWithoutArticleNestedInputSchema;
