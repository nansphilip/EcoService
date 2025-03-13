import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ArticleCreateNestedOneWithoutContentInputSchema } from './ArticleCreateNestedOneWithoutContentInputSchema';
import { DoItYourselfCreateNestedOneWithoutContentInputSchema } from './DoItYourselfCreateNestedOneWithoutContentInputSchema';

export const ContentCreateInputSchema: z.ZodType<Prisma.ContentCreateInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  image: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Article: z.lazy(() => ArticleCreateNestedOneWithoutContentInputSchema).optional(),
  DoItYourself: z.lazy(() => DoItYourselfCreateNestedOneWithoutContentInputSchema).optional()
}).strict();

export default ContentCreateInputSchema;
