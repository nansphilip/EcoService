import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { QuantityFindManyArgsSchema } from "../outputTypeSchemas/QuantityFindManyArgsSchema"
import { OrderCountOutputTypeArgsSchema } from "../outputTypeSchemas/OrderCountOutputTypeArgsSchema"

export const OrderIncludeSchema: z.ZodType<Prisma.OrderInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  Quantity: z.union([z.boolean(),z.lazy(() => QuantityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrderCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default OrderIncludeSchema;
