export interface Entry {
  id: number;
  habitId: number;
  // Stored as YYYY-MM-DD to simplify streak calculation
  date: string;
  completed: boolean;
  completionTime?: string; // ISO string
  notes?: string;
  createdAt: string; // ISO string
}


