import { z } from 'zod';

export const ContentOrderByRelevanceFieldEnumSchema = z.enum(['id','content','image','articleId','doItYourselfId']);

export default ContentOrderByRelevanceFieldEnumSchema;
