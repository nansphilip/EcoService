import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ArticleCountOutputTypeSelectSchema: z.ZodType<Prisma.ArticleCountOutputTypeSelect> = z.object({
  Content: z.boolean().optional(),
}).strict();

export default ArticleCountOutputTypeSelectSchema;
