// src/adaptive/engine.ts

export type MasteryState = 'UNSEEN' | 'INTRODUCED' | 'LEARNING' | 'DEVELOPING' | 'SECURE' | 'REVIEW_DUE';

export interface AttemptRecord {
  learnerId: string;
  skillId: string;
  activityId: string;
  timestamp: number;
  correct: boolean;
  difficulty: number;
  responseTimeMs: number;
  hintsUsed: number;
  explanationUsed: boolean;
  retryCount: number;
  inputMode: 'touch' | 'keyboard' | 'voice';
  confidence?: number;
}

export interface SkillMastery {
  skillId: string;
  masteryValue: number; // 0.0 to 1.0
  state: MasteryState;
  consecutiveSuccesses: number;
  consecutiveFailures: number;
  lastPracticed: number;
  nextReviewDue: number;
}

/**
 * Recalculates the mastery of a skill based on a new attempt.
 * Implementation inspired by BKT / Elo style models.
 */
export function calculateNewMastery(
  current: SkillMastery, 
  attempt: AttemptRecord
): SkillMastery {
  
  let newMastery = current.masteryValue;
  const learningRate = 0.15;
  const penaltyRate = 0.10;

  // Penalize for hints
  const hintPenalty = attempt.hintsUsed * 0.05;

  if (attempt.correct) {
    newMastery += learningRate * attempt.difficulty;
    newMastery -= hintPenalty;
    current.consecutiveSuccesses += 1;
    current.consecutiveFailures = 0;
  } else {
    newMastery -= penaltyRate;
    current.consecutiveFailures += 1;
    current.consecutiveSuccesses = 0;
  }

  // Cap between 0 and 1
  newMastery = Math.max(0, Math.min(1, newMastery));

  // Determine state
  let newState: MasteryState = 'LEARNING';
  if (newMastery < 0.30) newState = 'LEARNING'; // Actually should be 'INTRODUCED' if new
  else if (newMastery < 0.50) newState = 'LEARNING';
  else if (newMastery < 0.70) newState = 'DEVELOPING';
  else newState = 'SECURE';

  // Schedule next review based on mastery
  let reviewOffset = 0;
  if (newState === 'SECURE') reviewOffset = 7 * 24 * 60 * 60 * 1000; // 7 days
  else if (newState === 'DEVELOPING') reviewOffset = 2 * 24 * 60 * 60 * 1000; // 2 days
  else reviewOffset = 24 * 60 * 60 * 1000; // 1 day

  return {
    ...current,
    masteryValue: newMastery,
    state: newState,
    lastPracticed: attempt.timestamp,
    nextReviewDue: attempt.timestamp + reviewOffset
  };
}
