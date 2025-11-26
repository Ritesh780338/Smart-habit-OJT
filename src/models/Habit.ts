export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export interface Habit {
  id: number;
  title: string;
  description?: string;
  frequency: HabitFrequency;
  // Comma separated list of weekday numbers (0-6) for weekly/custom patterns
  daysOfWeek?: string;
  reminderTime?: string; // "HH:MM" 24h format
  color?: string; // For charts / UI tags
  isArchived: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}


