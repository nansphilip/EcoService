import ProductCreationForm from "@app/(stripe)/create-product/ProductCreationForm";
import { Fetch } from "@app/api/utils/Fetch";
import { isVendorOrEmployeeOrAdmin } from "@lib/checkRole";
import Link from "@ui/Link";
import { unauthorized } from "next/navigation";

export default async function Page() {
    const session = await isVendorOrEmployeeOrAdmin();
    if (!session) {
        unauthorized();
    }

    const categoryList = await Fetch({ route: "/categories" });
    if (!categoryList) {
        throw new Error("Category list not found");
    }

    return (
        <main className="w-full bg-primary">
            <div className="flex flex-col items-center justify-center gap-12 py-12">
                <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="text-4xl font-bold text-white">
                        <span>Créer un </span>
                        <span className="text-secondary">nouveau</span>
                        <span> produit</span>
                    </h1>
                    <div className="text-center text-lg text-gray-300">Ajouter un produit au catalogue</div>
                </div>
                <ProductCreationForm categoryList={categoryList} />
            </div>
            <div className="flex flex-col items-center justify-center gap-3 bg-white py-12">
                <h2 className="text-2xl font-bold text-primary">Consulter la liste de mes produits sur Stripe</h2>
                <Link href="https://dashboard.stripe.com/test/products" label="Voir les produits">
                    Voir les produits
                </Link>
            </div>
        </main>
    );
}
