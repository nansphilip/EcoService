import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuantityIncludeSchema } from '../inputTypeSchemas/QuantityIncludeSchema'
import { QuantityWhereInputSchema } from '../inputTypeSchemas/QuantityWhereInputSchema'
import { QuantityOrderByWithRelationInputSchema } from '../inputTypeSchemas/QuantityOrderByWithRelationInputSchema'
import { QuantityWhereUniqueInputSchema } from '../inputTypeSchemas/QuantityWhereUniqueInputSchema'
import { QuantityScalarFieldEnumSchema } from '../inputTypeSchemas/QuantityScalarFieldEnumSchema'
import { ProductArgsSchema } from "../outputTypeSchemas/ProductArgsSchema"
import { OrderArgsSchema } from "../outputTypeSchemas/OrderArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const QuantitySelectSchema: z.ZodType<Prisma.QuantitySelect> = z.object({
  id: z.boolean().optional(),
  quantity: z.boolean().optional(),
  productId: z.boolean().optional(),
  orderId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  Order: z.union([z.boolean(),z.lazy(() => OrderArgsSchema)]).optional(),
}).strict()

export const QuantityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.QuantityFindFirstOrThrowArgs> = z.object({
  select: QuantitySelectSchema.optional(),
  include: z.lazy(() => QuantityIncludeSchema).optional(),
  where: QuantityWhereInputSchema.optional(),
  orderBy: z.union([ QuantityOrderByWithRelationInputSchema.array(),QuantityOrderByWithRelationInputSchema ]).optional(),
  cursor: QuantityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ QuantityScalarFieldEnumSchema,QuantityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default QuantityFindFirstOrThrowArgsSchema;
