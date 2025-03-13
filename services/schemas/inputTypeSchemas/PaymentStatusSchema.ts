import { z } from 'zod';

export const PaymentStatusSchema = z.enum(['PENDING','ACCEPTED','REFUSED','REFUNDED']);

export type PaymentStatusType = `${z.infer<typeof PaymentStatusSchema>}`

export default PaymentStatusSchema;
