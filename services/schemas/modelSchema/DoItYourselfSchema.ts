import { z } from 'zod';

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

export default DoItYourselfSchema;
