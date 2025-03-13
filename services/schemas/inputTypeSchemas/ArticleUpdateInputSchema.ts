import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ContentUpdateManyWithoutArticleNestedInputSchema } from './ContentUpdateManyWithoutArticleNestedInputSchema';
import { UserUpdateOneRequiredWithoutArticleNestedInputSchema } from './UserUpdateOneRequiredWithoutArticleNestedInputSchema';

export const ArticleUpdateInputSchema: z.ZodType<Prisma.ArticleUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutArticleNestedInputSchema).optional(),
  Author: z.lazy(() => UserUpdateOneRequiredWithoutArticleNestedInputSchema).optional()
}).strict();

export default ArticleUpdateInputSchema;
