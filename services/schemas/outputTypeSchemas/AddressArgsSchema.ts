import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressSelectSchema } from '../inputTypeSchemas/AddressSelectSchema';
import { AddressIncludeSchema } from '../inputTypeSchemas/AddressIncludeSchema';

export const AddressArgsSchema: z.ZodType<Prisma.AddressDefaultArgs> = z.object({
  select: z.lazy(() => AddressSelectSchema).optional(),
  include: z.lazy(() => AddressIncludeSchema).optional(),
}).strict();

export default AddressArgsSchema;
