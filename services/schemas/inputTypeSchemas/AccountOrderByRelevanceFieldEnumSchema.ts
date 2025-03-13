import { z } from 'zod';

export const AccountOrderByRelevanceFieldEnumSchema = z.enum(['id','accountId','providerId','userId','accessToken','refreshToken','scope','idToken','password']);

export default AccountOrderByRelevanceFieldEnumSchema;
