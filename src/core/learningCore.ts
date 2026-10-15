// src/core/learningCore.ts
/**
 * NATEIVA EDUKIDS: Deterministic, testable learning core
 * Maps directly to learning-core.mjs logic and algorithms.
 */

export const BANDS = ['nursery', 'sil_cp', 'ce1_ce2', 'cm1_cm2'] as const;
export type GradeBand = typeof BANDS[number];

export const SKILLS: Record<GradeBand, string[]> = {
  nursery: ['count', 'compare', 'shapes'],
  sil_cp: ['add', 'subtract', 'numberline'],
  ce1_ce2: ['multiply', 'divide', 'add', 'subtract'],
  cm1_cm2: ['multiply', 'divide', 'fractions', 'decimals']
};

export interface MasteryRecord {
  independentCorrect: number;
  independentAttempts: number;
  streak: number;
}

export interface Problem {
  id: string;
  skill: string;
  level: number;
  a: number;
  b: number;
  answer: string | number;
  display: string;
  band: GradeBand;
  options: string[];
}

export interface AttemptLog {
  problemId: string;
  skill: string;
  gameId: string;
  response: any;
  correct: boolean;
  assisted: boolean;
  elapsedMs: number;
  at: number;
}

export interface Learner {
  id: string;
  band: GradeBand;
  language: 'en' | 'fr';
  mastery: Record<string, MasteryRecord>;
  history: AttemptLog[];
  session: any;
}

export function createLearner({
  id = 'child',
  band = 'sil_cp',
  language = 'fr'
}: {
  id?: string;
  band?: GradeBand;
  language?: 'en' | 'fr';
} = {}): Learner {
  if (!BANDS.includes(band)) throw new Error('Invalid grade band');
  return { id, band, language, mastery: {}, history: [], session: null };
}

export function skillFor(learner: Learner, index: number = 0): string {
  const arr = SKILLS[learner.band];
  return arr[index % arr.length];
}

export function levelFor(learner: Learner, skill: string): number {
  const m = learner.mastery[skill] || { independentCorrect: 0, independentAttempts: 0, streak: 0 };
  return Math.min(4, 1 + Math.floor(m.independentCorrect / 4));
}

function int(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

function generateDistractors(answer: string | number, count: number = 3): string[] {
  const opts = new Set<string>();
  opts.add(String(answer));
  const numAns = typeof answer === 'number' ? answer : parseFloat(String(answer));

  if (!isNaN(numAns)) {
    const offsets = [-2, -1, 1, 2, 3, -3, 4, 5];
    for (const off of offsets) {
      if (opts.size >= count + 1) break;
      const candidate = Math.max(0, numAns + off);
      opts.add(String(candidate));
    }
  } else {
    const fallbacks = ['left', 'right', 'equal', '1/2', '1/4', '3/4', '2/3', 'Triangle', 'Cercle', 'Carré'];
    for (const f of fallbacks) {
      if (opts.size >= count + 1) break;
      opts.add(f);
    }
  }

  // Shuffle options
  return Array.from(opts).sort(() => 0.5 - Math.random());
}

export function generateProblem(
  learner: Learner,
  skill: string,
  rng: () => number = Math.random
): Problem {
  const level = levelFor(learner, skill);
  const band = learner.band;
  const caps: Record<GradeBand, number[]> = {
    nursery: [5, 10, 15, 20],
    sil_cp: [10, 20, 50, 100],
    ce1_ce2: [30, 100, 500, 1000],
    cm1_cm2: [100, 1000, 10000, 100000]
  };
  const cap = caps[band][level - 1];
  let a: number, b: number, answer: string | number, display: string;

  if (skill === 'count' || skill === 'compare' || skill === 'shapes') {
    a = int(rng, 1, cap);
    b = int(rng, 1, cap);
    answer = skill === 'compare' ? (a > b ? 'left' : a < b ? 'right' : 'equal') : a;
    display = skill === 'compare' ? `${a} ? ${b}` : skill === 'shapes' ? `Trouve ${a} objets` : `Compte ${a} objets`;
  } else if (skill === 'multiply') {
    a = int(rng, 2, Math.min(12, level * 3 + 2));
    b = int(rng, 2, Math.min(12, level * 3 + 2));
    answer = a * b;
    display = `${a} × ${b}`;
  } else if (skill === 'divide') {
    b = int(rng, 2, Math.min(12, level * 3 + 2));
    const quot = int(rng, 2, Math.min(12, level * 3 + 2));
    a = b * quot;
    answer = quot;
    display = `${a} ÷ ${b}`;
  } else if (skill === 'fractions') {
    b = [2, 4, 5, 8][level - 1];
    a = int(rng, 1, b - 1);
    answer = `${a}/${b}`;
    display = `Montre ${a}/${b}`;
  } else if (skill === 'decimals') {
    const scale = level < 3 ? 10 : 100;
    a = int(rng, 1, cap);
    b = int(rng, 1, cap);
    answer = (a + b) / scale;
    display = `${a / scale} + ${b / scale}`;
  } else if (skill === 'subtract') {
    a = int(rng, 2, cap);
    b = int(rng, 1, a);
    answer = a - b;
    display = `${a} − ${b}`;
  } else {
    // Default: addition
    a = int(rng, 1, Math.max(2, Math.floor(cap * 0.6)));
    b = int(rng, 1, Math.max(2, cap - a));
    answer = a + b;
    display = `${a} + ${b}`;
  }

  const options = generateDistractors(answer, 3);
  return {
    id: `${skill}:${a}:${b}:${level}`,
    skill,
    level,
    a,
    b,
    answer,
    display,
    band,
    options
  };
}

export function nextProblem(
  learner: Learner,
  skill: string,
  rng: () => number = Math.random
): Problem {
  const recent = new Set(learner.history.filter(h => h.skill === skill).slice(-8).map(h => h.problemId));
  for (let n = 0; n < 40; n++) {
    const p = generateProblem(learner, skill, rng);
    if (!recent.has(p.id)) return p;
  }
  return generateProblem(learner, skill, rng);
}

export function recordAttempt(
  learner: Learner,
  problem: Problem,
  {
    response,
    assisted = false,
    gameId,
    elapsedMs = 0
  }: {
    response: any;
    assisted?: boolean;
    gameId: string;
    elapsedMs?: number;
  }
) {
  if (!gameId) throw new Error('gameId required');
  const correct = String(response) === String(problem.answer);
  const old = learner.mastery[problem.skill] || { independentCorrect: 0, independentAttempts: 0, streak: 0 };
  const m = { ...old };
  if (!assisted) {
    m.independentAttempts++;
    m.streak = correct ? m.streak + 1 : 0;
    if (correct) m.independentCorrect++;
  }
  learner.mastery[problem.skill] = m;
  learner.history.push({
    problemId: problem.id,
    skill: problem.skill,
    gameId,
    response,
    correct,
    assisted,
    elapsedMs,
    at: Date.now()
  });
  return { correct, level: levelFor(learner, problem.skill), mastery: m };
}

export interface TutorStepAction {
  action: string;
  values?: number[];
  speech: string;
}

export function tutorSteps(problem: Problem, language: 'en' | 'fr' = 'fr'): TutorStepAction[] {
  const fr = language === 'fr';
  const { a, b, skill, answer } = problem;
  const t = (en: string, french: string) => (fr ? french : en);

  if (skill === 'add' || skill === 'numberline') {
    return [
      { action: 'SHOW_GROUP', values: [a], speech: t('Look at the first group.', 'Regarde le premier groupe.') },
      { action: 'ADD_GROUP', values: [a, b], speech: t('Move the second group next to it.', 'Rapproche le deuxième groupe.') },
      { action: 'COMBINE_AND_COUNT', values: [a, b], speech: t('Count everything together.', 'Compte tous les objets ensemble.') },
      { action: 'MAKE_TEN_IF_USEFUL', values: [a, b], speech: t('Try making a group of ten.', 'Essaie de former un groupe de dix.') },
      { action: 'GUIDED_NEW_EXAMPLE', speech: t('Now try a new one!', 'Essaie un nouvel exercice !') }
    ];
  }
  if (skill === 'subtract') {
    return [
      { action: 'SHOW_GROUP', values: [a], speech: t('Look at all the objects.', 'Regarde tous les objets.') },
      { action: 'REMOVE_GROUP', values: [a, b], speech: t('Take away this many.', 'Enlève cette quantité.') },
      { action: 'COUNT_REMAINING', values: [typeof answer === 'number' ? answer : 0], speech: t('Count what is left.', 'Compte ce qui reste.') },
      { action: 'GUIDED_NEW_EXAMPLE', speech: t('Your turn!', 'À toi !') }
    ];
  }
  if (skill === 'multiply') {
    return [
      { action: 'BUILD_ARRAY', values: [a, b], speech: t('Build rows and columns.', 'Construis des lignes et des colonnes.') },
      { action: 'COUNT_ROWS', values: [a, b], speech: t('Count each row.', 'Compte chaque ligne.') },
      { action: 'REPEATED_ADDITION', values: [a, b], speech: t('Add equal groups.', 'Additionne les groupes égaux.') },
      { action: 'GUIDED_NEW_EXAMPLE', speech: t('Try another array.', 'Essaie un autre tableau.') }
    ];
  }
  if (skill === 'divide') {
    return [
      { action: 'SHOW_GROUP', values: [a], speech: t('Start with all the objects.', 'Commence avec tous les objets.') },
      { action: 'DISTRIBUTE_EQUALLY', values: [a, b], speech: t('Share them equally.', 'Partage-les équitablement.') },
      { action: 'COUNT_EACH_SHARE', values: [typeof answer === 'number' ? answer : 0], speech: t('Count each share.', 'Compte chaque part.') },
      { action: 'GUIDED_NEW_EXAMPLE', speech: t('Now share a new group.', 'Partage maintenant un nouveau groupe.') }
    ];
  }
  return [
    { action: 'SHOW_MODEL', values: [a, b], speech: t('Watch the model.', 'Regarde le modèle.') },
    { action: 'MANIPULATE', values: [a, b], speech: t('Move the pieces yourself.', 'Déplace les pièces toi-même.') },
    { action: 'GUIDED_NEW_EXAMPLE', speech: t('Now you try.', 'À toi de jouer.') }
  ];
}
