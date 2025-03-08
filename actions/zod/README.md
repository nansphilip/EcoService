# Schémas de validation Zod

Ce dossier contient les schémas de validation [Zod](https://github.com/colinhacks/zod) pour les modèles de l'application.

## Structure

- `_template.ts` : Fichier template pour les nouveaux schémas de validation
- `[ModelName].ts` : Schémas de validation pour chaque modèle

## Utilisation

Les schémas de validation sont utilisés pour valider les données entrantes et sortantes de l'API.

```typescript
import { orderIdSchema, orderCommonSchema } from "@actions/zod/Order";

// Valider un ID
const isValidId = orderIdSchema.safeParse(id).success;

// Valider les données d'un ordre
const validationResult = orderCommonSchema.safeParse(data);
if (validationResult.success) {
  // Les données sont valides
  const validData = validationResult.data;
} else {
  // Les données sont invalides
  const errors = validationResult.error.format();
}
```

## Génération

Les schémas de validation sont générés automatiquement à partir des modèles Prisma en utilisant la commande :

```bash
npm run generate:model -- --model ModelName
```

Vous pouvez ensuite personnaliser les schémas générés selon vos besoins. 