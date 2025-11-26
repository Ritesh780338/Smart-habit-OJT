import { getDatabase } from '../db/database';
import type { Habit } from '../models';

export const HabitRepository = {
  async getAll(): Promise<Habit[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<Habit>(`SELECT * FROM habits WHERE isArchived = 0 ORDER BY createdAt DESC;`);
    return rows;
  },

  async getById(id: number): Promise<Habit | null> {
    const db = await getDatabase();
    const row = await db.getFirstAsync<Habit>(`SELECT * FROM habits WHERE id = ?;`, [id]);
    return row ?? null;
  },

  async create(data: Omit<Habit, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>): Promise<Habit> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    const result = await db.runAsync(
      `INSERT INTO habits (title, description, frequency, daysOfWeek, reminderTime, color, isArchived, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?);`,
      [
        data.title,
        data.description ?? null,
        data.frequency,
        data.daysOfWeek ?? null,
        data.reminderTime ?? null,
        data.color ?? null,
        now,
        now,
      ],
    );

    const id = result.lastInsertRowId as number;
    const habit = await this.getById(id);
    if (!habit) {
      throw new Error('Failed to load created habit');
    }
    return habit;
  },

  async update(id: number, data: Partial<Omit<Habit, 'id' | 'createdAt'>>): Promise<Habit> {
    const db = await getDatabase();
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error('Habit not found');
    }

    const updated: Habit = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await db.runAsync(
      `UPDATE habits
       SET title = ?, description = ?, frequency = ?, daysOfWeek = ?, reminderTime = ?, color = ?, isArchived = ?, updatedAt = ?
       WHERE id = ?;`,
      [
        updated.title,
        updated.description ?? null,
        updated.frequency,
        updated.daysOfWeek ?? null,
        updated.reminderTime ?? null,
        updated.color ?? null,
        updated.isArchived ? 1 : 0,
        updated.updatedAt,
        id,
      ],
    );

    const habit = await this.getById(id);
    if (!habit) {
      throw new Error('Failed to load updated habit');
    }
    return habit;
  },

  async archive(id: number): Promise<void> {
    await this.update(id, { isArchived: true });
  },

  async delete(id: number): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM habits WHERE id = ?;`, [id]);
  },
};


