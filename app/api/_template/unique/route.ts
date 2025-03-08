import { ModelNameType, selectModelNameObjectSchema, SelectModelNameProps } from "@actions/types/_template";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Retrieves a cached modelName by ID
 * @param stringParams Parameters containing the modelName ID in JSON format
 * @returns ModelName or null if not found
 */
const SelectModelNameCached = cache(
    async (stringParams: string): Promise<ModelNameType | null> => {
        // Parse the params as object
        const params: SelectModelNameProps = JSON.parse(stringParams);

        const { where } = selectModelNameObjectSchema.parse(params);

        const modelNameData: ModelNameType | null = await PrismaInstance.modelName.findUnique({
            where,
        });

        return modelNameData;
    },
    ["/modelNames/unique"],
    {
        /**
         * Cache revalidation
         * - development : revalidate every 5 seconds
         * - production : revalidate every 5 minutes
         */
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["/modelNames/unique"],
    },
);

export type SelectModelNameResponse =
    | {
          data: ModelNameType | null;
      }
    | {
          error: string;
      };

/**
 * GET route handler for single modelName API
 * @param request Incoming request with modelName ID
 * @returns JSON response containing modelName or error message
 */
export const GET = async (request: NextRequest): Promise<NextResponse<SelectModelNameResponse>> => {
    try {
        // Get the params and decode them
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Get the modelName
        const modelName: ModelNameType | null = await SelectModelNameCached(stringParams);

        // Return the modelName
        return NextResponse.json({ data: modelName });
    } catch (error) {
        console.error("SelectModelName -> " + (error as Error).message);
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