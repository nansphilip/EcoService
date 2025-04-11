import QuantityService from "@services/class/QuantityClass";
import { CountQuantityProps, CountQuantityResponse, FindManyQuantityProps, FindManyQuantityResponse, FindUniqueQuantityProps, FindUniqueQuantityResponse } from "@services/types/QuantityType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Exact } from "@utils/FetchConfig";

// ============== API Routes Types ============== //

export type QuantityRoutes<Input> = {
    "/quantity": {
        params: Exact<FindManyQuantityProps, Input extends FindManyQuantityProps ? Input : never>,
        response: FindManyQuantityResponse<Input extends FindManyQuantityProps ? Input : never>
    },
    "/quantity/unique": {
        params: Exact<FindUniqueQuantityProps, Input extends FindUniqueQuantityProps ? Input : never>,
        response: FindUniqueQuantityResponse<Input extends FindUniqueQuantityProps ? Input : never>
    },
    "/quantity/count": {
        params: CountQuantityProps,
        response: CountQuantityResponse
    }
}

// ==================== Find Many ==================== //

const quantityListCached = cache(async <T extends FindManyQuantityProps>(params: Exact<FindManyQuantityProps, T>) => QuantityService.findMany(params), ["quantity"], {
    revalidate,
    tags: ["quantity"],
});

export const SelectQuantityList = async <T extends FindManyQuantityProps>(request: NextRequest) => {
    try {
        const params: Exact<FindManyQuantityProps, T> = parseAndDecodeParams(request);
        const response = await quantityListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getQuantityListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const quantityUniqueCached = cache(
    async <T extends FindUniqueQuantityProps>(params: Exact<FindUniqueQuantityProps, T>) => QuantityService.findUnique(params),
    ["quantity/unique"],
    { revalidate, tags: ["quantity/unique"] },
);

export const SelectQuantityUnique = async <T extends FindUniqueQuantityProps>(request: NextRequest) => {
    try {
        const params: Exact<FindUniqueQuantityProps, T> = parseAndDecodeParams(request);
        const response = await quantityUniqueCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getQuantityUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const quantityCountCached = cache(async (params: CountQuantityProps) => QuantityService.count(params), ["quantity/count"], {
    revalidate,
    tags: ["quantity/count"],
});

export const SelectQuantityCount = async (request: NextRequest) => {
    try {
        const params: CountQuantityProps = parseAndDecodeParams(request);
        const response = await quantityCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getQuantityCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
