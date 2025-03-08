/**
 * Module d'analyse du schéma Prisma
 * 
 * Ce module permet d'extraire les modèles et leurs champs à partir d'un fichier schema.prisma.
 * Il utilise une approche basée sur l'analyse du texte du schéma Prisma.
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

/**
 * Interface représentant un champ d'un modèle Prisma
 */
export interface PrismaField {
  name: string;           // Nom du champ
  type: string;           // Type du champ (String, Int, Boolean, etc.)
  isRequired: boolean;    // Si le champ est requis (non nullable)
  isList: boolean;        // Si le champ est une liste
  isId: boolean;          // Si le champ est un identifiant
  isUnique: boolean;      // Si le champ est unique
  hasDefaultValue: boolean; // Si le champ a une valeur par défaut
}

/**
 * Interface représentant un modèle Prisma
 */
export interface PrismaModel {
  name: string;           // Nom du modèle
  fields: PrismaField[];  // Liste des champs du modèle
}

/**
 * Parse le schéma Prisma et extrait les modèles et leurs champs
 * @param schemaPath Chemin vers le fichier schema.prisma
 * @returns Liste des modèles avec leurs champs
 */
export async function parsePrismaSchema(schemaPath: string): Promise<PrismaModel[]> {
  try {
    // Résoudre le chemin absolu du fichier
    const absolutePath = path.resolve(process.cwd(), schemaPath);
    
    // Vérifier si le fichier existe
    if (!await fs.pathExists(absolutePath)) {
      throw new Error(`Le fichier schema.prisma n'existe pas à l'emplacement: ${absolutePath}`);
    }
    
    console.log(chalk.blue(`📄 Lecture du fichier schema.prisma: ${absolutePath}`));
    
    // Lire le contenu du fichier
    const schema = await fs.readFile(absolutePath, 'utf-8');
    
    // Analyser le schéma pour extraire les modèles
    console.log(chalk.blue('🔍 Analyse du schéma Prisma...'));
    const models = parseModelsFromSchema(schema);
    
    // Afficher des informations sur les modèles trouvés
    models.forEach(model => {
      console.log(chalk.blue(`📋 Modèle trouvé: ${model.name} (${model.fields.length} champs)`));
    });
    
    return models;
  } catch (error) {
    // Gérer les erreurs
    throw new Error(`Erreur lors de l'analyse du schéma Prisma: ${error.message}`);
  }
}

/**
 * Parse les modèles à partir du contenu du schéma Prisma
 * @param schema Contenu du fichier schema.prisma
 * @returns Liste des modèles avec leurs champs
 */
function parseModelsFromSchema(schema: string): PrismaModel[] {
  const models: PrismaModel[] = [];
  
  // Expression régulière pour trouver les blocs de modèles
  const modelRegex = /model\s+(\w+)\s+{([^}]*)}/g;
  
  // Trouver tous les modèles dans le schéma
  let modelMatch;
  while ((modelMatch = modelRegex.exec(schema)) !== null) {
    const modelName = modelMatch[1];
    const modelBody = modelMatch[2];
    
    // Extraire les champs du modèle
    const fields = parseFieldsFromModelBody(modelBody);
    
    models.push({
      name: modelName,
      fields
    });
  }
  
  return models;
}

/**
 * Parse les champs à partir du corps d'un modèle
 * @param modelBody Corps du modèle (contenu entre les accolades)
 * @returns Liste des champs du modèle
 */
function parseFieldsFromModelBody(modelBody: string): PrismaField[] {
  const fields: PrismaField[] = [];
  
  // Diviser le corps du modèle en lignes
  const lines = modelBody.split('\n');
  
  // Analyser chaque ligne pour trouver les champs
  for (const line of lines) {
    // Ignorer les lignes vides, les commentaires et les relations
    if (!line.trim() || line.trim().startsWith('//') || line.trim().startsWith('@@')) {
      continue;
    }
    
    // Expression régulière pour extraire les informations du champ
    const fieldRegex = /\s*(\w+)\s+(\w+)(\[\])?\s*(\?)?\s*(@.+)?/;
    const match = line.match(fieldRegex);
    
    if (match) {
      const name = match[1];
      const type = match[2];
      const isList = !!match[3];
      const isRequired = !match[4];
      const attributes = match[5] || '';
      
      fields.push({
        name,
        type,
        isRequired,
        isList,
        isId: attributes.includes('@id'),
        isUnique: attributes.includes('@unique'),
        hasDefaultValue: attributes.includes('@default')
      });
    }
  }
  
  return fields;
} 