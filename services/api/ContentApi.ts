import ContentService from "@services/class/ContentClass";
import { CountContentProps, CountContentResponse, FindManyContentProps, FindManyContentResponse, FindUniqueContentProps, FindUniqueContentResponse } from "@services/types/ContentType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Exact } from "@utils/FetchConfig";

// ============== API Routes Types ============== //

export type ContentRoutes<Input> = {
    "/content": {
        params: Exact<FindManyContentProps, Input extends FindManyContentProps ? Input : never>,
        response: FindManyContentResponse<Input extends FindManyContentProps ? Input : never>
    },
    "/content/unique": {
        params: Exact<FindUniqueContentProps, Input extends FindUniqueContentProps ? Input : never>,
        response: FindUniqueContentResponse<Input extends FindUniqueContentProps ? Input : never>
    },
    "/content/count": {
        params: CountContentProps,
        response: CountContentResponse
    }
}

// ==================== Find Many ==================== //

const contentListCached = cache(async <T extends FindManyContentProps>(params: Exact<FindManyContentProps, T>) => ContentService.findMany(params), ["content"], {
    revalidate,
    tags: ["content"],
});

export const SelectContentList = async <T extends FindManyContentProps>(request: NextRequest) => {
    try {
        const params: Exact<FindManyContentProps, T> = parseAndDecodeParams(request);
        const response = await contentListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getContentListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const contentUniqueCached = cache(
    async <T extends FindUniqueContentProps>(params: Exact<FindUniqueContentProps, T>) => ContentService.findUnique(params),
    ["content/unique"],
    { revalidate, tags: ["content/unique"] },
);

export const SelectContentUnique = async <T extends FindUniqueContentProps>(request: NextRequest) => {
    try {
        const params: Exact<FindUniqueContentProps, T> = parseAndDecodeParams(request);
        const response = await contentUniqueCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getContentUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const contentCountCached = cache(async (params: CountContentProps) => ContentService.count(params), ["content/count"], {
    revalidate,
    tags: ["content/count"],
});

export const SelectContentCount = async (request: NextRequest) => {
    try {
        const params: CountContentProps = parseAndDecodeParams(request);
        const response = await contentCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getContentCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
