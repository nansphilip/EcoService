import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityWhereUniqueInputSchema } from './QuantityWhereUniqueInputSchema';
import { QuantityUpdateWithoutProductInputSchema } from './QuantityUpdateWithoutProductInputSchema';
import { QuantityUncheckedUpdateWithoutProductInputSchema } from './QuantityUncheckedUpdateWithoutProductInputSchema';
import { QuantityCreateWithoutProductInputSchema } from './QuantityCreateWithoutProductInputSchema';
import { QuantityUncheckedCreateWithoutProductInputSchema } from './QuantityUncheckedCreateWithoutProductInputSchema';

export const QuantityUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.QuantityUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => QuantityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QuantityUpdateWithoutProductInputSchema),z.lazy(() => QuantityUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => QuantityCreateWithoutProductInputSchema),z.lazy(() => QuantityUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export default QuantityUpsertWithWhereUniqueWithoutProductInputSchema;
