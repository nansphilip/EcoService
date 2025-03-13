import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductArgsSchema } from "../outputTypeSchemas/ProductArgsSchema"
import { OrderArgsSchema } from "../outputTypeSchemas/OrderArgsSchema"

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

export default QuantitySelectSchema;
