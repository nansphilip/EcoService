import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityWhereUniqueInputSchema } from './QuantityWhereUniqueInputSchema';
import { QuantityUpdateWithoutOrderInputSchema } from './QuantityUpdateWithoutOrderInputSchema';
import { QuantityUncheckedUpdateWithoutOrderInputSchema } from './QuantityUncheckedUpdateWithoutOrderInputSchema';
import { QuantityCreateWithoutOrderInputSchema } from './QuantityCreateWithoutOrderInputSchema';
import { QuantityUncheckedCreateWithoutOrderInputSchema } from './QuantityUncheckedCreateWithoutOrderInputSchema';

export const QuantityUpsertWithWhereUniqueWithoutOrderInputSchema: z.ZodType<Prisma.QuantityUpsertWithWhereUniqueWithoutOrderInput> = z.object({
  where: z.lazy(() => QuantityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QuantityUpdateWithoutOrderInputSchema),z.lazy(() => QuantityUncheckedUpdateWithoutOrderInputSchema) ]),
  create: z.union([ z.lazy(() => QuantityCreateWithoutOrderInputSchema),z.lazy(() => QuantityUncheckedCreateWithoutOrderInputSchema) ]),
}).strict();

export default QuantityUpsertWithWhereUniqueWithoutOrderInputSchema;
