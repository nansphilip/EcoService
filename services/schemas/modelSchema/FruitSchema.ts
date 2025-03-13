import { z } from 'zod';

/////////////////////////////////////////
// FRUIT SCHEMA
/////////////////////////////////////////

/**
 * Fruit model
 */
export const FruitSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Fruit = z.infer<typeof FruitSchema>

export default FruitSchema;
