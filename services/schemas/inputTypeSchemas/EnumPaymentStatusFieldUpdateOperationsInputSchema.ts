import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PaymentStatusSchema } from './PaymentStatusSchema';

export const EnumPaymentStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPaymentStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PaymentStatusSchema).optional()
}).strict();

export default EnumPaymentStatusFieldUpdateOperationsInputSchema;
