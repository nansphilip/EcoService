import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DoItYourselfCreateNestedOneWithoutContentInputSchema } from './DoItYourselfCreateNestedOneWithoutContentInputSchema';

export const ContentCreateWithoutArticleInputSchema: z.ZodType<Prisma.ContentCreateWithoutArticleInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  image: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  DoItYourself: z.lazy(() => DoItYourselfCreateNestedOneWithoutContentInputSchema).optional()
}).strict();

export default ContentCreateWithoutArticleInputSchema;
