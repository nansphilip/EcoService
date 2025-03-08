import { ModelNameType, SelectModelNameListProps, selectModelNameListSchema } from "@actions/types/_template";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached list of modelNames
 * @param stringParams Filtering and pagination parameters in JSON format
 * @returns List of modelNames or null if no modelNames found
 */
const SelectModelNameListCached = cache(
    async (stringParams: string): Promise<ModelNameType[] | null> => {
        // Parse the params as object
        const params: SelectModelNameListProps = JSON.parse(stringParams);

        // Validate the params with zod
        const { orderBy, take = 10, skip = 0, where } = selectModelNameListSchema.parse(params);

        const modelNameDataList: ModelNameType[] = await PrismaInstance.modelName.findMany({
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        console.log("SelectModelNameList -> Revalidating modelNames list from database...");

        // Return the modelName list
        return modelNameDataList.length ? modelNameDataList : null;
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

export type SelectModelNameListResponse =
    | {
          data: ModelNameType[] | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for modelNames API
 * @param request Incoming request with optional parameters
 * @returns JSON response containing modelName list or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectModelNameListResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the modelName list
        const modelNameList: ModelNameType[] | null = await SelectModelNameListCached(stringParams);

        // Return the modelName list
        return NextResponse.json({ data: modelNameList });
    } catch (error) {
        console.error("SelectModelNameList -> " + (error as Error).message);
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