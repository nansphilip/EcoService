import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ContentFindManyArgsSchema } from "../outputTypeSchemas/ContentFindManyArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ArticleCountOutputTypeArgsSchema } from "../outputTypeSchemas/ArticleCountOutputTypeArgsSchema"

export const ArticleIncludeSchema: z.ZodType<Prisma.ArticleInclude> = z.object({
  Content: z.union([z.boolean(),z.lazy(() => ContentFindManyArgsSchema)]).optional(),
  Author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ArticleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default ArticleIncludeSchema;
