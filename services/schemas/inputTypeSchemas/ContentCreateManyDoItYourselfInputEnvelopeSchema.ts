import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentCreateManyDoItYourselfInputSchema } from './ContentCreateManyDoItYourselfInputSchema';

export const ContentCreateManyDoItYourselfInputEnvelopeSchema: z.ZodType<Prisma.ContentCreateManyDoItYourselfInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ContentCreateManyDoItYourselfInputSchema),z.lazy(() => ContentCreateManyDoItYourselfInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ContentCreateManyDoItYourselfInputEnvelopeSchema;
