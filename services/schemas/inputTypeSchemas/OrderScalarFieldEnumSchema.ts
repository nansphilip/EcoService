import { z } from 'zod';

export const OrderScalarFieldEnumSchema = z.enum(['id','orderNumber','orderStatus','paymentStatus','userId','createdAt','updatedAt']);

export default OrderScalarFieldEnumSchema;
