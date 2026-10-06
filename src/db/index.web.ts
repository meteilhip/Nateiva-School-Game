// Web specific implementation using localStorage

export const initDB = () => {
  // no-op on web
};

export const saveProgress = (skillId: string, level: number, score: number) => {
  if (typeof window === 'undefined') return;
  const progress = JSON.parse(localStorage.getItem('bq_progress') || '[]');
  progress.push({ skillId, level, score, date: new Date().toISOString() });
  localStorage.setItem('bq_progress', JSON.stringify(progress));
};

export const getAllMastery = (): Record<string, number> => {
  const mastery: Record<string, number> = {};
  if (typeof window !== 'undefined') {
    const progress = JSON.parse(localStorage.getItem('bq_progress') || '[]');
    // Sort by date desc
    progress.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    for (const row of progress) {
      if (mastery[row.skillId] === undefined) {
        mastery[row.skillId] = row.score / 100;
      }
    }
  }
  return mastery;
};

export const saveAvatar = (body: string, hat: string | null, color: string, name: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bq_avatar', JSON.stringify({ body, hat: hat || '', color, name }));
};

export const getAvatar = () => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('bq_avatar');
  return data ? JSON.parse(data) : null;
};

export const addXp = (amount: number) => {
  if (typeof window === 'undefined') return;
  const current = parseInt(localStorage.getItem('bq_xp') || '0', 10);
  localStorage.setItem('bq_xp', (current + amount).toString());
};

export const getXp = (): number => {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('bq_xp') || '0', 10);
};

export interface Task {
  id: string;
  zone: string;
  subject: string;
  description: string;
  isCompleted: boolean;
}

export const getAssignedTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('bq_tasks') || '[]');
};

export const assignTask = (task: Task) => {
  if (typeof window === 'undefined') return;
  const tasks = getAssignedTasks();
  tasks.push(task);
  localStorage.setItem('bq_tasks', JSON.stringify(tasks));
};

export const completeTask = (taskId: string) => {
  if (typeof window === 'undefined') return;
  const tasks = getAssignedTasks();
  const updated = tasks.map(t => t.id === taskId ? { ...t, isCompleted: true } : t);
  localStorage.setItem('bq_tasks', JSON.stringify(updated));
};
