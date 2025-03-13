import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { QuantitySelectSchema } from '../inputTypeSchemas/QuantitySelectSchema';
import { QuantityIncludeSchema } from '../inputTypeSchemas/QuantityIncludeSchema';

export const QuantityArgsSchema: z.ZodType<Prisma.QuantityDefaultArgs> = z.object({
  select: z.lazy(() => QuantitySelectSchema).optional(),
  include: z.lazy(() => QuantityIncludeSchema).optional(),
}).strict();

export default QuantityArgsSchema;
