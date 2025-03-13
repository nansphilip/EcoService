import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ContentFindManyArgsSchema } from "../outputTypeSchemas/ContentFindManyArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { DoItYourselfCountOutputTypeArgsSchema } from "../outputTypeSchemas/DoItYourselfCountOutputTypeArgsSchema"

export const DoItYourselfIncludeSchema: z.ZodType<Prisma.DoItYourselfInclude> = z.object({
  Content: z.union([z.boolean(),z.lazy(() => ContentFindManyArgsSchema)]).optional(),
  Author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DoItYourselfCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default DoItYourselfIncludeSchema;
