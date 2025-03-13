import { z } from 'zod';
import { ContentWithRelationsSchema } from './ContentSchema'
import type { ContentWithRelations } from './ContentSchema'
import { UserWithRelationsSchema } from './UserSchema'
import type { UserWithRelations } from './UserSchema'

/////////////////////////////////////////
// DO IT YOURSELF SCHEMA
/////////////////////////////////////////

/**
 * DoItYourself model
 */
export const DoItYourselfSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type DoItYourself = z.infer<typeof DoItYourselfSchema>

/////////////////////////////////////////
// DO IT YOURSELF RELATION SCHEMA
/////////////////////////////////////////

export type DoItYourselfRelations = {
  Content: ContentWithRelations[];
  Author: UserWithRelations;
};

export type DoItYourselfWithRelations = z.infer<typeof DoItYourselfSchema> & DoItYourselfRelations

export const DoItYourselfWithRelationsSchema: z.ZodType<DoItYourselfWithRelations> = DoItYourselfSchema.merge(z.object({
  Content: z.lazy(() => ContentWithRelationsSchema).array(),
  Author: z.lazy(() => UserWithRelationsSchema),
}))

export default DoItYourselfSchema;
