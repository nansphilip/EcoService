import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DoItYourselfUpdateManyMutationInputSchema } from '../inputTypeSchemas/DoItYourselfUpdateManyMutationInputSchema'
import { DoItYourselfUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/DoItYourselfUncheckedUpdateManyInputSchema'
import { DoItYourselfWhereInputSchema } from '../inputTypeSchemas/DoItYourselfWhereInputSchema'

export const DoItYourselfUpdateManyArgsSchema: z.ZodType<Prisma.DoItYourselfUpdateManyArgs> = z.object({
  data: z.union([ DoItYourselfUpdateManyMutationInputSchema,DoItYourselfUncheckedUpdateManyInputSchema ]),
  where: DoItYourselfWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default DoItYourselfUpdateManyArgsSchema;
