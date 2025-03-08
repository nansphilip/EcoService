/**
 * Générateur de fichiers de types avec schémas Zod
 * 
 * Ce module génère les fichiers de types TypeScript avec les schémas Zod
 * pour la validation des données, basés sur les modèles Prisma.
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { PrismaField, PrismaModel } from './prisma-parser';

/**
 * Génère un fichier de types pour un modèle Prisma
 * @param model Le modèle Prisma pour lequel générer le fichier de types
 */
export async function generateTypeFile(model: PrismaModel): Promise<void> {
  try {
    console.log(chalk.blue(`📝 Génération du fichier de types pour ${model.name}...`));
    
    // Chemin absolu vers le répertoire racine du projet
    const rootDir = path.resolve(process.cwd(), '..');
    
    // Générer le fichier de types
    await generateTypesFile(model, rootDir);
    
    // Générer le fichier de validation Zod
    await generateZodValidationFile(model, rootDir);
    
  } catch (error) {
    throw new Error(`Erreur lors de la génération du fichier de types: ${error.message}`);
  }
}

/**
 * Génère le fichier de types TypeScript
 * @param model Le modèle Prisma
 * @param rootDir Chemin racine du projet
 */
async function generateTypesFile(model: PrismaModel, rootDir: string): Promise<void> {
  try {
    // Lire le template
    const templatePath = path.join(rootDir, 'actions/types/_template.ts');
    
    // Vérifier si le template existe
    if (!await fs.pathExists(templatePath)) {
      throw new Error(`Le fichier template n'existe pas: ${templatePath}`);
    }
    
    let content = await fs.readFile(templatePath, 'utf8');
    
    // Remplacer ModelName par le nom du modèle
    content = content.replace(/ModelName/g, model.name);
    content = content.replace(/modelName/g, model.name.toLowerCase());
    
    // Supprimer les schémas Zod du fichier de types
    // Nous allons les déplacer dans un fichier séparé
    const zodSectionStart = content.indexOf('// ========================== //');
    const zodSectionEnd = content.lastIndexOf('// ========================== //');
    
    if (zodSectionStart !== -1 && zodSectionEnd !== -1) {
      // Garder uniquement les types, pas les schémas Zod
      content = content.substring(0, zodSectionStart) + 
        `// ========================== //
// ==== Zod Schema Types ==== //
// ========================== //

// Les schémas de validation Zod ont été déplacés dans le dossier actions/zod/${model.name}.ts
`;
    }
    
    // Écrire le fichier
    const outputPath = path.join(rootDir, `actions/types/${model.name}.ts`);
    await fs.outputFile(outputPath, content);
    console.log(chalk.green(`✅ Fichier de types généré: ${outputPath}`));
  } catch (error) {
    throw new Error(`Erreur lors de la génération du fichier de types: ${error.message}`);
  }
}

/**
 * Génère le fichier de validation Zod
 * @param model Le modèle Prisma
 * @param rootDir Chemin racine du projet
 */
async function generateZodValidationFile(model: PrismaModel, rootDir: string): Promise<void> {
  try {
    // Créer le dossier zod s'il n'existe pas
    const zodDir = path.join(rootDir, 'actions/zod');
    await fs.ensureDir(zodDir);
    
    // Vérifier si le fichier existe déjà
    const outputPath = path.join(zodDir, `${model.name}.ts`);
    const fileExists = await fs.pathExists(outputPath);
    
    if (fileExists) {
      console.log(chalk.yellow(`⚠️ Le fichier de validation Zod existe déjà: ${outputPath}`));
      console.log(chalk.yellow(`⚠️ Vérification des schémas de sélection...`));
      
      // Lire le contenu du fichier existant
      const content = await fs.readFile(outputPath, 'utf8');
      
      // Vérifier si les schémas de sélection existent
      const hasSelectSchema = content.includes(`selectSchema`) || content.includes(`select${model.name}Schema`);
      const hasSelectListSchema = content.includes(`selectListSchema`) || content.includes(`select${model.name}ListSchema`);
      const hasSelectAmountSchema = content.includes(`selectAmountSchema`) || content.includes(`select${model.name}AmountSchema`);
      
      if (hasSelectSchema && hasSelectListSchema && hasSelectAmountSchema) {
        console.log(chalk.green(`✅ Tous les schémas de sélection sont présents.`));
        return;
      }
      
      // Ajouter les schémas manquants
      let newContent = content;
      
      if (!hasSelectSchema || !hasSelectListSchema || !hasSelectAmountSchema) {
        // Ajouter la section des schémas de sélection si elle n'existe pas
        if (!content.includes('// ==== Select Schemas ====')) {
          newContent += `\n// ========================== //\n// ==== Select Schemas ====== //\n// ========================== //\n\n`;
        }
      }
      
      if (!hasSelectSchema) {
        console.log(chalk.yellow(`⚠️ Ajout du schéma de sélection unique...`));
        newContent += `export const select${model.name}Schema = z.object({
    where: z.object({
        id: z.string(),
    }),
});\n\n`;
      }
      
      if (!hasSelectListSchema) {
        console.log(chalk.yellow(`⚠️ Ajout du schéma de sélection de liste...`));
        newContent += `export const select${model.name}ListSchema = z.object({
    orderBy: z
        .object({
            createdAt: z.enum(["asc", "desc"]),
        })
        .optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: z
        .object({
            // Définir les options de filtrage pour la liste
        })
        .optional(),
});\n\n`;
      }
      
      if (!hasSelectAmountSchema) {
        console.log(chalk.yellow(`⚠️ Ajout du schéma de sélection de comptage...`));
        newContent += `export const select${model.name}AmountSchema = z.object({
    where: z
        .object({
            // Définir les options de filtrage pour le comptage
        })
        .optional(),
});\n`;
      }
      
      // Écrire le fichier mis à jour
      await fs.writeFile(outputPath, newContent);
      console.log(chalk.green(`✅ Fichier de validation Zod mis à jour: ${outputPath}`));
      return;
    }
    
    // Générer le contenu du fichier de validation
    let content = `/**
 * Schémas de validation Zod pour ${model.name}
 * 
 * Ce fichier contient les schémas de validation Zod pour le modèle ${model.name}.
 * Il est généré automatiquement et peut être modifié manuellement si nécessaire.
 */

import { z } from "zod";
import { ${model.name}Id, ${model.name}Common, ${model.name}Update, ${model.name}Timestamps, Select${model.name}Props, Select${model.name}ListProps, Select${model.name}AmountProps } from "@actions/types/${model.name}";
import { Prisma } from "@prisma/client";

// ========================== //
// ==== Zod Schema Types ==== //
// ========================== //

export const ${model.name.toLowerCase()}IdSchema = z.string().nanoid();

export const ${model.name.toLowerCase()}IdObjectSchema = z.object({
    id: z.string().nanoid(),
});

export const ${model.name.toLowerCase()}CommonSchema = z.object({
${generateZodSchema(model.fields)}
});

export const ${model.name.toLowerCase()}TimestampsSchema = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const ${model.name.toLowerCase()}UpdateSchema = z.object({
    id: ${model.name.toLowerCase()}IdSchema,
    data: ${model.name.toLowerCase()}CommonSchema,
});

// ========================== //
// ==== Select Schemas ====== //
// ========================== //

export const select${model.name}Schema = z.object({
    where: z.object({
        id: z.string(),
    }),
});

export const select${model.name}ListSchema = z.object({
    orderBy: z
        .object({
            createdAt: z.enum(["asc", "desc"]),
        })
        .optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    where: z
        .object({
            // Définir les options de filtrage pour la liste
            // Exemple :
            // name: z.object({
            //     contains: z.string(),
            // }).optional(),
        })
        .optional(),
});

export const select${model.name}AmountSchema = z.object({
    where: z
        .object({
            // Définir les options de filtrage pour le comptage
            // Exemple :
            // name: z.object({
            //     contains: z.string(),
            // }).optional(),
        })
        .optional(),
});
`;
    
    // Écrire le fichier
    await fs.outputFile(outputPath, content);
    console.log(chalk.green(`✅ Fichier de validation Zod généré: ${outputPath}`));
  } catch (error) {
    throw new Error(`Erreur lors de la génération du fichier de validation Zod: ${error.message}`);
  }
}

/**
 * Génère le schéma Zod pour les champs d'un modèle
 * @param fields Liste des champs du modèle
 * @returns Chaîne de caractères représentant le schéma Zod
 */
function generateZodSchema(fields: PrismaField[]): string {
  let schema = '';
  
  // Filtrer les champs système qui sont généralement gérés automatiquement
  const filteredFields = fields.filter(field => 
    !field.isId && 
    field.name !== 'createdAt' && 
    field.name !== 'updatedAt'
  );
  
  // Si aucun champ n'est trouvé après filtrage, ajouter un commentaire
  if (filteredFields.length === 0) {
    return '    // Aucun champ à valider trouvé dans le modèle\n    // Ajoutez manuellement les champs nécessaires';
  }
  
  // Générer le schéma pour chaque champ
  filteredFields.forEach((field, index) => {
    let zodType = getZodTypeForField(field);
    // Ajouter une virgule à la fin de chaque ligne, sauf pour la dernière
    const isLast = index === filteredFields.length - 1;
    schema += `    ${field.name}: ${zodType}${isLast ? '' : ','}
`;
  });
  
  return schema;
}

/**
 * Détermine le type Zod approprié pour un champ Prisma
 * @param field Le champ Prisma
 * @returns Chaîne de caractères représentant le type Zod
 */
function getZodTypeForField(field: PrismaField): string {
  let baseType: string;
  
  // Déterminer le type Zod de base en fonction du type Prisma
  switch (field.type) {
    case 'String':
      baseType = 'z.string()';
      break;
    case 'Int':
    case 'Float':
    case 'Decimal':
      baseType = 'z.number()';
      break;
    case 'Boolean':
      baseType = 'z.boolean()';
      break;
    case 'DateTime':
      baseType = 'z.date()';
      break;
    case 'Json':
      baseType = 'z.record(z.any())';
      break;
    default:
      // Pour les types d'énumération ou les relations
      if (field.isList) {
        baseType = 'z.string().array()';
      } else {
        baseType = 'z.string()';
      }
  }
  
  // Ajouter .nullable() si le champ n'est pas requis
  if (!field.isRequired) {
    baseType += '.nullable()';
  }
  
  // Ajouter des commentaires pour les champs spéciaux
  if (field.hasDefaultValue) {
    baseType += ' // Ce champ a une valeur par défaut dans Prisma';
  }
  
  return baseType;
} 