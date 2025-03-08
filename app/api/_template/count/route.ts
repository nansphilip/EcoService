import { selectModelNameAmountSchema, SelectModelNameListProps } from "@actions/types/_template";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached count of modelNames
 * @param stringParams Filtering parameters in JSON format
 * @returns Count of modelNames or null if no modelNames found
 */
const SelectModelNameAmountCached = cache(
    async (stringParams: string): Promise<number | null> => {
        // Parse the params as object
        const params: SelectModelNameListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { where } = selectModelNameAmountSchema.parse(params);

        const modelNameAmount = await PrismaInstance.modelName.count({
            ...(where && { where }),
        });

        return modelNameAmount ? modelNameAmount : null;
    },
    ["modelNames"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["modelNames"],
    },
);

export type SelectModelNameAmountResponse =
    | {
          data: number | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for modelNames count API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing modelName count or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectModelNameAmountResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the modelName count
        const modelNameAmount: number | null = await SelectModelNameAmountCached(stringParams);

        // Return the modelName count
        return NextResponse.json({ data: modelNameAmount });
    } catch (error) {
        console.error("SelectModelNameAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "Invalid params -> " + error.message }, { status: 400 });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "Prisma error -> " + error.message }, { status: 500 });
            return NextResponse.json({ error: "Something went wrong..." + (error as Error).message }, { status: 500 });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}; 