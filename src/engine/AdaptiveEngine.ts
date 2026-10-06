import { saveProgress } from '@/db';

export interface Question {
  zone: string;
  skillId: string;
  difficulty: number;
  prompt: string;
  choices: string[];
  answer: string;
  emoji?: string;
  explanation?: string;
}

export class AdaptiveEngine {
  private mastery: Record<string, number> = {};
  private pLearn = 0.15;      // P(know after attempt)
  private pSlip = 0.10;       // P(wrong despite knowing)
  private pGuess = 0.20;      // P(right despite not knowing)
  private pForget = 0.05;     // P(forget over time)

  constructor(initialMastery: Record<string, number> = {}) {
    this.mastery = initialMastery;
  }

  update(skillId: string, correct: boolean) {
    const p = this.mastery[skillId] ?? 0.3;
    let newP;

    if (correct) {
      const num = p * (1 - this.pSlip);
      const den = num + (1 - p) * this.pGuess;
      newP = num / den;
    } else {
      const num = p * this.pSlip;
      const den = num + (1 - p) * (1 - this.pGuess);
      newP = num / den;
    }

    // Apply learning + forgetting
    newP = newP + (1 - newP) * this.pLearn;
    newP = newP * (1 - this.pForget);

    this.mastery[skillId] = Math.min(0.99, Math.max(0.01, newP));
    
    // In an offline app, we immediately persist this to SQLite
    saveProgress(skillId, 1, Math.round(this.mastery[skillId] * 100));

    return this.mastery[skillId];
  }

  pickNextQuestion(bank: Question[], count: number = 5): Question[] {
    const scored = bank.map(q => {
      const mastery = this.mastery[q.skillId] ?? 0.3;
      const target = 0.75 - mastery; // want them at ~75% success
      return { q, score: Math.abs(target - q.difficulty) };
    });

    scored.sort((a, b) => a.score - b.score);

    const picked: Question[] = [];
    for (let i = 0; i < count; i++) {
      // 70% best-fit, 30% random for variety (prevents boredom)
      if (Math.random() < 0.7) {
        picked.push(scored[i % scored.length].q);
      } else {
        const randIdx = Math.floor(Math.random() * Math.min(5, scored.length));
        picked.push(scored[randIdx].q);
      }
    }
    return picked;
  }

  getRecommendedZone() {
    const keys = Object.keys(this.mastery);
    if (keys.length === 0) return "forest";

    const avg = Object.values(this.mastery).reduce((a, b) => a + b, 0) / keys.length;
    
    if (avg < 0.4) return "forest";
    if (avg < 0.6) return "castle";
    if (avg < 0.75) return "space";
    if (avg < 0.85) return "time";
    return "puzzle";
  }

  getMasteryState() {
    return this.mastery;
  }
}
