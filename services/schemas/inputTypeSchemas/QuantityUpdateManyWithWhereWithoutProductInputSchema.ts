import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityScalarWhereInputSchema } from './QuantityScalarWhereInputSchema';
import { QuantityUpdateManyMutationInputSchema } from './QuantityUpdateManyMutationInputSchema';
import { QuantityUncheckedUpdateManyWithoutProductInputSchema } from './QuantityUncheckedUpdateManyWithoutProductInputSchema';

export const QuantityUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.QuantityUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => QuantityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QuantityUpdateManyMutationInputSchema),z.lazy(() => QuantityUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export default QuantityUpdateManyWithWhereWithoutProductInputSchema;
