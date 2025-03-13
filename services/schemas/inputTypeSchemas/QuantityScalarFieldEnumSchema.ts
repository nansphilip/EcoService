import { z } from 'zod';

export const QuantityScalarFieldEnumSchema = z.enum(['id','quantity','productId','orderId','createdAt','updatedAt']);

export default QuantityScalarFieldEnumSchema;
