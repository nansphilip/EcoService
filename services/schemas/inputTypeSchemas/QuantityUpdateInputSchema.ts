import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { ProductUpdateOneRequiredWithoutQuantityNestedInputSchema } from './ProductUpdateOneRequiredWithoutQuantityNestedInputSchema';
import { OrderUpdateOneRequiredWithoutQuantityNestedInputSchema } from './OrderUpdateOneRequiredWithoutQuantityNestedInputSchema';

export const QuantityUpdateInputSchema: z.ZodType<Prisma.QuantityUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutQuantityNestedInputSchema).optional(),
  Order: z.lazy(() => OrderUpdateOneRequiredWithoutQuantityNestedInputSchema).optional()
}).strict();

export default QuantityUpdateInputSchema;
