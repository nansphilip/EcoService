import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentCreateManyArticleInputSchema } from './ContentCreateManyArticleInputSchema';

export const ContentCreateManyArticleInputEnvelopeSchema: z.ZodType<Prisma.ContentCreateManyArticleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ContentCreateManyArticleInputSchema),z.lazy(() => ContentCreateManyArticleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ContentCreateManyArticleInputEnvelopeSchema;
