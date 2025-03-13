import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderIncludeSchema } from '../inputTypeSchemas/OrderIncludeSchema'
import { OrderWhereUniqueInputSchema } from '../inputTypeSchemas/OrderWhereUniqueInputSchema'
import { OrderCreateInputSchema } from '../inputTypeSchemas/OrderCreateInputSchema'
import { OrderUncheckedCreateInputSchema } from '../inputTypeSchemas/OrderUncheckedCreateInputSchema'
import { OrderUpdateInputSchema } from '../inputTypeSchemas/OrderUpdateInputSchema'
import { OrderUncheckedUpdateInputSchema } from '../inputTypeSchemas/OrderUncheckedUpdateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { QuantityFindManyArgsSchema } from "../outputTypeSchemas/QuantityFindManyArgsSchema"
import { OrderCountOutputTypeArgsSchema } from "../outputTypeSchemas/OrderCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OrderSelectSchema: z.ZodType<Prisma.OrderSelect> = z.object({
  id: z.boolean().optional(),
  orderNumber: z.boolean().optional(),
  orderStatus: z.boolean().optional(),
  paymentStatus: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Quantity: z.union([z.boolean(),z.lazy(() => QuantityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrderCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const OrderUpsertArgsSchema: z.ZodType<Prisma.OrderUpsertArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: z.lazy(() => OrderIncludeSchema).optional(),
  where: OrderWhereUniqueInputSchema,
  create: z.union([ OrderCreateInputSchema,OrderUncheckedCreateInputSchema ]),
  update: z.union([ OrderUpdateInputSchema,OrderUncheckedUpdateInputSchema ]),
}).strict() ;

export default OrderUpsertArgsSchema;
