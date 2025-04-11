import CategoryService from "@services/class/CategoryClass";
import { CountCategoryProps, CountCategoryResponse, FindManyCategoryProps, FindManyCategoryResponse, FindUniqueCategoryProps, FindUniqueCategoryResponse } from "@services/types/CategoryType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Exact } from "@utils/FetchConfig";

// ============== API Routes Types ============== //

export type CategoryRoutes<Input> = {
    "/category": {
        params: Exact<FindManyCategoryProps, Input extends FindManyCategoryProps ? Input : never>,
        response: FindManyCategoryResponse<Input extends FindManyCategoryProps ? Input : never>
    },
    "/category/unique": {
        params: Exact<FindUniqueCategoryProps, Input extends FindUniqueCategoryProps ? Input : never>,
        response: FindUniqueCategoryResponse<Input extends FindUniqueCategoryProps ? Input : never>
    },
    "/category/count": {
        params: CountCategoryProps,
        response: CountCategoryResponse
    }
}

// ==================== Find Many ==================== //

const categoryListCached = cache(async <T extends FindManyCategoryProps>(params: Exact<FindManyCategoryProps, T>) => CategoryService.findMany(params), ["category"], {
    revalidate,
    tags: ["category"],
});

export const SelectCategoryList = async <T extends FindManyCategoryProps>(request: NextRequest) => {
    try {
        const params: Exact<FindManyCategoryProps, T> = parseAndDecodeParams(request);
        const response = await categoryListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getCategoryListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const categoryUniqueCached = cache(
    async <T extends FindUniqueCategoryProps>(params: Exact<FindUniqueCategoryProps, T>) => CategoryService.findUnique(params),
    ["category/unique"],
    { revalidate, tags: ["category/unique"] },
);

export const SelectCategoryUnique = async <T extends FindUniqueCategoryProps>(request: NextRequest) => {
    try {
        const params: Exact<FindUniqueCategoryProps, T> = parseAndDecodeParams(request);
        const response = await categoryUniqueCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getCategoryUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const categoryCountCached = cache(async (params: CountCategoryProps) => CategoryService.count(params), ["category/count"], {
    revalidate,
    tags: ["category/count"],
});

export const SelectCategoryCount = async (request: NextRequest) => {
    try {
        const params: CountCategoryProps = parseAndDecodeParams(request);
        const response = await categoryCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getCategoryCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
