import { z } from 'zod';

export const ProductOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description','image','vendorId','categoryId']);

export default ProductOrderByRelevanceFieldEnumSchema;
