import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutDoItYourselfNestedInputSchema } from './UserUpdateOneRequiredWithoutDoItYourselfNestedInputSchema';

export const DoItYourselfUpdateWithoutContentInputSchema: z.ZodType<Prisma.DoItYourselfUpdateWithoutContentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Author: z.lazy(() => UserUpdateOneRequiredWithoutDoItYourselfNestedInputSchema).optional()
}).strict();

export default DoItYourselfUpdateWithoutContentInputSchema;
