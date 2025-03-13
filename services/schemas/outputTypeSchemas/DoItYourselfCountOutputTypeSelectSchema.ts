import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const DoItYourselfCountOutputTypeSelectSchema: z.ZodType<Prisma.DoItYourselfCountOutputTypeSelect> = z.object({
  Content: z.boolean().optional(),
}).strict();

export default DoItYourselfCountOutputTypeSelectSchema;
