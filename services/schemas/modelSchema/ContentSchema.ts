import { z } from 'zod';
import { ArticleWithRelationsSchema } from './ArticleSchema'
import type { ArticleWithRelations } from './ArticleSchema'
import { DoItYourselfWithRelationsSchema } from './DoItYourselfSchema'
import type { DoItYourselfWithRelations } from './DoItYourselfSchema'

/////////////////////////////////////////
// CONTENT SCHEMA
/////////////////////////////////////////

/**
 * Content model
 */
export const ContentSchema = z.object({
  id: z.string(),
  content: z.string(),
  image: z.string(),
  articleId: z.string().nullable(),
  doItYourselfId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Content = z.infer<typeof ContentSchema>

/////////////////////////////////////////
// CONTENT RELATION SCHEMA
/////////////////////////////////////////

export type ContentRelations = {
  Article?: ArticleWithRelations | null;
  DoItYourself?: DoItYourselfWithRelations | null;
};

export type ContentWithRelations = z.infer<typeof ContentSchema> & ContentRelations

export const ContentWithRelationsSchema: z.ZodType<ContentWithRelations> = ContentSchema.merge(z.object({
  Article: z.lazy(() => ArticleWithRelationsSchema).nullable(),
  DoItYourself: z.lazy(() => DoItYourselfWithRelationsSchema).nullable(),
}))

export default ContentSchema;
