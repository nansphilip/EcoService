import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ContentUpdateManyWithoutDoItYourselfNestedInputSchema } from './ContentUpdateManyWithoutDoItYourselfNestedInputSchema';
import { UserUpdateOneRequiredWithoutDoItYourselfNestedInputSchema } from './UserUpdateOneRequiredWithoutDoItYourselfNestedInputSchema';

export const DoItYourselfUpdateInputSchema: z.ZodType<Prisma.DoItYourselfUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutDoItYourselfNestedInputSchema).optional(),
  Author: z.lazy(() => UserUpdateOneRequiredWithoutDoItYourselfNestedInputSchema).optional()
}).strict();

export default DoItYourselfUpdateInputSchema;
