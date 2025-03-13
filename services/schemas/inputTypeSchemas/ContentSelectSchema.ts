import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ArticleArgsSchema } from "../outputTypeSchemas/ArticleArgsSchema"
import { DoItYourselfArgsSchema } from "../outputTypeSchemas/DoItYourselfArgsSchema"

export const ContentSelectSchema: z.ZodType<Prisma.ContentSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  image: z.boolean().optional(),
  articleId: z.boolean().optional(),
  doItYourselfId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Article: z.union([z.boolean(),z.lazy(() => ArticleArgsSchema)]).optional(),
  DoItYourself: z.union([z.boolean(),z.lazy(() => DoItYourselfArgsSchema)]).optional(),
}).strict()

export default ContentSelectSchema;
