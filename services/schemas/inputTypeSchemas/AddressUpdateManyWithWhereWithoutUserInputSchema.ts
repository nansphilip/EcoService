import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AddressScalarWhereInputSchema } from './AddressScalarWhereInputSchema';
import { AddressUpdateManyMutationInputSchema } from './AddressUpdateManyMutationInputSchema';
import { AddressUncheckedUpdateManyWithoutUserInputSchema } from './AddressUncheckedUpdateManyWithoutUserInputSchema';

export const AddressUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AddressUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AddressScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AddressUpdateManyMutationInputSchema),z.lazy(() => AddressUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default AddressUpdateManyWithWhereWithoutUserInputSchema;
