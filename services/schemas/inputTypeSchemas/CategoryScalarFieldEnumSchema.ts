import { z } from 'zod';

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','description','createdAt','updatedAt']);

export default CategoryScalarFieldEnumSchema;
