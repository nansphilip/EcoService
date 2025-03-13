import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfWhereInputSchema } from './DoItYourselfWhereInputSchema';

export const DoItYourselfListRelationFilterSchema: z.ZodType<Prisma.DoItYourselfListRelationFilter> = z.object({
  every: z.lazy(() => DoItYourselfWhereInputSchema).optional(),
  some: z.lazy(() => DoItYourselfWhereInputSchema).optional(),
  none: z.lazy(() => DoItYourselfWhereInputSchema).optional()
}).strict();

export default DoItYourselfListRelationFilterSchema;
