import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ContentWhereInputSchema } from '../inputTypeSchemas/ContentWhereInputSchema'

export const ContentDeleteManyArgsSchema: z.ZodType<Prisma.ContentDeleteManyArgs> = z.object({
  where: ContentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default ContentDeleteManyArgsSchema;
