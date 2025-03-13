import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderWhereInputSchema } from '../inputTypeSchemas/OrderWhereInputSchema'

export const OrderDeleteManyArgsSchema: z.ZodType<Prisma.OrderDeleteManyArgs> = z.object({
  where: OrderWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default OrderDeleteManyArgsSchema;
