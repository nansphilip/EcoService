import DiyService from "@services/class/DiyClass";
import { CountDiyProps, CountDiyResponse, FindManyDiyProps, FindManyDiyResponse, FindUniqueDiyProps, FindUniqueDiyResponse } from "@services/types/DiyType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Exact } from "@utils/FetchConfig";

// ============== API Routes Types ============== //

export type DiyRoutes<Input> = {
    "/diy": {
        params: Exact<FindManyDiyProps, Input extends FindManyDiyProps ? Input : never>,
        response: FindManyDiyResponse<Input extends FindManyDiyProps ? Input : never>
    },
    "/diy/unique": {
        params: Exact<FindUniqueDiyProps, Input extends FindUniqueDiyProps ? Input : never>,
        response: FindUniqueDiyResponse<Input extends FindUniqueDiyProps ? Input : never>
    },
    "/diy/count": {
        params: CountDiyProps,
        response: CountDiyResponse
    }
}

// ==================== Find Many ==================== //

const diyListCached = cache(async <T extends FindManyDiyProps>(params: Exact<FindManyDiyProps, T>) => DiyService.findMany(params), ["diy"], {
    revalidate,
    tags: ["diy"],
});

export const SelectDiyList = async <T extends FindManyDiyProps>(request: NextRequest) => {
    try {
        const params: Exact<FindManyDiyProps, T> = parseAndDecodeParams(request);
        const response = await diyListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getDiyListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const diyUniqueCached = cache(
    async <T extends FindUniqueDiyProps>(params: Exact<FindUniqueDiyProps, T>) => DiyService.findUnique(params),
    ["diy/unique"],
    { revalidate, tags: ["diy/unique"] },
);

export const SelectDiyUnique = async <T extends FindUniqueDiyProps>(request: NextRequest) => {
    try {
        const params: Exact<FindUniqueDiyProps, T> = parseAndDecodeParams(request);
        const response = await diyUniqueCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getDiyUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const diyCountCached = cache(async (params: CountDiyProps) => DiyService.count(params), ["diy/count"], {
    revalidate,
    tags: ["diy/count"],
});

export const SelectDiyCount = async (request: NextRequest) => {
    try {
        const params: CountDiyProps = parseAndDecodeParams(request);
        const response = await diyCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getDiyCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
