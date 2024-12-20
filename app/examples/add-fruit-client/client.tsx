"use client";

import { CreateFruit } from "@actions/database/Fruit";
import ImageUploads from "@actions/utils/ImageUploads";
import { StringToSlug } from "@actions/utils/StringToSlug";
import ButtonClient from "@comps/client/Button";
import InputClient from "@comps/client/Input";
import Card from "@comps/server/Card";
import FeedbackClient, { FeedbackProps } from "@comps/server/Feedback";
import { useState } from "react";

export default function AddFruitClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<FeedbackProps["message"]>("");
    const [mode, setMode] = useState<FeedbackProps["mode"]>("");
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0] as File;

        if (!imageFile) {
            setImportFeedback("Aucun fichier sélectionné");
            return
        }

        const ext = "."+imageFile.name.split(".").pop();
        const name = imageFile.name.replace(ext, "")
        console.log(name, ext);

        const imageExtensions = ["image/jpeg", "image/png", "image/webp"];
        const imageSize = 5 * 1024 * 1024; // 5MB

            if (imageFile.size > imageSize) {
                return setImportFeedback("Fichier trop volumineux");
            }

            if (!imageExtensions.includes(imageFile.type)) {
                return setImportFeedback("Format de fichier invalide");
            }

        // Store raw file list
        setImportFeedback("Fichiers importés avec succès");
        setImage(imageFile);
    }

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!name || !description || !image) {
            setMessage("Please fill all fields.");
            setMode("warning");
            setIsLoading(false);
            return;
        }

        const uploadSucceeded = await ImageUploads({imageName: image.name, imageExtension: image.type, imageFile:image, folderName: "fruit"});

        if (!uploadSucceeded) {
            setMessage("Upload failed, please try again later.");
            setMode("error");
            setIsLoading(false);
            return;
        }

        const fruitData = await CreateFruit({ name, description, extension });

        if (!fruitData) {
            setMessage("Creation failed, please try again later.");
            setMode("error");
            setIsLoading(false);
            return;
        }
        
        setMessage("Fruit added with success.");
        setMode("success");
        setIsLoading(false);
    };

    return (
        <Card className="space-y-4">
            <InputClient
                type="text"
                label="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <InputClient
                type="text"
                label="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            <InputClient
                label="file"
                type="file"
                onChange={handleImageChange}
            />
            <FeedbackClient message={message} mode={mode} />
            <ButtonClient
                type="button"
                onClick={handleSubmit}
                isLoading={isLoading}
            >
                Add new fruit
            </ButtonClient>
        </Card>
    );
}
