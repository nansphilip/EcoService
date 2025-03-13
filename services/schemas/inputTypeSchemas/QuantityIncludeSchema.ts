import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductArgsSchema } from "../outputTypeSchemas/ProductArgsSchema"
import { OrderArgsSchema } from "../outputTypeSchemas/OrderArgsSchema"

export const QuantityIncludeSchema: z.ZodType<Prisma.QuantityInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  Order: z.union([z.boolean(),z.lazy(() => OrderArgsSchema)]).optional(),
}).strict()

export default QuantityIncludeSchema;
