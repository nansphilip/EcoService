import { AccountType } from "@actions/types/Account";
import { FruitType } from "@actions/types/Fruit";
import { UserType } from "@actions/types/User";

interface UserData {
    name: UserType["name"];
    email: UserType["email"];
    emailVerified: UserType["emailVerified"];
    role: UserType["role"];
    password: AccountType["password"];
}

export const userData: UserData[] = [
    {
        name: "User Lastname",
        email: "user@example.com",
        emailVerified: true,
        role: "USER",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
    {
        name: "Vendor Lastname",
        email: "vendor@example.com",
        emailVerified: true,
        role: "VENDOR",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
    {
        name: "Employee Lastname",
        email: "employee@example.com",
        emailVerified: true,
        role: "EMPLOYEE",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
    {
        name: "Admin Lastname",
        email: "admin@example.com",
        emailVerified: true,
        role: "ADMIN",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
];

interface FruitData {
    name: FruitType["name"];
    description: FruitType["description"];
    image: FruitType["image"];
}

export const fruitData: FruitData[] = [
    {
        name: "Apple",
        description: "A spherical fruit with a red or green skin and a whitish flesh.",
        image: "/fruit/apple.webp",
    },
    {
        name: "Banana",
        description: "A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe.",
        image: "/fruit/banana.webp",
    },
    {
        name: "Cherry",
        description: "A small, round stone fruit that is typically bright or dark red.",
        image: "/fruit/cherry.webp",
    },
    {
        name: "Mango",
        description:
            "A large oval tropical fruit with smooth yellowish-red skin, hard central stone, and soft, juicy orange-yellow flesh.",
        image: "/fruit/mango.webp",
    },
    {
        name: "Orange",
        description: "A round juicy citrus fruit with a tough bright reddish-yellow rind.",
        image: "/fruit/orange.webp",
    },
    {
        name: "Pineapple",
        description: "A tropical fruit with a tough segmented skin and sweet, juicy, yellow flesh.",
        image: "/fruit/pineapple.webp",
    },
    {
        name: "Strawberry",
        description: "A sweet soft red fruit with a seed-studded surface.",
        image: "/fruit/strawberry.webp",
    },
];

interface CategoryData {
    name: string;
    description: string;
}

export const categoryData: CategoryData[] = [
    {
        name: "Fruits & Légumes",
        description: "Produits frais issus de l'agriculture locale et biologique",
    },
    {
        name: "Produits Laitiers",
        description: "Lait, fromages, yaourts et autres produits laitiers",
    },
    {
        name: "Boulangerie",
        description: "Pains frais, viennoiseries et pâtisseries artisanales",
    },
    {
        name: "Viandes & Poissons",
        description: "Viandes fraîches, poissons et fruits de mer",
    },
    {
        name: "Épicerie",
        description: "Produits d'épicerie fine et produits de base",
    },
    {
        name: "Boissons",
        description: "Boissons fraîches, jus, vins et spiritueux",
    },
    {
        name: "Bio & Sans Gluten",
        description: "Produits biologiques et alternatives sans gluten",
    },
    {
        name: "Surgelés",
        description: "Produits surgelés de qualité",
    },
    {
        name: "Hygiène & Beauté",
        description: "Produits d'hygiène et cosmétiques naturels",
    },
    {
        name: "Maison & Entretien",
        description: "Produits d'entretien écologiques et accessoires",
    },
];

interface ProductData {
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
    category: string;
}

export const productData: ProductData[] = [
    // Fruits & Légumes
    {
        name: "Panier de fruits bio",
        description: "Assortiment de fruits de saison bio",
        image: "/illustration/produit 1.jpg",
        price: 25.99,
        stock: 50,
        category: "Fruits & Légumes",
    },
    {
        name: "Légumes locaux",
        description: "Mix de légumes frais de producteurs locaux",
        image: "/illustration/produit 2.jpg",
        price: 18.5,
        stock: 40,
        category: "Fruits & Légumes",
    },
    {
        name: "Herbes aromatiques",
        description: "Assortiment d'herbes fraîches bio",
        image: "/illustration/produit 3.jpg",
        price: 4.99,
        stock: 30,
        category: "Fruits & Légumes",
    },

    // Produits Laitiers
    {
        name: "Fromage fermier",
        description: "Fromage artisanal de vache",
        image: "/illustration/produit 4.jpg",
        price: 7.99,
        stock: 25,
        category: "Produits Laitiers",
    },
    {
        name: "Yaourt bio",
        description: "Pack de yaourts nature bio",
        image: "/illustration/produit 5.jpg",
        price: 4.5,
        stock: 60,
        category: "Produits Laitiers",
    },
    {
        name: "Beurre fermier",
        description: "Beurre traditionnel de baratte",
        image: "/illustration/coton 1.jpg",
        price: 3.99,
        stock: 45,
        category: "Produits Laitiers",
    },

    // Boulangerie
    {
        name: "Pain au levain",
        description: "Pain traditionnel au levain naturel",
        image: "/illustration/coton 2.jpg",
        price: 4.5,
        stock: 30,
        category: "Boulangerie",
    },
    {
        name: "Croissants",
        description: "Lot de 4 croissants pur beurre",
        image: "/illustration/coton 3.jpg",
        price: 6.99,
        stock: 40,
        category: "Boulangerie",
    },
    {
        name: "Baguette tradition",
        description: "Baguette artisanale à l'ancienne",
        image: "/illustration/cafe.jpg",
        price: 1.5,
        stock: 100,
        category: "Boulangerie",
    },

    // Viandes & Poissons
    {
        name: "Filet de bœuf",
        description: "Filet de bœuf local race Charolaise",
        image: "/illustration/eolienne.jpg",
        price: 32.99,
        stock: 20,
        category: "Viandes & Poissons",
    },
    {
        name: "Saumon frais",
        description: "Filet de saumon de l'Atlantique",
        image: "/illustration/espace 1.jpg",
        price: 24.99,
        stock: 25,
        category: "Viandes & Poissons",
    },
    {
        name: "Poulet fermier",
        description: "Poulet fermier Label Rouge",
        image: "/illustration/feuille.jpg",
        price: 15.99,
        stock: 30,
        category: "Viandes & Poissons",
    },

    // Épicerie
    {
        name: "Huile d'olive",
        description: "Huile d'olive extra vierge bio",
        image: "/illustration/pots.jpg",
        price: 12.99,
        stock: 40,
        category: "Épicerie",
    },
    {
        name: "Miel local",
        description: "Miel toutes fleurs local",
        image: "/illustration/pshit 1.jpg",
        price: 8.5,
        stock: 35,
        category: "Épicerie",
    },
    {
        name: "Pâtes artisanales",
        description: "Pâtes fraîches aux œufs",
        image: "/illustration/pshit 2.jpg",
        price: 5.99,
        stock: 50,
        category: "Épicerie",
    },

    // Boissons
    {
        name: "Vin rouge bio",
        description: "Vin rouge biodynamique local",
        image: "/illustration/produit 3.jpg",
        price: 15.99,
        stock: 60,
        category: "Boissons",
    },
    {
        name: "Jus de pomme",
        description: "Jus de pomme pressé artisanal",
        image: "/illustration/produit 4.jpg",
        price: 4.5,
        stock: 45,
        category: "Boissons",
    },
    {
        name: "Bière artisanale",
        description: "Bière blonde locale",
        image: "/illustration/produit 5.jpg",
        price: 3.99,
        stock: 70,
        category: "Boissons",
    },

    // Bio & Sans Gluten
    {
        name: "Farine sans gluten",
        description: "Farine de riz bio sans gluten",
        image: "/illustration/coton 1.jpg",
        price: 6.99,
        stock: 40,
        category: "Bio & Sans Gluten",
    },
    {
        name: "Granola bio",
        description: "Granola bio aux fruits secs",
        image: "/illustration/coton 2.jpg",
        price: 8.99,
        stock: 35,
        category: "Bio & Sans Gluten",
    },
    {
        name: "Cookies vegan",
        description: "Cookies bio sans gluten vegan",
        image: "/illustration/coton 3.jpg",
        price: 5.5,
        stock: 45,
        category: "Bio & Sans Gluten",
    },

    // Surgelés
    {
        name: "Légumes surgelés",
        description: "Mix de légumes bio surgelés",
        image: "/illustration/cafe.jpg",
        price: 6.99,
        stock: 50,
        category: "Surgelés",
    },
    {
        name: "Poisson surgelé",
        description: "Filets de cabillaud surgelés",
        image: "/illustration/eolienne.jpg",
        price: 14.99,
        stock: 30,
        category: "Surgelés",
    },
    {
        name: "Glace artisanale",
        description: "Crème glacée vanille de Madagascar",
        image: "/illustration/espace 1.jpg",
        price: 7.99,
        stock: 25,
        category: "Surgelés",
    },

    // Hygiène & Beauté
    {
        name: "Savon naturel",
        description: "Savon artisanal aux huiles essentielles",
        image: "/illustration/terre-main.jpg",
        price: 5.99,
        stock: 55,
        category: "Hygiène & Beauté",
    },
    {
        name: "Shampooing solide",
        description: "Shampooing solide bio zéro déchet",
        image: "/illustration/produit 1.jpg",
        price: 8.99,
        stock: 40,
        category: "Hygiène & Beauté",
    },
    {
        name: "Crème visage",
        description: "Crème hydratante bio",
        image: "/illustration/produit 2.jpg",
        price: 19.99,
        stock: 30,
        category: "Hygiène & Beauté",
    },

    // Maison & Entretien
    {
        name: "Lessive écologique",
        description: "Lessive naturelle concentrée",
        image: "/illustration/lessive 1.jpg",
        price: 12.99,
        stock: 45,
        category: "Maison & Entretien",
    },
    {
        name: "Éponges naturelles",
        description: "Lot de 3 éponges biodégradables",
        image: "/illustration/lessive 2.jpg",
        price: 6.99,
        stock: 60,
        category: "Maison & Entretien",
    },
    {
        name: "Spray multi-usage",
        description: "Nettoyant écologique tout usage",
        image: "/illustration/brosse-a-dent.jpg",
        price: 4.99,
        stock: 50,
        category: "Maison & Entretien",
    },
];
