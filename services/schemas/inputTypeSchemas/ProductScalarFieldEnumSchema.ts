import { z } from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id','name','description','image','price','stock','vendorId','categoryId','createdAt','updatedAt']);

export default ProductScalarFieldEnumSchema;
