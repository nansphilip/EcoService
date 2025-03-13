import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityCreateManyOrderInputSchema } from './QuantityCreateManyOrderInputSchema';

export const QuantityCreateManyOrderInputEnvelopeSchema: z.ZodType<Prisma.QuantityCreateManyOrderInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuantityCreateManyOrderInputSchema),z.lazy(() => QuantityCreateManyOrderInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default QuantityCreateManyOrderInputEnvelopeSchema;
