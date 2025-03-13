import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ContentWhereInputSchema } from './ContentWhereInputSchema';

export const ContentListRelationFilterSchema: z.ZodType<Prisma.ContentListRelationFilter> = z.object({
  every: z.lazy(() => ContentWhereInputSchema).optional(),
  some: z.lazy(() => ContentWhereInputSchema).optional(),
  none: z.lazy(() => ContentWhereInputSchema).optional()
}).strict();

export default ContentListRelationFilterSchema;
