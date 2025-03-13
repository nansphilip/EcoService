import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfCreateWithoutContentInputSchema } from './DoItYourselfCreateWithoutContentInputSchema';
import { DoItYourselfUncheckedCreateWithoutContentInputSchema } from './DoItYourselfUncheckedCreateWithoutContentInputSchema';
import { DoItYourselfCreateOrConnectWithoutContentInputSchema } from './DoItYourselfCreateOrConnectWithoutContentInputSchema';
import { DoItYourselfWhereUniqueInputSchema } from './DoItYourselfWhereUniqueInputSchema';

export const DoItYourselfCreateNestedOneWithoutContentInputSchema: z.ZodType<Prisma.DoItYourselfCreateNestedOneWithoutContentInput> = z.object({
  create: z.union([ z.lazy(() => DoItYourselfCreateWithoutContentInputSchema),z.lazy(() => DoItYourselfUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DoItYourselfCreateOrConnectWithoutContentInputSchema).optional(),
  connect: z.lazy(() => DoItYourselfWhereUniqueInputSchema).optional()
}).strict();

export default DoItYourselfCreateNestedOneWithoutContentInputSchema;
