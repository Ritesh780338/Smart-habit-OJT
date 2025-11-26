import { getDatabase } from '../db/database';
import type { Entry } from '../models';

export const EntryRepository = {
  async getForHabit(habitId: number): Promise<Entry[]> {
    const db = await getDatabase();
    return db.getAllAsync<Entry>(
      `SELECT * FROM entries WHERE habitId = ? ORDER BY date DESC;`,
      [habitId],
    );
  },

  async addCompletion(habitId: number, date: string, notes?: string): Promise<Entry> {
    const db = await getDatabase();
    const now = new Date().toISOString();

    const result = await db.runAsync(
      `INSERT INTO entries (habitId, date, completed, completionTime, notes, createdAt)
       VALUES (?, ?, 1, ?, ?, ?);`,
      [habitId, date, now, notes ?? null, now],
    );

    const id = result.lastInsertRowId as number;
    const entry = await db.getFirstAsync<Entry>(`SELECT * FROM entries WHERE id = ?;`, [id]);
    if (!entry) {
      throw new Error('Failed to load created entry');
    }
    return entry;
  },

  async toggleCompletion(habitId: number, date: string): Promise<void> {
    const db = await getDatabase();
    const existing = await db.getFirstAsync<Entry>(
      `SELECT * FROM entries WHERE habitId = ? AND date = ?;`,
      [habitId, date],
    );

    if (existing && existing.completed) {
      await db.runAsync(`DELETE FROM entries WHERE id = ?;`, [existing.id]);
      return;
    }

    await this.addCompletion(habitId, date);
  },
};


