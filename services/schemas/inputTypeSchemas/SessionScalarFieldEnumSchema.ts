import { z } from 'zod';

export const SessionScalarFieldEnumSchema = z.enum(['id','token','expiresAt','ipAddress','userAgent','userId','createdAt','updatedAt']);

export default SessionScalarFieldEnumSchema;
