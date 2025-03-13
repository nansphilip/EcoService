import { z } from 'zod';

export const FruitOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description','image']);

export default FruitOrderByRelevanceFieldEnumSchema;
