import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RoleSchema } from './RoleSchema';

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  role: z.lazy(() => RoleSchema).optional(),
  phone: z.string().optional().nullable(),
  stripeId: z.string().optional().nullable(),
  stripeConnectId: z.string().optional().nullable(),
  isOnboarded: z.boolean().optional(),
  isSeller: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default UserCreateManyInputSchema;
