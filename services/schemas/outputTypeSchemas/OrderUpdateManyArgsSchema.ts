import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderUpdateManyMutationInputSchema } from '../inputTypeSchemas/OrderUpdateManyMutationInputSchema'
import { OrderUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/OrderUncheckedUpdateManyInputSchema'
import { OrderWhereInputSchema } from '../inputTypeSchemas/OrderWhereInputSchema'

export const OrderUpdateManyArgsSchema: z.ZodType<Prisma.OrderUpdateManyArgs> = z.object({
  data: z.union([ OrderUpdateManyMutationInputSchema,OrderUncheckedUpdateManyInputSchema ]),
  where: OrderWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default OrderUpdateManyArgsSchema;
