import { z } from 'zod';

export const ArticleOrderByRelevanceFieldEnumSchema = z.enum(['id','title','authorId']);

export default ArticleOrderByRelevanceFieldEnumSchema;
