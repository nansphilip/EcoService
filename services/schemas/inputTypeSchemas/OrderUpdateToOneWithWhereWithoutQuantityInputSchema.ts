import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderWhereInputSchema } from './OrderWhereInputSchema';
import { OrderUpdateWithoutQuantityInputSchema } from './OrderUpdateWithoutQuantityInputSchema';
import { OrderUncheckedUpdateWithoutQuantityInputSchema } from './OrderUncheckedUpdateWithoutQuantityInputSchema';

export const OrderUpdateToOneWithWhereWithoutQuantityInputSchema: z.ZodType<Prisma.OrderUpdateToOneWithWhereWithoutQuantityInput> = z.object({
  where: z.lazy(() => OrderWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrderUpdateWithoutQuantityInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutQuantityInputSchema) ]),
}).strict();

export default OrderUpdateToOneWithWhereWithoutQuantityInputSchema;
