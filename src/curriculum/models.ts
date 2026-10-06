// src/curriculum/models.ts

export type Subject = 'mathematics' | 'science' | 'english_reading' | 'french_reading';

export interface CurriculumSkill {
  curriculumId: string;
  country: string;
  schoolSystem: 'francophone' | 'anglophone';
  level: string;
  subject: Subject;
  strand: string;
  subStrand: string;
  skillId: string;
  
  skillNameEnglish: string;
  skillNameFrench: string;
  descriptionEnglish: string;
  descriptionFrench: string;
  
  prerequisiteSkillIds: string[];
  recommendedAgeMin: number;
  recommendedAgeMax: number;
  
  difficultyRange: [number, number]; // e.g. [0.1, 1.0]
  activityTypes: string[]; // e.g. ['COUNT_AND_TAP', 'NUMBER_MATCH']
  masteryThreshold: number; // e.g. 0.85
  reviewSchedule: 'immediate' | 'daily' | 'weekly' | 'monthly';
  tags: string[];
}

export interface ActivityTemplate {
  templateId: string;
  skillId: string;
  gameMechanic: string;
  generatorFunction?: string; // used for procedural generation
  staticContent?: any;
  difficulty: number;
}
