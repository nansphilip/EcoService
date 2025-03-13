import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderIncludeSchema } from '../inputTypeSchemas/OrderIncludeSchema'
import { OrderWhereInputSchema } from '../inputTypeSchemas/OrderWhereInputSchema'
import { OrderOrderByWithRelationInputSchema } from '../inputTypeSchemas/OrderOrderByWithRelationInputSchema'
import { OrderWhereUniqueInputSchema } from '../inputTypeSchemas/OrderWhereUniqueInputSchema'
import { OrderScalarFieldEnumSchema } from '../inputTypeSchemas/OrderScalarFieldEnumSchema'
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

export const OrderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OrderFindFirstOrThrowArgs> = z.object({
  select: OrderSelectSchema.optional(),
  include: z.lazy(() => OrderIncludeSchema).optional(),
  where: OrderWhereInputSchema.optional(),
  orderBy: z.union([ OrderOrderByWithRelationInputSchema.array(),OrderOrderByWithRelationInputSchema ]).optional(),
  cursor: OrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrderScalarFieldEnumSchema,OrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default OrderFindFirstOrThrowArgsSchema;
