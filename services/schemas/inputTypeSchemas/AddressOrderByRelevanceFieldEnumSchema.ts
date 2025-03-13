import { z } from 'zod';

export const AddressOrderByRelevanceFieldEnumSchema = z.enum(['id','address','postal','city','country','userId']);

export default AddressOrderByRelevanceFieldEnumSchema;
