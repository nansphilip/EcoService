import { authorizedFileSize, authorizedFormats } from "@utils/ImageValidation";
import { StringToSlug } from "@utils/StringToSlug";
import { StripeInstance } from "@lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { strictObject, z, ZodError, ZodType } from "zod";
import { ResponseFormat } from "@utils/FetchConfig";

export type StripeFileUploadBody = {
    file: File;
    fileNameToSlugify: string;
};

const StripeFileUploadBodySchema: ZodType<StripeFileUploadBody> = strictObject({
    fileNameToSlugify: z.string(),
    file: z.instanceof(File),
});

export type StripeFileUploadResponse = string;

export async function POST(request: NextRequest): Promise<NextResponse<ResponseFormat<StripeFileUploadResponse>>> {
    try {
        // Get the params and decode them
        const formData = await request.formData();
        const params = Object.fromEntries(formData.entries());
        const { file, fileNameToSlugify } = StripeFileUploadBodySchema.parse(params);

        if (!file || !fileNameToSlugify) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Convert File to Buffer
        const fileBytes = await file.bytes();
        const fileBuffer = Buffer.from(fileBytes);

        // Check if the file size is too big
        if (fileBuffer.length > authorizedFileSize) {
            return NextResponse.json({ error: "File size too big" }, { status: 400 });
        }

        // Slugify the image name
        const fileNameSlugified = await StringToSlug(fileNameToSlugify);

        // Get the file extension
        const fileExtension = file.type.replace("image/", "");

        // Check if the file extension is authorized
        if (!authorizedFormats.includes(fileExtension)) {
            return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
        }

        // Create the file name
        const fileName = fileNameSlugified + "." + fileExtension;

        // Upload file to Stripe
        const uploadedFile = await StripeInstance.files.create({
            purpose: "dispute_evidence",
            file: {
                data: fileBuffer,
                name: fileName,
                type: "application/octet-stream",
            },
        });

        // Check if the file was uploaded successfully
        if (!uploadedFile.id) {
            throw new Error("Failed to upload file to Stripe");
        }

        // Create a file link for the uploaded file
        const fileLink = await StripeInstance.fileLinks.create({
            file: uploadedFile.id,
            expires_at: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60, // 1 year from now
        });

        // Check if the file link was created successfully
        if (!fileLink.url) {
            throw new Error("Failed to create file link");
        }

        return NextResponse.json({ data: fileLink.url }, { status: 200 });
    } catch (error) {
        console.error("StripeFileUpload -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "StripeFileUpload -> Invalid Zod params -> " + error.message });
            return NextResponse.json({ error: "StripeFileUpload -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}
