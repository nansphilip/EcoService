import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DoItYourselfWhereInputSchema } from '../inputTypeSchemas/DoItYourselfWhereInputSchema'

export const DoItYourselfDeleteManyArgsSchema: z.ZodType<Prisma.DoItYourselfDeleteManyArgs> = z.object({
  where: DoItYourselfWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default DoItYourselfDeleteManyArgsSchema;
