import { z } from 'zod';

export const AccountScalarFieldEnumSchema = z.enum(['id','accountId','providerId','userId','accessToken','refreshToken','accessTokenExpiresAt','refreshTokenExpiresAt','scope','idToken','password','createdAt','updatedAt']);

export default AccountScalarFieldEnumSchema;
