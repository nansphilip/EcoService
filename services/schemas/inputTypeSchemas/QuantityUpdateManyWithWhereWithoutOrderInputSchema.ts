import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityScalarWhereInputSchema } from './QuantityScalarWhereInputSchema';
import { QuantityUpdateManyMutationInputSchema } from './QuantityUpdateManyMutationInputSchema';
import { QuantityUncheckedUpdateManyWithoutOrderInputSchema } from './QuantityUncheckedUpdateManyWithoutOrderInputSchema';

export const QuantityUpdateManyWithWhereWithoutOrderInputSchema: z.ZodType<Prisma.QuantityUpdateManyWithWhereWithoutOrderInput> = z.object({
  where: z.lazy(() => QuantityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QuantityUpdateManyMutationInputSchema),z.lazy(() => QuantityUncheckedUpdateManyWithoutOrderInputSchema) ]),
}).strict();

export default QuantityUpdateManyWithWhereWithoutOrderInputSchema;
