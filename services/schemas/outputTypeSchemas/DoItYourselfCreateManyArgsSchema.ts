import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DoItYourselfCreateManyInputSchema } from '../inputTypeSchemas/DoItYourselfCreateManyInputSchema'

export const DoItYourselfCreateManyArgsSchema: z.ZodType<Prisma.DoItYourselfCreateManyArgs> = z.object({
  data: z.union([ DoItYourselfCreateManyInputSchema,DoItYourselfCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default DoItYourselfCreateManyArgsSchema;
