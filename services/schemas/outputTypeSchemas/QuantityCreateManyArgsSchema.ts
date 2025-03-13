import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuantityCreateManyInputSchema } from '../inputTypeSchemas/QuantityCreateManyInputSchema'

export const QuantityCreateManyArgsSchema: z.ZodType<Prisma.QuantityCreateManyArgs> = z.object({
  data: z.union([ QuantityCreateManyInputSchema,QuantityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default QuantityCreateManyArgsSchema;
