import { z } from 'zod';

export const SessionOrderByRelevanceFieldEnumSchema = z.enum(['id','token','ipAddress','userAgent','userId']);

export default SessionOrderByRelevanceFieldEnumSchema;
