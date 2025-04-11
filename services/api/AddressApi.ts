import AddressService from "@services/class/AddressClass";
import { CountAddressProps, CountAddressResponse, FindManyAddressProps, FindManyAddressResponse, FindUniqueAddressProps, FindUniqueAddressResponse } from "@services/types/AddressType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Exact } from "@utils/FetchConfig";

// ============== API Routes Types ============== //

export type AddressRoutes<Input> = {
    "/address": {
        params: Exact<FindManyAddressProps, Input extends FindManyAddressProps ? Input : never>,
        response: FindManyAddressResponse<Input extends FindManyAddressProps ? Input : never>
    },
    "/address/unique": {
        params: Exact<FindUniqueAddressProps, Input extends FindUniqueAddressProps ? Input : never>,
        response: FindUniqueAddressResponse<Input extends FindUniqueAddressProps ? Input : never>
    },
    "/address/count": {
        params: CountAddressProps,
        response: CountAddressResponse
    }
}

// ==================== Find Many ==================== //

const addressListCached = cache(async <T extends FindManyAddressProps>(params: Exact<FindManyAddressProps, T>) => AddressService.findMany(params), ["address"], {
    revalidate,
    tags: ["address"],
});

export const SelectAddressList = async <T extends FindManyAddressProps>(request: NextRequest) => {
    try {
        const params: Exact<FindManyAddressProps, T> = parseAndDecodeParams(request);
        const response = await addressListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAddressListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const addressUniqueCached = cache(
    async <T extends FindUniqueAddressProps>(params: Exact<FindUniqueAddressProps, T>) => AddressService.findUnique(params),
    ["address/unique"],
    { revalidate, tags: ["address/unique"] },
);

export const SelectAddressUnique = async <T extends FindUniqueAddressProps>(request: NextRequest) => {
    try {
        const params: Exact<FindUniqueAddressProps, T> = parseAndDecodeParams(request);
        const response = await addressUniqueCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAddressUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const addressCountCached = cache(async (params: CountAddressProps) => AddressService.count(params), ["address/count"], {
    revalidate,
    tags: ["address/count"],
});

export const SelectAddressCount = async (request: NextRequest) => {
    try {
        const params: CountAddressProps = parseAndDecodeParams(request);
        const response = await addressCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getAddressCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
