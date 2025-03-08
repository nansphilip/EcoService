# Opérations CRUD pour les Modèles

Ce dossier contient les implémentations des opérations CRUD (Create, Read, Update, Delete) pour chaque modèle de données de l'application.

## Objectif

L'objectif principal de ces fichiers est de :

1. Fournir des fonctions serveur sécurisées pour manipuler les données
2. Valider les entrées avec les schémas Zod avant d'interagir avec la base de données
3. Gérer les erreurs de manière cohérente et sécurisée
4. Offrir une interface uniforme pour toutes les opérations de données

## Structure des fichiers

Chaque fichier d'implémentation CRUD suit une structure cohérente :

### 1. Imports et configuration

```typescript
"use server"; // Directive pour les actions serveur Next.js

// Pour un nouveau modèle, vous devrez créer d'abord le fichier de types correspondant
// puis modifier cet import pour pointer vers ce fichier
import { ... } from "@actions/types/ModelName"; // Import des types et schémas
import PrismaInstance from "@lib/prisma"; // Instance Prisma
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
```

### 2. Type de réponse pour les mutations

```typescript
export type ModelNameMutationResponse = {
    modelNameData?: ModelNameType; // Données retournées en cas de succès
    error?: string; // Message d'erreur en cas d'échec
};
```

### 3. Méthodes de mutation (Create, Update, Delete)

Chaque méthode de mutation :
- Valide les entrées avec Zod
- Exécute l'opération Prisma correspondante
- Gère les erreurs de manière appropriée
- Retourne un objet de type `ModelNameMutationResponse`

### 4. Méthodes de sélection (Select, SelectList, SelectAmount)

Chaque méthode de sélection :
- Valide les entrées avec Zod
- Exécute l'opération Prisma correspondante
- Gère les erreurs de manière appropriée
- Retourne les données ou null en cas d'erreur

## Gestion des erreurs

La gestion des erreurs est cohérente dans toutes les méthodes :

1. **Méthodes de mutation** :
   - En développement : les erreurs sont remontées avec des détails
   - En production : un message générique est retourné pour éviter les fuites d'information

2. **Méthodes de sélection** :
   - Les erreurs de validation ou de Prisma retournent `null`
   - Les autres erreurs sont remontées

## Utilisation

Ces fonctions peuvent être importées et utilisées dans les composants React ou les routes API :

```typescript
import { CreateModelName, UpdateModelName } from "@actions/database/ModelName";

// Dans un composant ou une route
const handleSubmit = async (formData) => {
  const result = await CreateModelName(formData);
  if (result.error) {
    // Gérer l'erreur
  } else {
    // Utiliser result.modelNameData
  }
};
```

## Création d'un nouveau fichier CRUD

Pour créer un nouveau fichier CRUD pour un modèle Prisma :

1. Copiez le fichier `_template.ts` et renommez-le selon votre modèle (par exemple `VotreModele.ts`)
2. Remplacez tous les `ModelName` par le nom de votre modèle
3. Modifiez l'import pour pointer vers le fichier de types correspondant (par exemple `@actions/types/VotreModele`)
4. Adaptez les opérations aux spécificités de votre modèle si nécessaire
5. Assurez-vous que les types et schémas correspondants existent dans le dossier `/actions/types/`
