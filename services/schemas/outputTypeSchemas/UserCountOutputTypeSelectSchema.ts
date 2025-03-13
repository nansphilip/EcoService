import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  Article: z.boolean().optional(),
  DoItYourself: z.boolean().optional(),
  Adress: z.boolean().optional(),
  Order: z.boolean().optional(),
  Product: z.boolean().optional(),
  Session: z.boolean().optional(),
  Account: z.boolean().optional(),
}).strict();

export default UserCountOutputTypeSelectSchema;
