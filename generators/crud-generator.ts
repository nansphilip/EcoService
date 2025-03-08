/**
 * Générateur de fichiers CRUD
 * 
 * Ce module génère les fichiers d'implémentation CRUD pour les modèles Prisma.
 * Il utilise le template _template.ts et remplace les occurrences de "ModelName"
 * par le nom du modèle.
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { PrismaModel } from './prisma-parser';

/**
 * Génère un fichier CRUD pour un modèle Prisma
 * @param model Le modèle Prisma pour lequel générer le fichier CRUD
 */
export async function generateCrudFile(model: PrismaModel): Promise<void> {
  try {
    console.log(chalk.blue(`📝 Génération du fichier CRUD pour ${model.name}...`));
    
    // Chemin absolu vers le répertoire racine du projet
    const rootDir = path.resolve(process.cwd(), '..');
    
    // Lire le template
    const templatePath = path.join(rootDir, 'actions/database/_template.ts');
    
    // Vérifier si le template existe
    if (!await fs.pathExists(templatePath)) {
      throw new Error(`Le fichier template n'existe pas: ${templatePath}`);
    }
    
    let content = await fs.readFile(templatePath, 'utf8');
    
    // Remplacer ModelName par le nom du modèle
    content = content.replace(/ModelName/g, model.name);
    
    // Remplacer le chemin d'import pour pointer vers le fichier de types généré
    content = content.replace(/@actions\/types\/_template/g, `@actions/types/${model.name}`);
    
    // Ajouter l'import pour les schémas Zod
    const importRegex = /import { ModelNameId, ModelNameCommon, ModelNameUpdate, SelectModelNameProps, SelectModelNameListProps, SelectModelNameAmountProps, modelNameIdSchema, modelNameIdObjectSchema, modelNameCommonSchema, modelNameUpdateSchema, selectModelNameSchema, selectModelNameListSchema, selectModelNameAmountSchema } from "@actions\/types\/_template";/;
    const newImport = `import { ${model.name}Id, ${model.name}Common, ${model.name}Update, SelectOrderProps, SelectOrderListProps, SelectOrderAmountProps } from "@actions/types/${model.name}";
import { ${model.name.toLowerCase()}IdSchema, ${model.name.toLowerCase()}IdObjectSchema, ${model.name.toLowerCase()}CommonSchema, ${model.name.toLowerCase()}UpdateSchema, select${model.name}Schema, select${model.name}ListSchema, select${model.name}AmountSchema } from "@actions/zod/${model.name}";`;
    
    content = content.replace(importRegex, newImport);
    
    // Remplacer modelName (en minuscules) par le nom du modèle en minuscules
    const modelNameLower = model.name.toLowerCase();
    content = content.replace(/modelName/g, modelNameLower);
    
    // Écrire le fichier
    const outputPath = path.join(rootDir, `actions/database/${model.name}.ts`);
    
    // Vérifier si le fichier existe déjà
    const fileExists = await fs.pathExists(outputPath);
    if (fileExists) {
      console.log(chalk.yellow(`⚠️ Le fichier CRUD existe déjà: ${outputPath}`));
      console.log(chalk.yellow(`⚠️ Le fichier sera écrasé.`));
    }
    
    await fs.outputFile(outputPath, content);
    console.log(chalk.green(`✅ Fichier CRUD généré: ${outputPath}`));
  } catch (error) {
    throw new Error(`Erreur lors de la génération du fichier CRUD: ${error.message}`);
  }
} 