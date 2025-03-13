import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfCreateManyAuthorInputSchema } from './DoItYourselfCreateManyAuthorInputSchema';

export const DoItYourselfCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.DoItYourselfCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DoItYourselfCreateManyAuthorInputSchema),z.lazy(() => DoItYourselfCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default DoItYourselfCreateManyAuthorInputEnvelopeSchema;
