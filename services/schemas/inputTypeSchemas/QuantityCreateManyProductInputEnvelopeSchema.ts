import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { QuantityCreateManyProductInputSchema } from './QuantityCreateManyProductInputSchema';

export const QuantityCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.QuantityCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuantityCreateManyProductInputSchema),z.lazy(() => QuantityCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default QuantityCreateManyProductInputEnvelopeSchema;
