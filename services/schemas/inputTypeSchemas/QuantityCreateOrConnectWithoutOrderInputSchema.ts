import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityWhereUniqueInputSchema } from './QuantityWhereUniqueInputSchema';
import { QuantityCreateWithoutOrderInputSchema } from './QuantityCreateWithoutOrderInputSchema';
import { QuantityUncheckedCreateWithoutOrderInputSchema } from './QuantityUncheckedCreateWithoutOrderInputSchema';

export const QuantityCreateOrConnectWithoutOrderInputSchema: z.ZodType<Prisma.QuantityCreateOrConnectWithoutOrderInput> = z.object({
  where: z.lazy(() => QuantityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuantityCreateWithoutOrderInputSchema),z.lazy(() => QuantityUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export default QuantityCreateOrConnectWithoutOrderInputSchema;
