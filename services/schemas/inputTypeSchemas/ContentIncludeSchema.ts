import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ArticleArgsSchema } from "../outputTypeSchemas/ArticleArgsSchema"
import { DoItYourselfArgsSchema } from "../outputTypeSchemas/DoItYourselfArgsSchema"

export const ContentIncludeSchema: z.ZodType<Prisma.ContentInclude> = z.object({
  Article: z.union([z.boolean(),z.lazy(() => ArticleArgsSchema)]).optional(),
  DoItYourself: z.union([z.boolean(),z.lazy(() => DoItYourselfArgsSchema)]).optional(),
}).strict()

export default ContentIncludeSchema;
