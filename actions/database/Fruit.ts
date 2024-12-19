"use server";

import { SelectFruitByIdProps, FruitTypeReturn } from "@actions/types/Fruit";
import { existingFile } from "@actions/utils/checkfile";
import Prisma from "@lib/prisma";

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

        const fileExists = await existingFile(fruitData.image, "public");

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
            const fileExists = await existingFile(fruit.image, "public");

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

        const fileExists = await existingFile(fruitData.image, "public");

        if (!fileExists) {
            fruitData.image = null;
        }

        return fruitData;
    } catch (error) {
        throw new Error("SelectRandomFruit -> " + (error as Error).message);
    }
};
