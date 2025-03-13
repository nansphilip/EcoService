import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ArticleUpdateOneWithoutContentNestedInputSchema } from './ArticleUpdateOneWithoutContentNestedInputSchema';
import { DoItYourselfUpdateOneWithoutContentNestedInputSchema } from './DoItYourselfUpdateOneWithoutContentNestedInputSchema';

export const ContentUpdateInputSchema: z.ZodType<Prisma.ContentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Article: z.lazy(() => ArticleUpdateOneWithoutContentNestedInputSchema).optional(),
  DoItYourself: z.lazy(() => DoItYourselfUpdateOneWithoutContentNestedInputSchema).optional()
}).strict();

export default ContentUpdateInputSchema;
