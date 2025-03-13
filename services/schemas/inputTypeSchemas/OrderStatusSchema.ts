import { z } from 'zod';

export const OrderStatusSchema = z.enum(['PENDING','ACCEPTED','PREPARING','DELIVERING','COMPLETED','CANCELLED','RETURNING','REFOUNDED']);

export type OrderStatusType = `${z.infer<typeof OrderStatusSchema>}`

export default OrderStatusSchema;
