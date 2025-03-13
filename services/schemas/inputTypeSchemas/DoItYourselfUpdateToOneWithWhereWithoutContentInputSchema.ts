import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfWhereInputSchema } from './DoItYourselfWhereInputSchema';
import { DoItYourselfUpdateWithoutContentInputSchema } from './DoItYourselfUpdateWithoutContentInputSchema';
import { DoItYourselfUncheckedUpdateWithoutContentInputSchema } from './DoItYourselfUncheckedUpdateWithoutContentInputSchema';

export const DoItYourselfUpdateToOneWithWhereWithoutContentInputSchema: z.ZodType<Prisma.DoItYourselfUpdateToOneWithWhereWithoutContentInput> = z.object({
  where: z.lazy(() => DoItYourselfWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DoItYourselfUpdateWithoutContentInputSchema),z.lazy(() => DoItYourselfUncheckedUpdateWithoutContentInputSchema) ]),
}).strict();

export default DoItYourselfUpdateToOneWithWhereWithoutContentInputSchema;
