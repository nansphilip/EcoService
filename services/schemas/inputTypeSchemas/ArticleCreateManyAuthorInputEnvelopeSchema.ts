import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleCreateManyAuthorInputSchema } from './ArticleCreateManyAuthorInputSchema';

export const ArticleCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.ArticleCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ArticleCreateManyAuthorInputSchema),z.lazy(() => ArticleCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default ArticleCreateManyAuthorInputEnvelopeSchema;
