import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderWhereUniqueInputSchema } from './OrderWhereUniqueInputSchema';
import { OrderCreateWithoutQuantityInputSchema } from './OrderCreateWithoutQuantityInputSchema';
import { OrderUncheckedCreateWithoutQuantityInputSchema } from './OrderUncheckedCreateWithoutQuantityInputSchema';

export const OrderCreateOrConnectWithoutQuantityInputSchema: z.ZodType<Prisma.OrderCreateOrConnectWithoutQuantityInput> = z.object({
  where: z.lazy(() => OrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrderCreateWithoutQuantityInputSchema),z.lazy(() => OrderUncheckedCreateWithoutQuantityInputSchema) ]),
}).strict();

export default OrderCreateOrConnectWithoutQuantityInputSchema;
