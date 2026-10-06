import { CurriculumSkill } from '../models';

export const CameroonMathSkills: CurriculumSkill[] = [
  {
    curriculumId: 'cm_math_001',
    country: 'Cameroon',
    schoolSystem: 'francophone',
    level: 'Maternelle 2',
    subject: 'mathematics',
    strand: 'counting',
    subStrand: 'one-to-one',
    skillId: 'math_count_1_10',
    skillNameEnglish: 'Count to 10',
    skillNameFrench: 'Compter jusqu\'à 10',
    descriptionEnglish: 'Count objects up to 10 with one-to-one correspondence.',
    descriptionFrench: 'Compter des objets jusqu\'à 10.',
    prerequisiteSkillIds: [],
    recommendedAgeMin: 4,
    recommendedAgeMax: 6,
    difficultyRange: [0.1, 0.3],
    activityTypes: ['COUNT_AND_TAP', 'NUMBER_MATCH'],
    masteryThreshold: 0.85,
    reviewSchedule: 'daily',
    tags: ['early-math', 'counting']
  },
  {
    curriculumId: 'cm_math_002',
    country: 'Cameroon',
    schoolSystem: 'francophone',
    level: 'CP',
    subject: 'mathematics',
    strand: 'addition',
    subStrand: 'within_10',
    skillId: 'math_add_10',
    skillNameEnglish: 'Addition within 10',
    skillNameFrench: 'Addition jusqu\'à 10',
    descriptionEnglish: 'Add two numbers whose sum is 10 or less.',
    descriptionFrench: 'Additionner deux nombres dont la somme est inférieure ou égale à 10.',
    prerequisiteSkillIds: ['math_count_1_10'],
    recommendedAgeMin: 5,
    recommendedAgeMax: 7,
    difficultyRange: [0.2, 0.5],
    activityTypes: ['ADDITION_BUILDER', 'NUMBER_MATCH'],
    masteryThreshold: 0.85,
    reviewSchedule: 'weekly',
    tags: ['addition', 'operations']
  }
];

export const CameroonReadingSkills: CurriculumSkill[] = [
  {
    curriculumId: 'cm_read_fr_001',
    country: 'Cameroon',
    schoolSystem: 'francophone',
    level: 'SIL',
    subject: 'french_reading',
    strand: 'phonics',
    subStrand: 'vowels',
    skillId: 'fr_read_vowels',
    skillNameEnglish: 'French Vowel Sounds',
    skillNameFrench: 'Voyelles',
    descriptionEnglish: 'Identify and pronounce basic French vowels (a, e, i, o, u, y).',
    descriptionFrench: 'Identifier et prononcer les voyelles de base.',
    prerequisiteSkillIds: [],
    recommendedAgeMin: 5,
    recommendedAgeMax: 7,
    difficultyRange: [0.1, 0.4],
    activityTypes: ['PHONEME_MATCH', 'SOUND_HUNT'],
    masteryThreshold: 0.90,
    reviewSchedule: 'daily',
    tags: ['phonics', 'vowels']
  }
];

export const CameroonScienceSkills: CurriculumSkill[] = [
  {
    curriculumId: 'cm_sci_001',
    country: 'Cameroon',
    schoolSystem: 'francophone',
    level: 'CE1',
    subject: 'science',
    strand: 'living_things',
    subStrand: 'animals',
    skillId: 'sci_animal_habitat',
    skillNameEnglish: 'Animal Habitats',
    skillNameFrench: 'Habitats des animaux',
    descriptionEnglish: 'Identify where different animals live.',
    descriptionFrench: 'Identifier où vivent différents animaux (eau, terre, air).',
    prerequisiteSkillIds: [],
    recommendedAgeMin: 6,
    recommendedAgeMax: 9,
    difficultyRange: [0.2, 0.5],
    activityTypes: ['CLASSIFICATION'],
    masteryThreshold: 0.80,
    reviewSchedule: 'monthly',
    tags: ['animals', 'environment']
  }
];
