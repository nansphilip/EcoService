import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuantityUpdateManyMutationInputSchema } from '../inputTypeSchemas/QuantityUpdateManyMutationInputSchema'
import { QuantityUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/QuantityUncheckedUpdateManyInputSchema'
import { QuantityWhereInputSchema } from '../inputTypeSchemas/QuantityWhereInputSchema'

export const QuantityUpdateManyArgsSchema: z.ZodType<Prisma.QuantityUpdateManyArgs> = z.object({
  data: z.union([ QuantityUpdateManyMutationInputSchema,QuantityUncheckedUpdateManyInputSchema ]),
  where: QuantityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default QuantityUpdateManyArgsSchema;
