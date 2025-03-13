import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfWhereUniqueInputSchema } from './DoItYourselfWhereUniqueInputSchema';
import { DoItYourselfUpdateWithoutAuthorInputSchema } from './DoItYourselfUpdateWithoutAuthorInputSchema';
import { DoItYourselfUncheckedUpdateWithoutAuthorInputSchema } from './DoItYourselfUncheckedUpdateWithoutAuthorInputSchema';

export const DoItYourselfUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.DoItYourselfUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => DoItYourselfWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DoItYourselfUpdateWithoutAuthorInputSchema),z.lazy(() => DoItYourselfUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export default DoItYourselfUpdateWithWhereUniqueWithoutAuthorInputSchema;
