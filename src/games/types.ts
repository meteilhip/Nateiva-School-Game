// src/games/types.ts

export type InteractionMode = 
  | 'drag-drop'
  | 'tap'
  | 'steer'
  | 'build'
  | 'draw'
  | 'sequence'
  | 'listen-speak'
  | 'simulate'
  | 'explore';

export type TutorMode = 
  | 'WATCH_ME'      // Narrated visual demonstration
  | 'LETS_DO_IT'    // Guided manipulatives with child interaction
  | 'YOUR_TURN'     // Independent transfer item with different numbers
  | 'WHY_IT_WORKS'  // Conceptual explanation of underlying principle
  | 'ANOTHER_WAY';  // Alternative visual representation or memory trick

export interface TutorialStep {
  stepNumber: number;
  title: string;
  narratorTextFr: string;
  narratorTextEn: string;
  visualStateBefore: string;
  animationAction: string;
  visualStateAfter: string;
  childAction?: string;
  expectedObservation: string;
  misconceptionAddressed?: string;
  memoryTrick?: string;
}

export interface GameDefinition {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  gradeBands: string[]; // 'NURSERY' | 'SIL_CP' | 'CE1_CE2' | 'CM1_CM2'
  subjects: string[];   // 'mathematics' | 'french_reading' | 'english_reading' | 'science' | 'cross_subject'
  categories: string[]; // 'Adventure' | 'Puzzle' | 'Creative' | 'Action' | 'Story' | 'Simulation' | 'Matching'
  curriculumSkillIds: string[];
  mechanic: string;
  rendererKey: string;
  assetBundle: string;
  animationSequence: string[];
  interactionMode: InteractionMode;
  tutorialTemplate: string;
  accessibilityFallback: string;
  audioCues: string[];
  winCondition: string;
  qaTestId: string;
}

export interface AttemptEvent {
  learnerId: string;
  gameId: string;
  skillId: string;
  activityId: string;
  correct: boolean;
  difficulty: number;
  hintLevel: number; // 0 = independent, 1 = small hint, 2 = strong hint, 3 = full tutor
  independent: boolean;
  timeSpentMs: number;
  misconceptionCode?: string;
  timestamp: number;
}

export interface MemoryTrickStrategy {
  strategyId: string;
  skillId: string;
  nameFrench: string;
  nameEnglish: string;
  descriptionFrench: string;
  descriptionEnglish: string;
  visualDemonstration: string;
  gradeBandMin: string;
}
