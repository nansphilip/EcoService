import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrderCreateManyUserInputSchema } from './OrderCreateManyUserInputSchema';

export const OrderCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.OrderCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => OrderCreateManyUserInputSchema),z.lazy(() => OrderCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default OrderCreateManyUserInputEnvelopeSchema;
