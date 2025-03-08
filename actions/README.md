# Actions Serveur

Ce dossier contient toutes les actions serveur de l'application, organisées selon une architecture précise pour faciliter la maintenance et l'évolutivité.

## Structure du dossier

- `/actions/types/` - Contient les définitions de types et schémas de validation pour chaque modèle
- `/actions/database/` - Contient les implémentations CRUD pour chaque modèle

## Fonctionnement

Les actions serveur suivent un pattern cohérent :

1. **Types et validation** : Chaque modèle a un fichier de types correspondant qui définit :
   - Les types TypeScript basés sur les modèles Prisma
   - Les schémas Zod pour la validation des données
   - Les types pour les opérations de sélection avec des contraintes strictes

2. **Opérations CRUD** : Chaque modèle a un fichier d'implémentation qui :
   - Importe les types et schémas du fichier de types correspondant
   - Implémente les opérations Create, Read, Update, Delete
   - Utilise les schémas Zod pour valider les entrées
   - Gère les erreurs de manière cohérente

## Sécurité

Les schémas de validation Zod sont particulièrement restrictifs pour les opérations de sélection afin de prévenir les injections SQL, car ces actions peuvent être appelées depuis le client.

## Création d'une nouvelle action serveur

Pour créer une action serveur pour un nouveau modèle Prisma :

1. **Étape 1 : Créer le fichier de types**
   - Copiez `/actions/types/_template.ts` vers `/actions/types/VotreModele.ts`
   - Remplacez tous les `ModelName` par le nom de votre modèle dans le fichier
   - Adaptez les schémas Zod aux champs spécifiques du modèle dans Prisma
   - Assurez-vous de gérer correctement les champs optionnels avec `.nullable()`

2. **Étape 2 : Créer le fichier d'implémentation CRUD**
   - Copiez `/actions/database/_template.ts` vers `/actions/database/VotreModele.ts`
   - Remplacez tous les `ModelName` par le nom de votre modèle dans le fichier
   - Modifiez l'import pour pointer vers `@actions/types/VotreModele` au lieu de `@actions/types/_template`
   - Adaptez les opérations aux spécificités du modèle si nécessaire

## Utilisation

Les actions serveur peuvent être importées et utilisées dans les composants React avec le mot-clé `"use server"` :

```typescript
import { CreateVotreModele, UpdateVotreModele } from "@actions/database/VotreModele";

// Dans un composant ou une route
const handleSubmit = async (formData) => {
  const result = await CreateVotreModele(formData);
  if (result.error) {
    // Gérer l'erreur
  } else {
    // Utiliser result.votreModeleData
  }
};
```
