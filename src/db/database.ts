import * as SQLite from 'expo-sqlite';
import {
  createAllTablesSQL,
  HABITS_TABLE,
  ENTRIES_TABLE,
  REMINDERS_TABLE,
  ANALYTICS_QUEUE_TABLE,
} from './schema';

export type Database = SQLite.SQLiteDatabase;

const DB_NAME = 'smart_habit_coach.db';

let dbInstance: Database | null = null;

/**
 * Get a singleton SQLite database instance.
 * Ensures tables are created on first load.
 */
export const getDatabase = async (): Promise<Database> => {
  if (dbInstance) {
    return dbInstance;
  }

  const db = await SQLite.openDatabaseAsync(DB_NAME);

  // Run schema creation within a transaction
  await db.withTransactionAsync(async () => {
    for (const statement of createAllTablesSQL) {
      await db.execAsync(statement);
    }
  });

  dbInstance = db;
  return db;
};

/**
 * Utility to clear all application data.
 * Useful for QA, debugging, and "reset app" settings.
 */
export const clearAllData = async () => {
  const db = await getDatabase();

  await db.withTransactionAsync(async () => {
    await db.execAsync(`DELETE FROM ${ENTRIES_TABLE};`);
    await db.execAsync(`DELETE FROM ${REMINDERS_TABLE};`);
    await db.execAsync(`DELETE FROM ${ANALYTICS_QUEUE_TABLE};`);
    await db.execAsync(`DELETE FROM ${HABITS_TABLE};`);
  });
};


