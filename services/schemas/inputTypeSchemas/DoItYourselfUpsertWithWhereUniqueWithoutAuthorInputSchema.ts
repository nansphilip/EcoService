import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfWhereUniqueInputSchema } from './DoItYourselfWhereUniqueInputSchema';
import { DoItYourselfUpdateWithoutAuthorInputSchema } from './DoItYourselfUpdateWithoutAuthorInputSchema';
import { DoItYourselfUncheckedUpdateWithoutAuthorInputSchema } from './DoItYourselfUncheckedUpdateWithoutAuthorInputSchema';
import { DoItYourselfCreateWithoutAuthorInputSchema } from './DoItYourselfCreateWithoutAuthorInputSchema';
import { DoItYourselfUncheckedCreateWithoutAuthorInputSchema } from './DoItYourselfUncheckedCreateWithoutAuthorInputSchema';

export const DoItYourselfUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.DoItYourselfUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => DoItYourselfWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DoItYourselfUpdateWithoutAuthorInputSchema),z.lazy(() => DoItYourselfUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => DoItYourselfCreateWithoutAuthorInputSchema),z.lazy(() => DoItYourselfUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export default DoItYourselfUpsertWithWhereUniqueWithoutAuthorInputSchema;
