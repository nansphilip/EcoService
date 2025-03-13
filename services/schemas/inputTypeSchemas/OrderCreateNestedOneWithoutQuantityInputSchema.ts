import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderCreateWithoutQuantityInputSchema } from './OrderCreateWithoutQuantityInputSchema';
import { OrderUncheckedCreateWithoutQuantityInputSchema } from './OrderUncheckedCreateWithoutQuantityInputSchema';
import { OrderCreateOrConnectWithoutQuantityInputSchema } from './OrderCreateOrConnectWithoutQuantityInputSchema';
import { OrderWhereUniqueInputSchema } from './OrderWhereUniqueInputSchema';

export const OrderCreateNestedOneWithoutQuantityInputSchema: z.ZodType<Prisma.OrderCreateNestedOneWithoutQuantityInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutQuantityInputSchema),z.lazy(() => OrderUncheckedCreateWithoutQuantityInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutQuantityInputSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional()
}).strict();

export default OrderCreateNestedOneWithoutQuantityInputSchema;
