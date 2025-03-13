import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DoItYourselfCountOutputTypeSelectSchema } from './DoItYourselfCountOutputTypeSelectSchema';

export const DoItYourselfCountOutputTypeArgsSchema: z.ZodType<Prisma.DoItYourselfCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DoItYourselfCountOutputTypeSelectSchema).nullish(),
}).strict();

export default DoItYourselfCountOutputTypeSelectSchema;
