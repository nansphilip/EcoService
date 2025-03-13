import { z } from 'zod';
import { ContentWithRelationsSchema } from './ContentSchema'
import type { ContentWithRelations } from './ContentSchema'
import { UserWithRelationsSchema } from './UserSchema'
import type { UserWithRelations } from './UserSchema'

/////////////////////////////////////////
// ARTICLE SCHEMA
/////////////////////////////////////////

/**
 * Article model
 */
export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Article = z.infer<typeof ArticleSchema>

/////////////////////////////////////////
// ARTICLE RELATION SCHEMA
/////////////////////////////////////////

export type ArticleRelations = {
  Content: ContentWithRelations[];
  Author: UserWithRelations;
};

export type ArticleWithRelations = z.infer<typeof ArticleSchema> & ArticleRelations

export const ArticleWithRelationsSchema: z.ZodType<ArticleWithRelations> = ArticleSchema.merge(z.object({
  Content: z.lazy(() => ContentWithRelationsSchema).array(),
  Author: z.lazy(() => UserWithRelationsSchema),
}))

export default ArticleSchema;
