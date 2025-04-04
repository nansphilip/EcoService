"use client";

import ButtonClient from "@comps/client/button";
import InputClient from "@comps/client/input";
import Card from "@comps/server/card";
import { Content, ImageCard, Img, Text, Title } from "@comps/server/imageCard";
import Feedback, { FeedbackMode } from "@comps/ui/feedback";
import { ChangeEvent, useState } from "react";
import { CreateFruit } from "./utils/FruitActions";
import { ImageValidation } from "./utils/ImageUploads";

export default function AddFruitClient() {
    const [isLoading, setIsLoading] = useState(false);

    const [message, setMessage] = useState<string>("");
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>();

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0] as File;

        const {status, message} = await ImageValidation({ imageFile });

        if (status) {
            setMessage(message);
            setMode("info");
            setIsFeedbackOpen(true);
            setImage(imageFile);
        } else {
            setMessage(message);
            setMode("warning");
            setIsFeedbackOpen(true);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!name || !description || !image) {
            setMessage("Please fill all fields.");
            setMode("warning");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        const fruitData = await CreateFruit({
            name,
            description,
            imageFile: image,
        });

        if (fruitData === "Already exists") {
            setMessage("This fruit already exists.");
            setMode("warning");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        } else if (!fruitData) {
            setMessage("Upload failed, please try again later.");
            setMode("error");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        setMessage("Fruit added with success.");
        setMode("success");
        setIsFeedbackOpen(true);
        setIsLoading(false);
    };

    return (
        <div className="space-y-4">
            <ImageCard>
                <Img src={image ? URL.createObjectURL(image) : null} alt="Preview" />
                <Content>
                    <Title>{name !== "" ? name : "Fruit Preview"}</Title>
                    <Text>
                        {description !== ""
                            ? description
                            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam excepturi unde expedita debitis ea ducimus..."}
                    </Text>
                </Content>
            </ImageCard>
            <Card className="flex flex-col items-center gap-4">
                <h1 className="text-center text-xl font-bold">Add fruit</h1>
                <div className="text-wrap text-center text-xs text-gray-500">Fill the fields to add a new fruit.</div>
                <InputClient
                    type="text"
                    label="name"
                    classDiv="w-full"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <InputClient
                    type="text"
                    label="description"
                    classDiv="w-full"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <InputClient label="file" type="file" onChange={handleImageChange} />
                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />
                <ButtonClient type="button" label="add-fruit" onClick={handleSubmit} isLoading={isLoading}>
                    Add new fruit
                </ButtonClient>
            </Card>
        </div>
    );
}
