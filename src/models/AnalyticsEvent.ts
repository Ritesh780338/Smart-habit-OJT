export type AnalyticsEventType =
  | 'habit_created'
  | 'habit_deleted'
  | 'habit_completed'
  | 'reminder_fired'
  | 'streak_updated';

export type AnalyticsEventStatus = 'pending' | 'sent' | 'failed';

export interface AnalyticsEvent {
  id: number;
  type: AnalyticsEventType;
  payload: string; // JSON string for offline queue
  status: AnalyticsEventStatus;
  createdAt: string; // ISO string
  sentAt?: string; // ISO string
}


