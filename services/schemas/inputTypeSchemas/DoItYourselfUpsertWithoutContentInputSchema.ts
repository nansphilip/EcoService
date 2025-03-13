import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfUpdateWithoutContentInputSchema } from './DoItYourselfUpdateWithoutContentInputSchema';
import { DoItYourselfUncheckedUpdateWithoutContentInputSchema } from './DoItYourselfUncheckedUpdateWithoutContentInputSchema';
import { DoItYourselfCreateWithoutContentInputSchema } from './DoItYourselfCreateWithoutContentInputSchema';
import { DoItYourselfUncheckedCreateWithoutContentInputSchema } from './DoItYourselfUncheckedCreateWithoutContentInputSchema';
import { DoItYourselfWhereInputSchema } from './DoItYourselfWhereInputSchema';

export const DoItYourselfUpsertWithoutContentInputSchema: z.ZodType<Prisma.DoItYourselfUpsertWithoutContentInput> = z.object({
  update: z.union([ z.lazy(() => DoItYourselfUpdateWithoutContentInputSchema),z.lazy(() => DoItYourselfUncheckedUpdateWithoutContentInputSchema) ]),
  create: z.union([ z.lazy(() => DoItYourselfCreateWithoutContentInputSchema),z.lazy(() => DoItYourselfUncheckedCreateWithoutContentInputSchema) ]),
  where: z.lazy(() => DoItYourselfWhereInputSchema).optional()
}).strict();

export default DoItYourselfUpsertWithoutContentInputSchema;
