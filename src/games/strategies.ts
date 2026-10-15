// src/games/strategies.ts
import { MemoryTrickStrategy } from './types';

export const StrategyLibrary: Record<string, MemoryTrickStrategy> = {
  // Math Addition: Make-Ten Strategy
  'make_ten_addition': {
    strategyId: 'make_ten_addition',
    skillId: 'math_add_10',
    nameFrench: 'L\'Astuce des Amis de 10',
    nameEnglish: 'The Make-Ten Secret',
    descriptionFrench: 'Complète d\'abord pour faire 10, puis ajoute ce qu\'il reste ! Exemple: 8 + 5 ➔ (8 + 2) + 3 = 10 + 3 = 13.',
    descriptionEnglish: 'Complete to 10 first, then add what remains! e.g., 8 + 5 = (8 + 2) + 3 = 10 + 3 = 13.',
    visualDemonstration: '8 points bleus + 2 points verts forment une boîte de 10 complète, avec 3 points restants.',
    gradeBandMin: 'SIL_CP'
  },

  // Math Addition: Regrouping Tens & Ones
  'tens_and_ones_regroup': {
    strategyId: 'tens_and_ones_regroup',
    skillId: 'math_add_regroup',
    nameFrench: 'La Baguette Magique des Dizaines (Retenue)',
    nameEnglish: 'Tens Exchange Wand',
    descriptionFrench: 'Dès que tu as 10 petits cubes d\'unités, fusionne-les en 1 barre de 10 qui s\'envole dans la colonne des dizaines.',
    descriptionEnglish: 'Whenever you have 10 unit cubes, fuse them into 1 ten-rod and carry it to the tens column.',
    visualDemonstration: '10 cubes jaunes s\'assemblent avec un éclair magique et deviennent une barre bleue.',
    gradeBandMin: 'CE1_CE2'
  },

  // Math Subtraction: Inverse Checking
  'inverse_check_subtraction': {
    strategyId: 'inverse_check_subtraction',
    skillId: 'math_sub_10',
    nameFrench: 'La Vérification par le Miroir (Addition Inverse)',
    nameEnglish: 'Inverse Mirror Check',
    descriptionFrench: 'Pour vérifier que 9 - 4 = 5, fais le chemin retour: 5 + 4 = 9 !',
    descriptionEnglish: 'To check that 9 - 4 = 5, reverse it: 5 + 4 = 9!',
    visualDemonstration: 'Flèche vers l\'avant avec soustraction, flèche retour avec addition.',
    gradeBandMin: 'SIL_CP'
  },

  // Math Multiplication: Arrays & Equal Groups
  'array_rows_columns': {
    strategyId: 'array_rows_columns',
    skillId: 'math_mult_arrays',
    nameFrench: 'Les Rangées de Mangues au Marché',
    nameEnglish: 'Market Array Rows',
    descriptionFrench: 'Pour faire 3 × 4, compte 3 lignes de 4 mangues : 4, puis 8, puis 12 !',
    descriptionEnglish: 'For 3 × 4, count 3 rows of 4 mangoes: 4, 8, 12!',
    visualDemonstration: 'Quadrillage régulier de 3 rangées sur 4 colonnes.',
    gradeBandMin: 'CE1_CE2'
  },

  // Reading: Syllable Chunking
  'syllable_chunking': {
    strategyId: 'syllable_chunking',
    skillId: 'fr_syllable_blends',
    nameFrench: 'Le Découpage en Tranches de Sons',
    nameEnglish: 'Syllable Bread Slices',
    descriptionFrench: 'Coupe les longs mots en petites bouchées de syllabes: PA - PI - LLON.',
    descriptionEnglish: 'Slice long words into small syllable bites: PA - PI - LLON.',
    visualDemonstration: 'Le mot se sépare en bulles de couleurs rythmées par des battements de mains.',
    gradeBandMin: 'NURSERY'
  },

  // Science: POE (Predict - Observe - Explain)
  'science_poe': {
    strategyId: 'science_poe',
    skillId: 'sci_living_nonliving',
    nameFrench: 'La Règle d\'Or du Savant (P.O.E.)',
    nameEnglish: 'Scientist Golden Rule (P.O.E.)',
    descriptionFrench: '1. Prédis ce qui va se passer. 2. Observe l\'expérience. 3. Explique le résultat.',
    descriptionEnglish: '1. Predict what will happen. 2. Observe the experiment. 3. Explain the outcome.',
    visualDemonstration: 'Ampoule allumée ➔ Loupe d\'observation ➔ Bloc-notes de conclusion.',
    gradeBandMin: 'CE1_CE2'
  }
};
