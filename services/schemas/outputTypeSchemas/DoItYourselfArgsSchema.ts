import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DoItYourselfSelectSchema } from '../inputTypeSchemas/DoItYourselfSelectSchema';
import { DoItYourselfIncludeSchema } from '../inputTypeSchemas/DoItYourselfIncludeSchema';

export const DoItYourselfArgsSchema: z.ZodType<Prisma.DoItYourselfDefaultArgs> = z.object({
  select: z.lazy(() => DoItYourselfSelectSchema).optional(),
  include: z.lazy(() => DoItYourselfIncludeSchema).optional(),
}).strict();

export default DoItYourselfArgsSchema;
