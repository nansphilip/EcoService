import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfWhereUniqueInputSchema } from './DoItYourselfWhereUniqueInputSchema';
import { DoItYourselfCreateWithoutContentInputSchema } from './DoItYourselfCreateWithoutContentInputSchema';
import { DoItYourselfUncheckedCreateWithoutContentInputSchema } from './DoItYourselfUncheckedCreateWithoutContentInputSchema';

export const DoItYourselfCreateOrConnectWithoutContentInputSchema: z.ZodType<Prisma.DoItYourselfCreateOrConnectWithoutContentInput> = z.object({
  where: z.lazy(() => DoItYourselfWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DoItYourselfCreateWithoutContentInputSchema),z.lazy(() => DoItYourselfUncheckedCreateWithoutContentInputSchema) ]),
}).strict();

export default DoItYourselfCreateOrConnectWithoutContentInputSchema;
