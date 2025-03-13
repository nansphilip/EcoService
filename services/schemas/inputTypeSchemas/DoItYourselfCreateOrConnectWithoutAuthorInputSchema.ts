import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfWhereUniqueInputSchema } from './DoItYourselfWhereUniqueInputSchema';
import { DoItYourselfCreateWithoutAuthorInputSchema } from './DoItYourselfCreateWithoutAuthorInputSchema';
import { DoItYourselfUncheckedCreateWithoutAuthorInputSchema } from './DoItYourselfUncheckedCreateWithoutAuthorInputSchema';

export const DoItYourselfCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.DoItYourselfCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => DoItYourselfWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DoItYourselfCreateWithoutAuthorInputSchema),z.lazy(() => DoItYourselfUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export default DoItYourselfCreateOrConnectWithoutAuthorInputSchema;
