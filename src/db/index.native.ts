import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDB = () => {
  if (!db) {
    db = SQLite.openDatabaseSync('brainquest.db');
  }

  db.execSync(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      skillId TEXT NOT NULL,
      level INTEGER NOT NULL,
      score INTEGER NOT NULL,
      date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS avatar (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      body TEXT NOT NULL,
      hat TEXT,
      color TEXT NOT NULL,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      xp INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      zone TEXT NOT NULL,
      subject TEXT NOT NULL,
      description TEXT NOT NULL,
      isCompleted INTEGER NOT NULL DEFAULT 0
    );
  `);
};

const getNativeDb = () => {
  if (!db) initDB();
  return db!;
};

export const saveProgress = (skillId: string, level: number, score: number) => {
  getNativeDb().runSync('INSERT INTO progress (skillId, level, score, date) VALUES (?, ?, ?, ?)', [skillId, level, score, new Date().toISOString()]);
};

export const getAllMastery = (): Record<string, number> => {
  const mastery: Record<string, number> = {};
  const records = getNativeDb().getAllSync('SELECT skillId, score FROM progress ORDER BY date DESC') as any[];
  for (const row of records) {
    if (mastery[row.skillId] === undefined) {
      mastery[row.skillId] = row.score / 100;
    }
  }
  return mastery;
};

export const saveAvatar = (body: string, hat: string | null, color: string, name: string) => {
  getNativeDb().runSync('DELETE FROM avatar'); // only 1 avatar
  getNativeDb().runSync('INSERT INTO avatar (body, hat, color, name) VALUES (?, ?, ?, ?)', [body, hat || '', color, name]);
};

export const getAvatar = () => {
  const rows = getNativeDb().getAllSync('SELECT * FROM avatar LIMIT 1') as any[];
  return rows.length > 0 ? rows[0] : null;
};

export const addXp = (amount: number) => {
  const rows = getNativeDb().getAllSync('SELECT * FROM stats LIMIT 1') as any[];
  if (rows.length === 0) {
    getNativeDb().runSync('INSERT INTO stats (xp) VALUES (?)', [amount]);
  } else {
    getNativeDb().runSync('UPDATE stats SET xp = xp + ? WHERE id = ?', [amount, rows[0].id]);
  }
};

export const getXp = (): number => {
  const rows = getNativeDb().getAllSync('SELECT xp FROM stats LIMIT 1') as any[];
  return rows.length > 0 ? rows[0].xp : 0;
};

export interface Task {
  id: string;
  zone: string;
  subject: string;
  description: string;
  isCompleted: boolean;
}

export const getAssignedTasks = (): Task[] => {
  const records = getNativeDb().getAllSync('SELECT * FROM tasks') as any[];
  return records.map(r => ({
    id: r.id,
    zone: r.zone,
    subject: r.subject,
    description: r.description,
    isCompleted: r.isCompleted === 1
  }));
};

export const assignTask = (task: Task) => {
  getNativeDb().runSync(
    'INSERT OR REPLACE INTO tasks (id, zone, subject, description, isCompleted) VALUES (?, ?, ?, ?, ?)',
    [task.id, task.zone, task.subject, task.description, task.isCompleted ? 1 : 0]
  );
};

export const completeTask = (taskId: string) => {
  getNativeDb().runSync('UPDATE tasks SET isCompleted = 1 WHERE id = ?', [taskId]);
};
