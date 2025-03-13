import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ArticleFindManyArgsSchema } from "../outputTypeSchemas/ArticleFindManyArgsSchema"
import { DoItYourselfFindManyArgsSchema } from "../outputTypeSchemas/DoItYourselfFindManyArgsSchema"
import { AddressFindManyArgsSchema } from "../outputTypeSchemas/AddressFindManyArgsSchema"
import { OrderFindManyArgsSchema } from "../outputTypeSchemas/OrderFindManyArgsSchema"
import { ProductFindManyArgsSchema } from "../outputTypeSchemas/ProductFindManyArgsSchema"
import { SessionFindManyArgsSchema } from "../outputTypeSchemas/SessionFindManyArgsSchema"
import { AccountFindManyArgsSchema } from "../outputTypeSchemas/AccountFindManyArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Article: z.union([z.boolean(),z.lazy(() => ArticleFindManyArgsSchema)]).optional(),
  DoItYourself: z.union([z.boolean(),z.lazy(() => DoItYourselfFindManyArgsSchema)]).optional(),
  Adress: z.union([z.boolean(),z.lazy(() => AddressFindManyArgsSchema)]).optional(),
  Order: z.union([z.boolean(),z.lazy(() => OrderFindManyArgsSchema)]).optional(),
  Product: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  Session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  Account: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default UserIncludeSchema;
