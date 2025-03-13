import { z } from 'zod';

export const ArticleScalarFieldEnumSchema = z.enum(['id','title','authorId','createdAt','updatedAt']);

export default ArticleScalarFieldEnumSchema;
