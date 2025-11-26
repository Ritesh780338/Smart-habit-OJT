export type ReminderChannel = 'local_notification' | 'push_notification';

export interface Reminder {
  id: number;
  habitId: number;
  timeOfDay: string; // "HH:MM" 24h
  // Comma-separated list of weekday numbers (0-6). Empty/null = every day.
  daysOfWeek?: string;
  channel: ReminderChannel;
  isEnabled: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}


