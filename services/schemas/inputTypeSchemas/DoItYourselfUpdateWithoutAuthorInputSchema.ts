import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ContentUpdateManyWithoutDoItYourselfNestedInputSchema } from './ContentUpdateManyWithoutDoItYourselfNestedInputSchema';

export const DoItYourselfUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.DoItYourselfUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutDoItYourselfNestedInputSchema).optional()
}).strict();

export default DoItYourselfUpdateWithoutAuthorInputSchema;
