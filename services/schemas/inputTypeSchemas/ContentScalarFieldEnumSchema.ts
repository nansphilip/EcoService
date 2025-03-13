import { z } from 'zod';

export const ContentScalarFieldEnumSchema = z.enum(['id','content','image','articleId','doItYourselfId','createdAt','updatedAt']);

export default ContentScalarFieldEnumSchema;
