import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuantityWhereInputSchema } from '../inputTypeSchemas/QuantityWhereInputSchema'

export const QuantityDeleteManyArgsSchema: z.ZodType<Prisma.QuantityDeleteManyArgs> = z.object({
  where: QuantityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default QuantityDeleteManyArgsSchema;
