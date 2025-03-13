import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderCreateWithoutQuantityInputSchema } from './OrderCreateWithoutQuantityInputSchema';
import { OrderUncheckedCreateWithoutQuantityInputSchema } from './OrderUncheckedCreateWithoutQuantityInputSchema';
import { OrderCreateOrConnectWithoutQuantityInputSchema } from './OrderCreateOrConnectWithoutQuantityInputSchema';
import { OrderUpsertWithoutQuantityInputSchema } from './OrderUpsertWithoutQuantityInputSchema';
import { OrderWhereUniqueInputSchema } from './OrderWhereUniqueInputSchema';
import { OrderUpdateToOneWithWhereWithoutQuantityInputSchema } from './OrderUpdateToOneWithWhereWithoutQuantityInputSchema';
import { OrderUpdateWithoutQuantityInputSchema } from './OrderUpdateWithoutQuantityInputSchema';
import { OrderUncheckedUpdateWithoutQuantityInputSchema } from './OrderUncheckedUpdateWithoutQuantityInputSchema';

export const OrderUpdateOneRequiredWithoutQuantityNestedInputSchema: z.ZodType<Prisma.OrderUpdateOneRequiredWithoutQuantityNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrderCreateWithoutQuantityInputSchema),z.lazy(() => OrderUncheckedCreateWithoutQuantityInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrderCreateOrConnectWithoutQuantityInputSchema).optional(),
  upsert: z.lazy(() => OrderUpsertWithoutQuantityInputSchema).optional(),
  connect: z.lazy(() => OrderWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrderUpdateToOneWithWhereWithoutQuantityInputSchema),z.lazy(() => OrderUpdateWithoutQuantityInputSchema),z.lazy(() => OrderUncheckedUpdateWithoutQuantityInputSchema) ]).optional(),
}).strict();

export default OrderUpdateOneRequiredWithoutQuantityNestedInputSchema;
