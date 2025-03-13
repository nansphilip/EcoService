import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','role','phone','stripeId','stripeConnectId','isOnboarded','isSeller','createdAt','updatedAt']);

export default UserScalarFieldEnumSchema;
