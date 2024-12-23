"use server";

import {
    SelectFruitByIdProps,
    FruitTypeReturn,
    CreateFruitProps,
    FruitType,
} from "@actions/types/Fruit";
import { FileExists } from "@actions/utils/FileExists";
import { ImageUploads } from "@actions/utils/ImageUploads";
import Prisma from "@lib/prisma";

export const CreateFruit = async (
    props: CreateFruitProps
): Promise<FruitTypeReturn | "Already exists" | null> => {
    try {
        const { name, description, imageFile } = props;

        // TODO : zod validation

        const imageFilePath = await ImageUploads({imageFile, imageName: name, folderName: "fruit"});

        if (!imageFilePath) {
            return "Already exists";
        }
        
        const fileExists = await FileExists(imageFilePath, "public");

        if (!fileExists) {
            return null;
        }

        const fruitData: FruitType = await Prisma.fruit.create({
            data: {
                name,
                description,
                image: imageFilePath,
            },
        });

        return fruitData;
    } catch (error) {
        throw new Error("CreateFruit -> " + (error as Error).message);
    }
};

export const SelectFruitById = async (
    props: SelectFruitByIdProps
): Promise<FruitTypeReturn | null> => {
    try {
        const { id } = props;

        if (!id) {
            throw new Error("Some parameters are missing");
        }

        const fruitDataRaw = await Prisma.fruit.findUnique({
            where: {
                id,
            },
        });

        if (!fruitDataRaw) {
            return null;
        }

        const fruitData: FruitTypeReturn = fruitDataRaw;

        const fileExists = await FileExists(fruitData.image, "public");

        if (!fileExists) {
            fruitData.image = null;
        }

        return fruitData;
    } catch (error) {
        throw new Error("SelectFruitById -> " + (error as Error).message);
    }
};

export const SelectEveryFruit = async (): Promise<FruitTypeReturn[] | null> => {
    try {
        const fruitDataListRaw = await Prisma.fruit.findMany();

        if (!fruitDataListRaw.length) {
            return null;
        }

        const fruitDataList: FruitTypeReturn[] = fruitDataListRaw.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        fruitDataList.map(async (fruit) => {
            const fileExists = await FileExists(fruit.image, "public");

            if (!fileExists) {
                fruit.image = null;
            }
        });

        return fruitDataList;
    } catch (error) {
        throw new Error("SelectEveryFruit -> " + (error as Error).message);
    }
};

export const SelectRandomFruit = async (): Promise<FruitTypeReturn | null> => {
    try {
        const fruitDataListRaw = await Prisma.fruit.findMany();

        if (!fruitDataListRaw.length) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * fruitDataListRaw.length);

        const fruitData: FruitTypeReturn = fruitDataListRaw[randomIndex];

        const fileExists = await FileExists(fruitData.image, "public");

        if (!fileExists) {
            fruitData.image = null;
        }

        return fruitData;
    } catch (error) {
        throw new Error("SelectRandomFruit -> " + (error as Error).message);
    }
};
