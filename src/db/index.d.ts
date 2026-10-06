export declare const initDB: () => void;
export declare const saveProgress: (skillId: string, level: number, score: number) => void;
export function getMastery(skillId: string): number;
export function updateMastery(skillId: string, delta: number): void;
export function getAllMastery(): Record<string, number>;
export function saveAvatar(avatar: any): void;
export function getAvatar(): any;
export function addXp(amount: number): void;
export function getXp(): number;

export interface Task {
  id: string;
  zone: string;
  subject: string;
  description: string;
  isCompleted: boolean;
}

export function getAssignedTasks(): Task[];
export function assignTask(task: Task): void;
export function completeTask(taskId: string): void;
