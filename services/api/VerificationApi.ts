import VerificationService from "@services/class/VerificationClass";
import { CountVerificationProps, CountVerificationResponse, FindManyVerificationProps, FindManyVerificationResponse, FindUniqueVerificationProps, FindUniqueVerificationResponse } from "@services/types/VerificationType";
import { parseAndDecodeParams, revalidate } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Exact } from "@utils/FetchConfig";

// ============== API Routes Types ============== //

export type VerificationRoutes<Input> = {
    "/verification": {
        params: Exact<FindManyVerificationProps, Input extends FindManyVerificationProps ? Input : never>,
        response: FindManyVerificationResponse<Input extends FindManyVerificationProps ? Input : never>
    },
    "/verification/unique": {
        params: Exact<FindUniqueVerificationProps, Input extends FindUniqueVerificationProps ? Input : never>,
        response: FindUniqueVerificationResponse<Input extends FindUniqueVerificationProps ? Input : never>
    },
    "/verification/count": {
        params: CountVerificationProps,
        response: CountVerificationResponse
    }
}

// ==================== Find Many ==================== //

const verificationListCached = cache(async <T extends FindManyVerificationProps>(params: Exact<FindManyVerificationProps, T>) => VerificationService.findMany(params), ["verification"], {
    revalidate,
    tags: ["verification"],
});

export const SelectVerificationList = async <T extends FindManyVerificationProps>(request: NextRequest) => {
    try {
        const params: Exact<FindManyVerificationProps, T> = parseAndDecodeParams(request);
        const response = await verificationListCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getVerificationListCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Find Unique ==================== //

const verificationUniqueCached = cache(
    async <T extends FindUniqueVerificationProps>(params: Exact<FindUniqueVerificationProps, T>) => VerificationService.findUnique(params),
    ["verification/unique"],
    { revalidate, tags: ["verification/unique"] },
);

export const SelectVerificationUnique = async <T extends FindUniqueVerificationProps>(request: NextRequest) => {
    try {
        const params: Exact<FindUniqueVerificationProps, T> = parseAndDecodeParams(request);
        const response = await verificationUniqueCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getVerificationUniqueCached -> " + (error as Error).message }, { status: 500 });
    }
};

// ==================== Count ==================== //

const verificationCountCached = cache(async (params: CountVerificationProps) => VerificationService.count(params), ["verification/count"], {
    revalidate,
    tags: ["verification/count"],
});

export const SelectVerificationCount = async (request: NextRequest) => {
    try {
        const params: CountVerificationProps = parseAndDecodeParams(request);
        const response = await verificationCountCached(params);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "getVerificationCountCached -> " + (error as Error).message }, { status: 500 });
    }
};
