import ArticleService from "@services/class/ArticleClass";
import { CountArticleProps, CountArticleResponse, FindManyArticleProps, FindManyArticleResponse, FindUniqueArticleProps, FindUniqueArticleResponse } from "@services/types/ArticleType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Exact } from "@utils/FetchConfig";

// ============== API Routes Types ============== //

export type ArticleRoutes<Input> = {
    "/article": {
        params: Exact<FindManyArticleProps, Input extends FindManyArticleProps ? Input : never>,
        response: FindManyArticleResponse<Input extends FindManyArticleProps ? Input : never>
    },
    "/article/unique": {
        params: Exact<FindUniqueArticleProps, Input extends FindUniqueArticleProps ? Input : never>,
        response: FindUniqueArticleResponse<Input extends FindUniqueArticleProps ? Input : never>
    },
    "/article/count": {
        params: CountArticleProps,
        response: CountArticleResponse
    }
}

// ==================== Find Many ==================== //

const articleListCached = cache(async <T extends FindManyArticleProps>(params: Exact<FindManyArticleProps, T>) => ArticleService.findMany(params), ["article"], {
    revalidate,
    tags: ["article"],
});

export const SelectArticleList = async <T extends FindManyArticleProps>(request: NextRequest) => {
    try {
        const params: Exact<FindManyArticleProps, T> = parseAndDecodeParams(request);
        const response = await articleListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getArticleListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const articleUniqueCached = cache(
    async <T extends FindUniqueArticleProps>(params: Exact<FindUniqueArticleProps, T>) => ArticleService.findUnique(params),
    ["article/unique"],
    { revalidate, tags: ["article/unique"] },
);

export const SelectArticleUnique = async <T extends FindUniqueArticleProps>(request: NextRequest) => {
    try {
        const params: Exact<FindUniqueArticleProps, T> = parseAndDecodeParams(request);
        const response = await articleUniqueCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getArticleUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const articleCountCached = cache(async (params: CountArticleProps) => ArticleService.count(params), ["article/count"], {
    revalidate,
    tags: ["article/count"],
});

export const SelectArticleCount = async (request: NextRequest) => {
    try {
        const params: CountArticleProps = parseAndDecodeParams(request);
        const response = await articleCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getArticleCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
