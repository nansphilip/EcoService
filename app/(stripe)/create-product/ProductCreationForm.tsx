"use client";

import { CreateStripeProduct } from "@actions/process/CreateStripeProduct";
import { CompleteCategory } from "@actions/zod-generated";
import Card from "@comps/server/Card";
import FeedbackClient, { FeedbackMode } from "@comps/ui/Feedback";
import { combo } from "@lib/combo";
import Button from "@ui/Button";
import Input from "@ui/Input";
import InputImage from "@ui/InputImage";
import Select from "@ui/Select";
import { useState } from "react";

type ProductCreationFormPros = {
    categoryList: CompleteCategory[];
};

export default function ProductCreationForm(props: ProductCreationFormPros) {
    const { categoryList } = props;

    // Input states
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    // Feedback
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            
            if (!name || !description || !price || !categoryId || !image) {
                setMode("warning");
                setMessage("Veuillez remplir tous les champs");
                return;
            }

            const { status, message } = await CreateStripeProduct({
                name,
                description,
                price,
                categoryId,
                image,
            });

            if (status) {
                setMode("success");
                setMessage(message);
            } else {
                setMode("error");
                setMessage(message);
            }
        } catch {
            setMode("error");
            setMessage("Une erreur est survenue...");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="rounded-3xl border border-white/15 bg-white/5 text-white p-8 backdrop-blur-lg md:w-[600px]">
            <form className="space-y-8">
                <Input label="Nom du produit" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <Input
                    label="Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Input label="Prix" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />

                <Select
                    label="Catégorie"
                    placeholder="Sélectionnez une catégorie"
                    options={categoryList.map((category) => ({
                        label: category.name,
                        value: category.id,
                    }))}
                    onChange={(e) => setCategoryId(e.target.value)}
                    value={categoryId}
                />

                <InputImage label="Image" onChange={setImage} imagePreview={image} />

                <FeedbackClient message={message} mode={mode} />

                <div className="flex justify-center">
                    <Button
                        type="button"
                        className={combo("bg-cyan-400 text-gray-800", "hover:bg-cyan-300", "focus:ring-white")}
                        label="Créer le produit"
                        loadingLabel="Enregistrement..."
                        isLoading={isLoading}
                        onClick={handleSubmit}
                    >
                        Créer le produit
                    </Button>
                </div>
            </form>
        </Card>
    );
}
