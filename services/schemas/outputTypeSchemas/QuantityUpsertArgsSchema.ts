import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuantityIncludeSchema } from '../inputTypeSchemas/QuantityIncludeSchema'
import { QuantityWhereUniqueInputSchema } from '../inputTypeSchemas/QuantityWhereUniqueInputSchema'
import { QuantityCreateInputSchema } from '../inputTypeSchemas/QuantityCreateInputSchema'
import { QuantityUncheckedCreateInputSchema } from '../inputTypeSchemas/QuantityUncheckedCreateInputSchema'
import { QuantityUpdateInputSchema } from '../inputTypeSchemas/QuantityUpdateInputSchema'
import { QuantityUncheckedUpdateInputSchema } from '../inputTypeSchemas/QuantityUncheckedUpdateInputSchema'
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

export const QuantityUpsertArgsSchema: z.ZodType<Prisma.QuantityUpsertArgs> = z.object({
  select: QuantitySelectSchema.optional(),
  include: z.lazy(() => QuantityIncludeSchema).optional(),
  where: QuantityWhereUniqueInputSchema,
  create: z.union([ QuantityCreateInputSchema,QuantityUncheckedCreateInputSchema ]),
  update: z.union([ QuantityUpdateInputSchema,QuantityUncheckedUpdateInputSchema ]),
}).strict() ;

export default QuantityUpsertArgsSchema;
