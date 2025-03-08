# Générateur de CRUD et API pour EcoService

Ce générateur permet de créer automatiquement les fichiers nécessaires pour un modèle Prisma :
- Fichier de types avec schémas Zod
- Fichier CRUD avec les opérations de base
- Fichiers API (liste, unique, count)
- Mise à jour du fichier Routes.ts

## Installation

```bash
# Installer les dépendances
npm run generate:setup
```

## Utilisation

### Lister les modèles disponibles

```bash
npm run generate:list
```

Cette commande affiche la liste des modèles disponibles dans le schéma Prisma avec leurs champs.

### Mode interactif

```bash
npm run generate
```

Cette commande affiche une liste des modèles disponibles dans le schéma Prisma et vous permet d'en sélectionner un pour générer tous les fichiers.

### Générer pour un modèle spécifique

```bash
# Générer tous les fichiers pour un modèle
npm run generate:model Order

# Générer uniquement le fichier de types
npm run generate:type Order

# Générer uniquement le fichier CRUD
npm run generate:crud Order

# Générer uniquement les fichiers API
npm run generate:api Order
```

### Générer pour tous les modèles

```bash
npm run generate:all
```

Cette commande génère les fichiers pour tous les modèles définis dans le schéma Prisma.

## Options avancées

Vous pouvez également utiliser les commandes directement avec des options supplémentaires :

```bash
# Spécifier un chemin personnalisé pour le schéma Prisma
cd scripts/generators
npm run generate -- --path ../../custom/path/schema.prisma

# Générer l'API et mettre à jour le fichier Routes.ts
cd scripts/generators
npm run generate:api -- --model Order --update-routes
```

## Structure des fichiers générés

### Fichier de types

```
actions/types/ModelName.ts
```

Ce fichier contient :
- Les types TypeScript basés sur le modèle Prisma
- Les schémas Zod pour la validation des données
- Les types pour les opérations de sélection

### Fichier CRUD

```
actions/database/ModelName.ts
```

Ce fichier contient :
- Les fonctions Create, Update, Delete
- Les fonctions Select, SelectList, SelectAmount
- La gestion des erreurs

### Fichiers API

```
app/api/modelname/route.ts
app/api/modelname/unique/route.ts
app/api/modelname/count/route.ts
```

Ces fichiers contiennent :
- Les routes API pour le modèle
- La mise en cache des données
- La gestion des erreurs

## Fonctionnement

Le générateur fonctionne en plusieurs étapes :

1. Analyse du schéma Prisma pour extraire les modèles et leurs champs
2. Génération du fichier de types avec les schémas Zod adaptés aux champs du modèle
3. Génération du fichier CRUD avec les opérations de base
4. Génération des fichiers API pour le modèle
5. Mise à jour du fichier Routes.ts pour inclure les nouvelles routes

## Personnalisation

Vous pouvez personnaliser les templates utilisés par le générateur en modifiant les fichiers suivants :
- `actions/types/_template.ts`
- `actions/database/_template.ts`
- `app/api/_template/route.ts`
- `app/api/_template/unique/route.ts`
- `app/api/_template/count/route.ts` 