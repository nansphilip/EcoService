import { z } from 'zod';

export const AddressScalarFieldEnumSchema = z.enum(['id','address','postal','city','country','isDefault','userId','createdAt','updatedAt']);

export default AddressScalarFieldEnumSchema;
