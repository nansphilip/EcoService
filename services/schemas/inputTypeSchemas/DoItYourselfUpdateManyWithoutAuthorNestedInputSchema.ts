import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfCreateWithoutAuthorInputSchema } from './DoItYourselfCreateWithoutAuthorInputSchema';
import { DoItYourselfUncheckedCreateWithoutAuthorInputSchema } from './DoItYourselfUncheckedCreateWithoutAuthorInputSchema';
import { DoItYourselfCreateOrConnectWithoutAuthorInputSchema } from './DoItYourselfCreateOrConnectWithoutAuthorInputSchema';
import { DoItYourselfUpsertWithWhereUniqueWithoutAuthorInputSchema } from './DoItYourselfUpsertWithWhereUniqueWithoutAuthorInputSchema';
import { DoItYourselfCreateManyAuthorInputEnvelopeSchema } from './DoItYourselfCreateManyAuthorInputEnvelopeSchema';
import { DoItYourselfWhereUniqueInputSchema } from './DoItYourselfWhereUniqueInputSchema';
import { DoItYourselfUpdateWithWhereUniqueWithoutAuthorInputSchema } from './DoItYourselfUpdateWithWhereUniqueWithoutAuthorInputSchema';
import { DoItYourselfUpdateManyWithWhereWithoutAuthorInputSchema } from './DoItYourselfUpdateManyWithWhereWithoutAuthorInputSchema';
import { DoItYourselfScalarWhereInputSchema } from './DoItYourselfScalarWhereInputSchema';

export const DoItYourselfUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.DoItYourselfUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => DoItYourselfCreateWithoutAuthorInputSchema),z.lazy(() => DoItYourselfCreateWithoutAuthorInputSchema).array(),z.lazy(() => DoItYourselfUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => DoItYourselfUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DoItYourselfCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => DoItYourselfCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DoItYourselfUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => DoItYourselfUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DoItYourselfCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DoItYourselfWhereUniqueInputSchema),z.lazy(() => DoItYourselfWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DoItYourselfWhereUniqueInputSchema),z.lazy(() => DoItYourselfWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DoItYourselfWhereUniqueInputSchema),z.lazy(() => DoItYourselfWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DoItYourselfWhereUniqueInputSchema),z.lazy(() => DoItYourselfWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DoItYourselfUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => DoItYourselfUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DoItYourselfUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => DoItYourselfUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DoItYourselfScalarWhereInputSchema),z.lazy(() => DoItYourselfScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default DoItYourselfUpdateManyWithoutAuthorNestedInputSchema;
