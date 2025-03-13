import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ContentSelectSchema } from '../inputTypeSchemas/ContentSelectSchema';
import { ContentIncludeSchema } from '../inputTypeSchemas/ContentIncludeSchema';

export const ContentArgsSchema: z.ZodType<Prisma.ContentDefaultArgs> = z.object({
  select: z.lazy(() => ContentSelectSchema).optional(),
  include: z.lazy(() => ContentIncludeSchema).optional(),
}).strict();

export default ContentArgsSchema;
