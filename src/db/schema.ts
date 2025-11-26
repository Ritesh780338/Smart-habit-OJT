// Raw SQL schema definitions for Smart Habit Coach
// Tables: habits, entries, reminders, analytics_queue

export const HABITS_TABLE = 'habits';
export const ENTRIES_TABLE = 'entries';
export const REMINDERS_TABLE = 'reminders';
export const ANALYTICS_QUEUE_TABLE = 'analytics_queue';

export const createHabitsTableSQL = `
  CREATE TABLE IF NOT EXISTS ${HABITS_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    frequency TEXT NOT NULL, -- 'daily' | 'weekly' | 'custom'
    daysOfWeek TEXT,         -- comma-separated weekday indices: "1,3,5"
    reminderTime TEXT,       -- "HH:MM" 24h
    color TEXT,
    isArchived INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
`;

export const createEntriesTableSQL = `
  CREATE TABLE IF NOT EXISTS ${ENTRIES_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habitId INTEGER NOT NULL,
    date TEXT NOT NULL,          -- YYYY-MM-DD
    completed INTEGER NOT NULL,  -- 0 or 1
    completionTime TEXT,         -- ISO datetime
    notes TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (habitId) REFERENCES ${HABITS_TABLE}(id) ON DELETE CASCADE
  );
`;

export const createRemindersTableSQL = `
  CREATE TABLE IF NOT EXISTS ${REMINDERS_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habitId INTEGER NOT NULL,
    timeOfDay TEXT NOT NULL,     -- "HH:MM"
    daysOfWeek TEXT,             -- comma-separated weekday indices
    channel TEXT NOT NULL,       -- 'local_notification' | 'push_notification'
    isEnabled INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (habitId) REFERENCES ${HABITS_TABLE}(id) ON DELETE CASCADE
  );
`;

export const createAnalyticsQueueTableSQL = `
  CREATE TABLE IF NOT EXISTS ${ANALYTICS_QUEUE_TABLE} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    payload TEXT NOT NULL,       -- JSON string
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'sent' | 'failed'
    createdAt TEXT NOT NULL,
    sentAt TEXT
  );
`;

export const createAllTablesSQL: string[] = [
  createHabitsTableSQL,
  createEntriesTableSQL,
  createRemindersTableSQL,
  createAnalyticsQueueTableSQL,
];


