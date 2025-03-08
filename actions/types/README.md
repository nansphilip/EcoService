# Types et Schémas de Validation

Ce dossier contient les définitions de types et les schémas de validation Zod pour chaque modèle de données de l'application.

## Objectif

L'objectif principal de ces fichiers est de :

1. Définir des types TypeScript stricts basés sur les modèles Prisma
2. Fournir des schémas de validation Zod pour garantir l'intégrité des données
3. Définir des contraintes strictes pour les opérations de sélection afin de prévenir les injections SQL

## Structure des fichiers

Chaque fichier de types suit une structure cohérente :

### 1. Types de base

```typescript
// Type complet du modèle
export type ModelNameType = ModelName;

// Type pour l'identifiant unique
export type ModelNameId = Pick<ModelName, "id">;

// Type pour les propriétés communes (sans les champs système)
export type ModelNameCommon = Omit<ModelName, "id" | "createdAt" | "updatedAt">;

// Type pour la mise à jour
export type ModelNameUpdate = {
    id: ModelName["id"];
    data: ModelNameCommon;
};

// Type pour les timestamps
export type ModelNameTimestamps = Pick<ModelName, "createdAt" | "updatedAt">;
```

### 2. Types pour les opérations de sélection

```typescript
// Type pour la sélection d'un élément unique
export type SelectModelNameProps = Pick<Prisma.ModelNameFindUniqueArgs, "where">;

// Type pour la sélection d'une liste
export type SelectModelNameListProps = Pick<Prisma.ModelNameFindManyArgs, "orderBy" | "take" | "skip" | "where">;

// Type pour le comptage
export type SelectModelNameAmountProps = Pick<Prisma.ModelNameCountArgs, "where">;
```

### 3. Schémas Zod

```typescript
// Schémas pour les types de base
export const modelNameIdSchema: ZodString = z.string().nanoid();

// Schéma pour les propriétés communes
export const modelNameCommonSchema: ZodType<ModelNameCommon> = z.object({
    name: z.string(),
    description: z.string(),
    // Pour les champs optionnels dans Prisma (String?), utilisez .nullable()
    image: z.string().nullable(),
    // Autres champs...
});

export const modelNameUpdateSchema: ZodType<ModelNameUpdate> = z.object({
    id: modelNameIdSchema,
    data: modelNameCommonSchema,
});

// Schémas pour les opérations de sélection
export const selectModelNameObjectSchema: ZodType<SelectModelNameProps> = z.object({ ... });
export const selectModelNameListSchema: ZodType<SelectModelNameListProps> = z.object({ ... });
export const selectModelNameAmountSchema: ZodType<SelectModelNameAmountProps> = z.object({ ... });
```

## Utilisation

Ces types et schémas sont utilisés dans les fichiers d'implémentation CRUD correspondants pour :

1. Typer correctement les paramètres et les retours des fonctions
2. Valider les données d'entrée avec Zod avant de les utiliser dans les requêtes Prisma
3. Garantir que seules les opérations autorisées sont possibles

## Création d'un nouveau fichier de types

Pour créer un nouveau fichier de types pour un modèle Prisma :

1. Copiez le fichier `_template.ts` et renommez-le selon votre modèle (par exemple `VotreModele.ts`)
2. Remplacez tous les `ModelName` par le nom de votre modèle
3. Adaptez les schémas Zod aux champs spécifiques de votre modèle :
   - Pour les champs obligatoires, utilisez `z.string()`, `z.number()`, etc.
   - Pour les champs optionnels (marqués avec `?` dans Prisma), utilisez `.nullable()`
4. Définissez les contraintes appropriées pour les opérations de sélection
