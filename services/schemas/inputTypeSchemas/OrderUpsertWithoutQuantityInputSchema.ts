import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderUpdateWithoutQuantityInputSchema } from './OrderUpdateWithoutQuantityInputSchema';
import { OrderUncheckedUpdateWithoutQuantityInputSchema } from './OrderUncheckedUpdateWithoutQuantityInputSchema';
import { OrderCreateWithoutQuantityInputSchema } from './OrderCreateWithoutQuantityInputSchema';
import { OrderUncheckedCreateWithoutQuantityInputSchema } from './OrderUncheckedCreateWithoutQuantityInputSchema';
import { OrderWhereInputSchema } from './OrderWhereInputSchema';

export const OrderUpsertWithoutQuantityInputSchema: z.ZodType<Prisma.OrderUpsertWithoutQuantityInput> = z.object({
  update: z.union([ z.lazy(() => OrderUpdateWithoutQuantityInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutQuantityInputSchema) ]),
  create: z.union([ z.lazy(() => OrderCreateWithoutQuantityInputSchema),z.lazy(() => OrderUncheckedCreateWithoutQuantityInputSchema) ]),
  where: z.lazy(() => OrderWhereInputSchema).optional()
}).strict();

export default OrderUpsertWithoutQuantityInputSchema;
