import type { Entry } from '../models';

/**
 * Calculate the current streak (consecutive days up to today) for a habit.
 * Assumes entries have `date` in YYYY-MM-DD and `completed = true`.
 */
export const calculateCurrentStreak = (entries: Entry[]): number => {
  if (!entries.length) return 0;

  const completedDates = new Set(entries.filter(e => e.completed).map(e => e.date));
  let streak = 0;

  const today = new Date();

  while (true) {
    const dateStr = toDateKey(today, -streak);
    if (!completedDates.has(dateStr)) {
      break;
    }
    streak += 1;
  }

  return streak;
};

/**
 * Calculate the longest ever streak for a habit.
 */
export const calculateBestStreak = (entries: Entry[]): number => {
  if (!entries.length) return 0;
  const completedDates = new Set(entries.filter(e => e.completed).map(e => e.date));

  let best = 0;
  let current = 0;

  // Sort all unique dates ascending
  const allDates = Array.from(completedDates).sort();
  let lastDate: string | null = null;

  for (const date of allDates) {
    if (lastDate && isNextDay(lastDate, date)) {
      current += 1;
    } else {
      current = 1;
    }
    if (current > best) best = current;
    lastDate = date;
  }

  return best;
};

const toDateKey = (base: Date, offsetDays: number): string => {
  const d = new Date(base);
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isNextDay = (prev: string, next: string): boolean => {
  const prevDate = new Date(prev);
  const nextDate = new Date(next);
  const diffMs = nextDate.getTime() - prevDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays === 1;
};


