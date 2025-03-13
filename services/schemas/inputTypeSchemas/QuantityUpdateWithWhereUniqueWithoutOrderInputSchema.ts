import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityWhereUniqueInputSchema } from './QuantityWhereUniqueInputSchema';
import { QuantityUpdateWithoutOrderInputSchema } from './QuantityUpdateWithoutOrderInputSchema';
import { QuantityUncheckedUpdateWithoutOrderInputSchema } from './QuantityUncheckedUpdateWithoutOrderInputSchema';

export const QuantityUpdateWithWhereUniqueWithoutOrderInputSchema: z.ZodType<Prisma.QuantityUpdateWithWhereUniqueWithoutOrderInput> = z.object({
  where: z.lazy(() => QuantityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QuantityUpdateWithoutOrderInputSchema),z.lazy(() => QuantityUncheckedUpdateWithoutOrderInputSchema) ]),
}).strict();

export default QuantityUpdateWithWhereUniqueWithoutOrderInputSchema;
