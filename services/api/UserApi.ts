import UserService from "@services/class/UserClass";
import { CountUserProps, CountUserResponse, FindManyUserProps, FindManyUserResponse, FindUniqueUserProps, FindUniqueUserResponse } from "@services/types/UserType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Exact } from "@utils/FetchConfig";

// ============== API Routes Types ============== //

export type UserRoutes<Input> = {
    "/user": {
        params: Exact<FindManyUserProps, Input extends FindManyUserProps ? Input : never>,
        response: FindManyUserResponse<Input extends FindManyUserProps ? Input : never>
    },
    "/user/unique": {
        params: Exact<FindUniqueUserProps, Input extends FindUniqueUserProps ? Input : never>,
        response: FindUniqueUserResponse<Input extends FindUniqueUserProps ? Input : never>
    },
    "/user/count": {
        params: CountUserProps,
        response: CountUserResponse
    }
}

// ==================== Find Many ==================== //

const userListCached = cache(async <T extends FindManyUserProps>(params: Exact<FindManyUserProps, T>) => UserService.findMany(params), ["user"], {
    revalidate,
    tags: ["user"],
});

export const SelectUserList = async <T extends FindManyUserProps>(request: NextRequest) => {
    try {
        const params: Exact<FindManyUserProps, T> = parseAndDecodeParams(request);
        const response = await userListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getUserListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const userUniqueCached = cache(
    async <T extends FindUniqueUserProps>(params: Exact<FindUniqueUserProps, T>) => UserService.findUnique(params),
    ["user/unique"],
    { revalidate, tags: ["user/unique"] },
);

export const SelectUserUnique = async <T extends FindUniqueUserProps>(request: NextRequest) => {
    try {
        const params: Exact<FindUniqueUserProps, T> = parseAndDecodeParams(request);
        const response = await userUniqueCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getUserUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const userCountCached = cache(async (params: CountUserProps) => UserService.count(params), ["user/count"], {
    revalidate,
    tags: ["user/count"],
});

export const SelectUserCount = async (request: NextRequest) => {
    try {
        const params: CountUserProps = parseAndDecodeParams(request);
        const response = await userCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getUserCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
