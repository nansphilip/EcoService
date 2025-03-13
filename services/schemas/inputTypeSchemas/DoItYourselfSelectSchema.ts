import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ContentFindManyArgsSchema } from "../outputTypeSchemas/ContentFindManyArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { DoItYourselfCountOutputTypeArgsSchema } from "../outputTypeSchemas/DoItYourselfCountOutputTypeArgsSchema"

export const DoItYourselfSelectSchema: z.ZodType<Prisma.DoItYourselfSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  authorId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Content: z.union([z.boolean(),z.lazy(() => ContentFindManyArgsSchema)]).optional(),
  Author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DoItYourselfCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default DoItYourselfSelectSchema;
