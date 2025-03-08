/**
 * Générateur de fichiers API
 * 
 * Ce module génère les fichiers API pour les modèles Prisma :
 * - route.ts (liste d'éléments)
 * - unique/route.ts (élément unique)
 * - count/route.ts (comptage d'éléments)
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { PrismaModel } from './prisma-parser';

/**
 * Génère les fichiers API pour un modèle Prisma
 * @param model Le modèle Prisma pour lequel générer les fichiers API
 */
export async function generateApiFiles(model: PrismaModel): Promise<void> {
  try {
    console.log(chalk.blue(`📝 Génération des fichiers API pour ${model.name}...`));
    
    // Chemin absolu vers le répertoire racine du projet
    const rootDir = path.resolve(process.cwd(), '..');
    
    const modelNameLower = model.name.toLowerCase();
    
    // Créer les dossiers nécessaires
    const apiBasePath = path.join(rootDir, `app/api/${modelNameLower}`);
    await fs.ensureDir(apiBasePath);
    await fs.ensureDir(path.join(apiBasePath, 'unique'));
    await fs.ensureDir(path.join(apiBasePath, 'count'));
    
    console.log(chalk.blue(`📁 Dossiers API créés: ${apiBasePath}`));
    
    // Générer route.ts (liste d'éléments)
    await generateApiFile(
      path.join(rootDir, 'app/api/_template/route.ts'),
      path.join(apiBasePath, 'route.ts'),
      model,
      rootDir
    );
    
    // Générer unique/route.ts (élément unique)
    await generateApiFile(
      path.join(rootDir, 'app/api/_template/unique/route.ts'),
      path.join(apiBasePath, 'unique/route.ts'),
      model,
      rootDir
    );
    
    // Générer count/route.ts (comptage d'éléments)
    await generateApiFile(
      path.join(rootDir, 'app/api/_template/count/route.ts'),
      path.join(apiBasePath, 'count/route.ts'),
      model,
      rootDir
    );
    
    console.log(chalk.green(`✅ Fichiers API générés dans: ${apiBasePath}`));
  } catch (error) {
    throw new Error(`Erreur lors de la génération des fichiers API: ${error.message}`);
  }
}

/**
 * Génère un fichier API spécifique à partir d'un template
 * @param templatePath Chemin vers le fichier template
 * @param outputPath Chemin vers le fichier de sortie
 * @param model Le modèle Prisma
 * @param rootDir Chemin vers le répertoire racine du projet
 */
async function generateApiFile(templatePath: string, outputPath: string, model: PrismaModel, rootDir: string): Promise<void> {
  try {
    // Vérifier si le template existe
    if (!await fs.pathExists(templatePath)) {
      throw new Error(`Le fichier template n'existe pas: ${templatePath}`);
    }
    
    // Lire le template
    let content = await fs.readFile(templatePath, 'utf8');
    
    // Remplacer les occurrences
    content = content.replace(/ModelName/g, model.name);
    content = content.replace(/modelName/g, model.name.toLowerCase());
    
    // Mettre à jour les imports pour utiliser le dossier zod
    const importRegex = /import { selectModelNameSchema, selectModelNameListSchema, selectModelNameAmountSchema } from "@actions\/types\/ModelName";/g;
    const newImport = `import { select${model.name}Schema, select${model.name}ListSchema, select${model.name}AmountSchema } from "@actions/zod/${model.name}";`;
    content = content.replace(importRegex, newImport);
    
    // Vérifier si le fichier existe déjà
    const fileExists = await fs.pathExists(outputPath);
    if (fileExists) {
      console.log(chalk.yellow(`⚠️ Le fichier API existe déjà: ${outputPath}`));
      console.log(chalk.yellow(`⚠️ Le fichier sera écrasé.`));
    }
    
    // Écrire le fichier
    await fs.outputFile(outputPath, content);
    console.log(chalk.green(`✅ Fichier API généré: ${outputPath}`));
  } catch (error) {
    throw new Error(`Erreur lors de la génération du fichier API: ${error.message}`);
  }
} 