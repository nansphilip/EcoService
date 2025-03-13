import { z } from 'zod';

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

export default ContentSchema;
