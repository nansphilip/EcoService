import { z } from 'zod';

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','image','phone','stripeId','stripeConnectId']);

export default UserOrderByRelevanceFieldEnumSchema;
