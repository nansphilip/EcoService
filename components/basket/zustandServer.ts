import "server-only";
import { cookies } from "next/headers";
import { z, ZodSchema } from "zod";
import { StorageValue } from "zustand/middleware";

/**
 * Get the Zustand cookie on the server side
 * @example
 * const basketCookie = await getZustandCookie<Basket>("basket-cookie", BasketSchema, "basket");
 */
export const getZustandCookie = async <Type>(
    name: string,
    schema: ZodSchema<Type>,
    propertyToExtract: string,
): Promise<Type | null> => {
    const cookieStore = await cookies();
    const value = cookieStore.get(name)?.value;

    if (!value) return null;

    const decoded = decodeURIComponent(value);
    const parsedObject = JSON.parse(decoded);

    const cookieStorageSchema: ZodSchema<StorageValue<{ [key: string]: Type }>> = z.object({
        state: z.object({ [propertyToExtract]: schema }),
        version: z.coerce.number().optional(),
    }) as ZodSchema<StorageValue<{ [key: string]: Type }>>;

    const { state } = cookieStorageSchema.parse(parsedObject);

    return state[propertyToExtract];
};
