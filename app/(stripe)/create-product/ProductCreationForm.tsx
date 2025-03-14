"use client";

import Card from "@comps/server/Card";
import { combo } from "@lib/combo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ButtonClient from "../../../components/client/Button";

interface Category {
    id: string;
    name: string;
    description?: string;
}

export default function ProductCreationForm() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const [categoryLoading, setCategoryLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        amount: "",
        currency: "eur",
        image: null as File | null,
        categoryId: "",
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name,
                description: editingProduct.description,
                amount: ((editingProduct.default_price?.unit_amount || 0) / 100).toString(),
                currency: "eur",
                image: null,
                categoryId: editingProduct.category?.id || "",
            });
        }
    }, [editingProduct]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories");
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            const data = await response.json();
            setCategories(data.data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
    };

    const createProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log("Creating product...", formData);

        try {
            // Validate required fields
            if (!formData.name.trim() || !formData.description.trim() || !formData.amount.trim() || !formData.categoryId) {
                throw new Error("Veuillez remplir tous les champs obligatoires et sélectionner une catégorie");
            }

            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("amount", formData.amount);
            formDataToSend.append("currency", "eur");
            formDataToSend.append("categoryId", formData.categoryId);
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            console.log("Sending request to API...");
            const response = await fetch(editingProduct ? `/api/stripe/products/${editingProduct.id}` : "/api/stripe/products", {
                method: editingProduct ? "PUT" : "POST",
                body: formDataToSend,
            });

            console.log("API response status:", response.status);
            const data = await response.json();
            console.log("API response data:", data);

            if (!response.ok) {
                if (response.status === 401) {
                    alert("Vous devez être connecté pour créer un produit. Veuillez vous connecter et réessayer.");
                    return;
                }
                throw new Error(data.error || "Échec de la sauvegarde du produit");
            }

            // Reset form
            setFormData({
                name: "",
                description: "",
                amount: "",
                currency: "eur",
                image: null,
                categoryId: "",
            });
            setImagePreview(null);
            setEditingProduct(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            alert(editingProduct ? "Produit mis à jour avec succès!" : "Produit créé avec succès!");
            // Redirect to products page after successful creation
            window.location.href = "/products";
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Échec de la sauvegarde du produit: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setCategoryLoading(true);
        
        try {
            const response = await fetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCategory),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create category");
            }
            
            await fetchCategories();
            setNewCategory({ name: "", description: "" });
            setShowCategoryForm(false);
            alert("Category created successfully!");
        } catch (error) {
            console.error("Error creating category:", error);
            alert("Failed to create category: " + (error as Error).message);
        } finally {
            setCategoryLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="bg-gradient-to-br from-[#0A0A2C] to-[#1a1a4b] text-white">
                <div className="mx-auto max-w-4xl px-4 py-24">
                    <Card className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
                        <form onSubmit={createProduct} className="space-y-8">
                            <div>
                                <label htmlFor="name" className="mb-2 text-lg font-medium text-white">
                                    Nom du service
                                </label>
                                <input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className={combo(
                                        "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white",
                                        "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#5CEBDF]",
                                        "placeholder:text-gray-400",
                                    )}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="mb-2 text-lg font-medium text-white">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    className={combo(
                                        "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white",
                                        "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#5CEBDF]",
                                        "min-h-[120px] placeholder:text-gray-400",
                                    )}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="amount" className="mb-2 text-lg font-medium text-white">
                                    Prix
                                </label>
                                <div className="relative">
                                    <input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFormData({
                                                ...formData,
                                                amount: e.target.value,
                                            })
                                        }
                                        className={combo(
                                            "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pl-10 text-white",
                                            "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#5CEBDF]",
                                            "placeholder:text-gray-400",
                                        )}
                                        required
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label htmlFor="category" className="text-lg font-medium text-white">
                                        Catégorie
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowCategoryForm(!showCategoryForm)}
                                        className="text-sm text-[#5CEBDF] hover:underline"
                                    >
                                        {showCategoryForm ? "Annuler" : "+ Ajouter une catégorie"}
                                    </button>
                                </div>
                                
                                {showCategoryForm ? (
                                    <div className="mb-4 rounded-xl border border-white/20 bg-white/10 p-4">
                                        <h4 className="mb-3 text-lg font-medium text-white">Nouvelle catégorie</h4>
                                        <form onSubmit={createCategory} className="space-y-4">
                                            <div>
                                                <label htmlFor="categoryName" className="mb-1 block text-sm text-gray-300">
                                                    Nom
                                                </label>
                                                <input
                                                    id="categoryName"
                                                    value={newCategory.name}
                                                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                                                    className={combo(
                                                        "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white",
                                                        "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#5CEBDF]",
                                                        "placeholder:text-gray-400",
                                                    )}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="categoryDescription" className="mb-1 block text-sm text-gray-300">
                                                    Description (optionnel)
                                                </label>
                                                <input
                                                    id="categoryDescription"
                                                    value={newCategory.description}
                                                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                                                    className={combo(
                                                        "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white",
                                                        "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#5CEBDF]",
                                                        "placeholder:text-gray-400",
                                                    )}
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <ButtonClient
                                                    type="submit"
                                                    label="Créer la catégorie"
                                                    loadingLabel="Création..."
                                                    isLoading={categoryLoading}
                                                    className="bg-[#5CEBDF] px-4 py-2 text-sm font-medium text-[#0A0A2C]"
                                                >
                                                    Créer la catégorie
                                                </ButtonClient>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <select
                                        id="category"
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                                        className={combo(
                                            "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white",
                                            "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#5CEBDF]",
                                            "placeholder:text-gray-400",
                                        )}
                                        required
                                    >
                                        <option value="" disabled>Sélectionnez une catégorie</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {categories.length === 0 && !showCategoryForm && (
                                    <p className="mt-2 text-sm text-gray-400">
                                        Aucune catégorie disponible. Veuillez en créer une.
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="image" className="mb-2 text-lg font-medium text-white">
                                    Image
                                </label>
                                <div className="mt-2 flex w-full items-center justify-center">
                                    <label className="flex w-full cursor-pointer flex-col items-center rounded-xl border border-dashed border-white/20 bg-white/10 px-4 py-6 transition-colors hover:bg-white/[0.12]">
                                        <div className="flex flex-col items-center">
                                            <svg
                                                className="size-8 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-400">
                                                Glissez une image ou cliquez pour sélectionner
                                            </p>
                                        </div>
                                        <input
                                            id="image"
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            required={!editingProduct}
                                        />
                                    </label>
                                </div>
                                {imagePreview && (
                                    <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl">
                                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <ButtonClient
                                    type="submit"
                                    label={editingProduct ? "Mettre à jour" : "Créer le service"}
                                    loadingLabel="Enregistrement..."
                                    isLoading={loading}
                                    className="rounded-xl bg-[#5CEBDF] px-6 py-3 font-medium text-[#0A0A2C] transition-all hover:shadow-md"
                                    onClick={(e) => {
                                        // This is a backup handler in case the form onSubmit doesn't trigger
                                        if (e) {
                                            e.preventDefault();
                                            createProduct(e);
                                        }
                                    }}
                                >
                                    {editingProduct ? "Mettre à jour" : "Créer le service"}
                                </ButtonClient>
                                {editingProduct && (
                                    <ButtonClient
                                        type="button"
                                        label="Annuler"
                                        onClick={() => {
                                            setEditingProduct(null);
                                            setFormData({
                                                name: "",
                                                description: "",
                                                amount: "",
                                                currency: "eur",
                                                image: null,
                                                categoryId: "",
                                            });
                                            setImagePreview(null);
                                        }}
                                    >
                                        Annuler
                                    </ButtonClient>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
} 