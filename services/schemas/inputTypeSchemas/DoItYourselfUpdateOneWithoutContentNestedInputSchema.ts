import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfCreateWithoutContentInputSchema } from './DoItYourselfCreateWithoutContentInputSchema';
import { DoItYourselfUncheckedCreateWithoutContentInputSchema } from './DoItYourselfUncheckedCreateWithoutContentInputSchema';
import { DoItYourselfCreateOrConnectWithoutContentInputSchema } from './DoItYourselfCreateOrConnectWithoutContentInputSchema';
import { DoItYourselfUpsertWithoutContentInputSchema } from './DoItYourselfUpsertWithoutContentInputSchema';
import { DoItYourselfWhereInputSchema } from './DoItYourselfWhereInputSchema';
import { DoItYourselfWhereUniqueInputSchema } from './DoItYourselfWhereUniqueInputSchema';
import { DoItYourselfUpdateToOneWithWhereWithoutContentInputSchema } from './DoItYourselfUpdateToOneWithWhereWithoutContentInputSchema';
import { DoItYourselfUpdateWithoutContentInputSchema } from './DoItYourselfUpdateWithoutContentInputSchema';
import { DoItYourselfUncheckedUpdateWithoutContentInputSchema } from './DoItYourselfUncheckedUpdateWithoutContentInputSchema';

export const DoItYourselfUpdateOneWithoutContentNestedInputSchema: z.ZodType<Prisma.DoItYourselfUpdateOneWithoutContentNestedInput> = z.object({
  create: z.union([ z.lazy(() => DoItYourselfCreateWithoutContentInputSchema),z.lazy(() => DoItYourselfUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DoItYourselfCreateOrConnectWithoutContentInputSchema).optional(),
  upsert: z.lazy(() => DoItYourselfUpsertWithoutContentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DoItYourselfWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DoItYourselfWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DoItYourselfWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DoItYourselfUpdateToOneWithWhereWithoutContentInputSchema),z.lazy(() => DoItYourselfUpdateWithoutContentInputSchema),z.lazy(() => DoItYourselfUncheckedUpdateWithoutContentInputSchema) ]).optional(),
}).strict();

export default DoItYourselfUpdateOneWithoutContentNestedInputSchema;
