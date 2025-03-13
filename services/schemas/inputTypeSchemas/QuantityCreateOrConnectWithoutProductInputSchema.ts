import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityWhereUniqueInputSchema } from './QuantityWhereUniqueInputSchema';
import { QuantityCreateWithoutProductInputSchema } from './QuantityCreateWithoutProductInputSchema';
import { QuantityUncheckedCreateWithoutProductInputSchema } from './QuantityUncheckedCreateWithoutProductInputSchema';

export const QuantityCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.QuantityCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => QuantityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuantityCreateWithoutProductInputSchema),z.lazy(() => QuantityUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export default QuantityCreateOrConnectWithoutProductInputSchema;
