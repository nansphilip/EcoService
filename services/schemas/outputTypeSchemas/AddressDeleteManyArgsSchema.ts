import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressWhereInputSchema } from '../inputTypeSchemas/AddressWhereInputSchema'

export const AddressDeleteManyArgsSchema: z.ZodType<Prisma.AddressDeleteManyArgs> = z.object({
  where: AddressWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default AddressDeleteManyArgsSchema;
