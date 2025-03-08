# API Routes et Utilitaires de Fetch

Ce dossier contient les routes API de l'application et les utilitaires pour les consommer de manière typée et sécurisée.

## Architecture

L'architecture API de l'application est conçue autour de trois principes clés :

1. **Typage fort** - Toutes les routes, paramètres et réponses sont fortement typés
2. **Mise en cache** - Les données sont mises en cache pour optimiser les performances
3. **Sécurité** - Les entrées sont validées avec Zod pour prévenir les injections

## Structure du dossier

- `/api/Routes.ts` - Registre central des routes API avec leurs types
- `/api/utils/` - Utilitaires pour consommer les API
  - `Fetch.ts` - Fonction pour les requêtes API typées
  - `FetchParallelized.ts` - Fonction pour les requêtes parallèles
  - `FetchHook.ts` - Hook React pour les requêtes côté client
- `/api/{modèle}/` - Routes API pour chaque modèle
  - `route.ts` - Route pour récupérer une liste d'éléments
  - `unique/route.ts` - Route pour récupérer un élément unique
  - `count/route.ts` - Route pour compter les éléments

## Routes.ts

Le fichier `Routes.ts` sert de registre central pour toutes les routes API de l'application. Il définit :

- Les chemins d'URL pour chaque route
- Les types de paramètres attendus pour chaque route
- Les types de réponses pour chaque route

```typescript
export type Routes = {
    "/modele": {
        params?: SelectModeleListProps;
        response: SelectModeleListResponse;
    };
    "/modele/unique": {
        params?: SelectModeleProps;
        response: SelectModeleResponse;
    };
    // ...
};
```

Ce système permet d'avoir une source unique de vérité pour les types API et facilite la maintenance.

## Utilitaires de Fetch

### Fetch.ts

`Fetch.ts` fournit une fonction typée pour consommer les API :

```typescript
const produits = await Fetch({
    route: "/products",
    params: { take: 10, skip: 0 },
    client: false // true pour le client, false pour le serveur
});
```

Caractéristiques :
- Typage automatique des paramètres et des réponses
- Gestion des erreurs
- Support de l'annulation des requêtes
- Adaptation au contexte client ou serveur

### FetchParallelized.ts

`FetchParallelized.ts` permet d'exécuter plusieurs requêtes en parallèle :

```typescript
const [produits, categories] = await FetchParallelized([
    { route: "/products", params: { take: 10 } },
    { route: "/categories" }
]);
```

Caractéristiques :
- Exécution parallèle pour de meilleures performances
- Typage correct pour chaque élément du tableau de résultats
- Utilise Promise.all sous le capot

### FetchHook.ts

`FetchHook.ts` fournit un hook React pour les composants client :

```typescript
const { data, isLoading, error } = useFetch({
    route: "/products",
    params: { take: 10 }
});
```

Caractéristiques :
- États de chargement et d'erreur
- Annulation automatique des requêtes lors du démontage
- Rechargement automatique lors du changement de paramètres
- Option pour éviter le premier chargement (utile avec SSR)

## Création d'une nouvelle route API

Pour créer une nouvelle route API pour un modèle :

1. Créez les dossiers et fichiers nécessaires dans `/api/votre-modele/`
2. Ajoutez les types de réponse dans chaque fichier de route
3. Ajoutez les entrées correspondantes dans `Routes.ts`
4. Utilisez les utilitaires de fetch pour consommer la nouvelle API 