import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderScalarWhereInputSchema } from './OrderScalarWhereInputSchema';
import { OrderUpdateManyMutationInputSchema } from './OrderUpdateManyMutationInputSchema';
import { OrderUncheckedUpdateManyWithoutUserInputSchema } from './OrderUncheckedUpdateManyWithoutUserInputSchema';

export const OrderUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.OrderUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => OrderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => OrderUpdateManyMutationInputSchema),z.lazy(() => OrderUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default OrderUpdateManyWithWhereWithoutUserInputSchema;
