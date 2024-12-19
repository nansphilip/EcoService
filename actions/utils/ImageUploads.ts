"use server";

import { promises as fs } from "fs";
import { StringToSlug } from "./StringToSlug";

type SendImageToServerProps = {
    imageName: string;
    imageExtension: string;
    imageFile: File;
    folderName: string;
};

export default async function ImageUploads(props: SendImageToServerProps) {
    try {
        const { imageName, imageExtension, imageFile, folderName } = props;

        // TODO : add image validation

        // Convert image to buffer
        const imageBuffer = await imageFile.arrayBuffer();

        // Get image name
        const slugImageName = await StringToSlug(imageName);

        // Create complete image name
        const newImageName = slugImageName + imageExtension;

        // Import image to public folder
        await fs.writeFile(
            `${process.cwd()}/public/${folderName}/${newImageName}`,
            Buffer.from(imageBuffer)
        );

        return true;
    } catch (error) {
        console.log(error);
        return false;
        // throw new Error("ImageUploads -> " + (error as Error).message);
    }
}
