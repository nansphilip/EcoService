import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ContentIncludeSchema } from '../inputTypeSchemas/ContentIncludeSchema'
import { ContentCreateInputSchema } from '../inputTypeSchemas/ContentCreateInputSchema'
import { ContentUncheckedCreateInputSchema } from '../inputTypeSchemas/ContentUncheckedCreateInputSchema'
import { ArticleArgsSchema } from "../outputTypeSchemas/ArticleArgsSchema"
import { DoItYourselfArgsSchema } from "../outputTypeSchemas/DoItYourselfArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const ContentCreateArgsSchema: z.ZodType<Prisma.ContentCreateArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: z.lazy(() => ContentIncludeSchema).optional(),
  data: z.union([ ContentCreateInputSchema,ContentUncheckedCreateInputSchema ]),
}).strict() ;

export default ContentCreateArgsSchema;
