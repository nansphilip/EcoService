import { z } from 'zod';

export const FruitScalarFieldEnumSchema = z.enum(['id','name','description','image','createdAt','updatedAt']);

export default FruitScalarFieldEnumSchema;
