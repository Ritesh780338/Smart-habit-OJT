// Calculate current streak for a habit
export const calculateStreak = (entries, frequency = 'daily') => {
  if (!entries || entries.length === 0) return 0;

  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Get unique dates
  const uniqueDates = [...new Set(sortedEntries.map(e => e.date))];
  
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  
  // Check if completed today or yesterday (grace period)
  const lastCompletedDate = uniqueDates[0];
  const daysDiff = getDaysDifference(lastCompletedDate, today);
  
  if (daysDiff > 1) {
    return 0; // Streak broken
  }

  // Count consecutive days
  for (let i = 0; i < uniqueDates.length; i++) {
    if (i === 0) {
      streak = 1;
    } else {
      const diff = getDaysDifference(uniqueDates[i], uniqueDates[i - 1]);
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }
  }

  return streak;
};

// Calculate longest streak
export const calculateLongestStreak = (entries) => {
  if (!entries || entries.length === 0) return 0;

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  const uniqueDates = [...new Set(sortedEntries.map(e => e.date))];
  
  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const diff = getDaysDifference(uniqueDates[i - 1], uniqueDates[i]);
    if (diff === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return longestStreak;
};

// Helper function to calculate days difference
const getDaysDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Check if habit completed today
export const isCompletedToday = (entries) => {
  const today = new Date().toISOString().split('T')[0];
  return entries.some(e => e.date === today);
};

// Get completion rate for last 7 days
export const getWeeklyCompletionRate = (entries) => {
  const last7Days = getLast7Days();
  const completedDays = entries.filter(e => 
    last7Days.includes(e.date)
  ).map(e => e.date);
  
  const uniqueCompletedDays = [...new Set(completedDays)];
  return Math.round((uniqueCompletedDays.length / 7) * 100);
};

// Helper to get last 7 days
const getLast7Days = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
};
