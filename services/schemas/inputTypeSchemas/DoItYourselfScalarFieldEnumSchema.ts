import { z } from 'zod';

export const DoItYourselfScalarFieldEnumSchema = z.enum(['id','title','authorId','createdAt','updatedAt']);

export default DoItYourselfScalarFieldEnumSchema;
