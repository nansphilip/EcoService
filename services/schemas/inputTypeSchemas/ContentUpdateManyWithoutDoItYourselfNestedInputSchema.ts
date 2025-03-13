import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentCreateWithoutDoItYourselfInputSchema } from './ContentCreateWithoutDoItYourselfInputSchema';
import { ContentUncheckedCreateWithoutDoItYourselfInputSchema } from './ContentUncheckedCreateWithoutDoItYourselfInputSchema';
import { ContentCreateOrConnectWithoutDoItYourselfInputSchema } from './ContentCreateOrConnectWithoutDoItYourselfInputSchema';
import { ContentUpsertWithWhereUniqueWithoutDoItYourselfInputSchema } from './ContentUpsertWithWhereUniqueWithoutDoItYourselfInputSchema';
import { ContentCreateManyDoItYourselfInputEnvelopeSchema } from './ContentCreateManyDoItYourselfInputEnvelopeSchema';
import { ContentWhereUniqueInputSchema } from './ContentWhereUniqueInputSchema';
import { ContentUpdateWithWhereUniqueWithoutDoItYourselfInputSchema } from './ContentUpdateWithWhereUniqueWithoutDoItYourselfInputSchema';
import { ContentUpdateManyWithWhereWithoutDoItYourselfInputSchema } from './ContentUpdateManyWithWhereWithoutDoItYourselfInputSchema';
import { ContentScalarWhereInputSchema } from './ContentScalarWhereInputSchema';

export const ContentUpdateManyWithoutDoItYourselfNestedInputSchema: z.ZodType<Prisma.ContentUpdateManyWithoutDoItYourselfNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContentCreateWithoutDoItYourselfInputSchema),z.lazy(() => ContentCreateWithoutDoItYourselfInputSchema).array(),z.lazy(() => ContentUncheckedCreateWithoutDoItYourselfInputSchema),z.lazy(() => ContentUncheckedCreateWithoutDoItYourselfInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutDoItYourselfInputSchema),z.lazy(() => ContentCreateOrConnectWithoutDoItYourselfInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContentUpsertWithWhereUniqueWithoutDoItYourselfInputSchema),z.lazy(() => ContentUpsertWithWhereUniqueWithoutDoItYourselfInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyDoItYourselfInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContentUpdateWithWhereUniqueWithoutDoItYourselfInputSchema),z.lazy(() => ContentUpdateWithWhereUniqueWithoutDoItYourselfInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContentUpdateManyWithWhereWithoutDoItYourselfInputSchema),z.lazy(() => ContentUpdateManyWithWhereWithoutDoItYourselfInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContentScalarWhereInputSchema),z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ContentUpdateManyWithoutDoItYourselfNestedInputSchema;
