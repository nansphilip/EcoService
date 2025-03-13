import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfCreateWithoutAuthorInputSchema } from './DoItYourselfCreateWithoutAuthorInputSchema';
import { DoItYourselfUncheckedCreateWithoutAuthorInputSchema } from './DoItYourselfUncheckedCreateWithoutAuthorInputSchema';
import { DoItYourselfCreateOrConnectWithoutAuthorInputSchema } from './DoItYourselfCreateOrConnectWithoutAuthorInputSchema';
import { DoItYourselfCreateManyAuthorInputEnvelopeSchema } from './DoItYourselfCreateManyAuthorInputEnvelopeSchema';
import { DoItYourselfWhereUniqueInputSchema } from './DoItYourselfWhereUniqueInputSchema';

export const DoItYourselfCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.DoItYourselfCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => DoItYourselfCreateWithoutAuthorInputSchema),z.lazy(() => DoItYourselfCreateWithoutAuthorInputSchema).array(),z.lazy(() => DoItYourselfUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => DoItYourselfUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DoItYourselfCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => DoItYourselfCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DoItYourselfCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DoItYourselfWhereUniqueInputSchema),z.lazy(() => DoItYourselfWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default DoItYourselfCreateNestedManyWithoutAuthorInputSchema;
