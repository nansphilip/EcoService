import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityWhereUniqueInputSchema } from './QuantityWhereUniqueInputSchema';
import { QuantityUpdateWithoutProductInputSchema } from './QuantityUpdateWithoutProductInputSchema';
import { QuantityUncheckedUpdateWithoutProductInputSchema } from './QuantityUncheckedUpdateWithoutProductInputSchema';

export const QuantityUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.QuantityUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => QuantityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QuantityUpdateWithoutProductInputSchema),z.lazy(() => QuantityUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export default QuantityUpdateWithWhereUniqueWithoutProductInputSchema;
