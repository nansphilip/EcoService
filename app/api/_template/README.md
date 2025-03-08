# Template pour les Routes API

Ce dossier contient des templates pour créer de nouvelles routes API pour un modèle de données.

## Structure

- `route.ts` - Route pour récupérer une liste d'éléments
- `unique/route.ts` - Route pour récupérer un élément unique
- `count/route.ts` - Route pour compter les éléments

## Utilisation

Pour créer des routes API pour un nouveau modèle :

1. Créez un nouveau dossier pour votre modèle dans `/app/api/` (par exemple `/app/api/votre-modele/`)
2. Copiez les fichiers de ce dossier template dans votre nouveau dossier
3. Remplacez toutes les occurrences de `ModelName` par le nom de votre modèle
4. Adaptez les schémas et les requêtes Prisma selon les spécificités de votre modèle
5. Ajoutez les entrées correspondantes dans `Routes.ts`

## Exemple d'utilisation dans Routes.ts

```typescript
import { SelectVotreModeleAmountResponse } from "@app/api/votre-modele/count/route";
import { SelectVotreModeleListResponse } from "@app/api/votre-modele/route";
import { SelectVotreModeleResponse } from "@app/api/votre-modele/unique/route";

export type Routes = {
    // Routes existantes...
    
    // Nouvelles routes pour votre modèle
    "/votre-modele": {
        params?: SelectVotreModeleListProps;
        response: SelectVotreModeleListResponse;
    };
    "/votre-modele/unique": {
        params?: SelectVotreModeleProps;
        response: SelectVotreModeleResponse;
    };
    "/votre-modele/count": {
        params?: SelectVotreModeleAmountProps;
        response: SelectVotreModeleAmountResponse;
    };
};
```

## Consommation des API

Une fois vos routes créées et enregistrées dans `Routes.ts`, vous pouvez les consommer avec les utilitaires de fetch :

```typescript
// Côté serveur
const modeles = await Fetch({
    route: "/votre-modele",
    params: { take: 10 }
});

// Côté client
const { data, isLoading } = useFetch({
    route: "/votre-modele/unique",
    params: { where: { id: "123" } }
});
``` 