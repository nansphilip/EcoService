import { z } from 'zod';

export const QuantityOrderByRelevanceFieldEnumSchema = z.enum(['id','productId','orderId']);

export default QuantityOrderByRelevanceFieldEnumSchema;
