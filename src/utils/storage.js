import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleHabitReminder, cancelHabitNotifications } from './notifications';
import { trackEvent, AnalyticsEvents } from './analytics';

const HABITS_KEY = '@habits';
const ENTRIES_KEY = '@entries';

// Habit CRUD operations
export const saveHabit = async (habit) => {
  try {
    const habits = await getHabits();
    const newHabit = {
      id: Date.now().toString(),
      ...habit,
      createdAt: new Date().toISOString(),
    };
    habits.push(newHabit);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    
    // Schedule notification if reminder time is set
    if (newHabit.reminderTime) {
      const notificationId = await scheduleHabitReminder(
        newHabit.id,
        newHabit.title,
        newHabit.reminderTime
      );
      if (notificationId) {
        newHabit.notificationId = notificationId;
        await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
      }
    }
    
    // Track analytics
    await trackEvent(AnalyticsEvents.HABIT_CREATED, {
      habitId: newHabit.id,
      frequency: newHabit.frequency,
      hasReminder: !!newHabit.reminderTime,
    });
    
    return newHabit;
  } catch (error) {
    console.error('Error saving habit:', error);
    throw error;
  }
};

export const getHabits = async () => {
  try {
    const habits = await AsyncStorage.getItem(HABITS_KEY);
    return habits ? JSON.parse(habits) : [];
  } catch (error) {
    console.error('Error getting habits:', error);
    return [];
  }
};

export const updateHabit = async (id, updatedHabit) => {
  try {
    const habits = await getHabits();
    const index = habits.findIndex(h => h.id === id);
    if (index !== -1) {
      const oldHabit = habits[index];
      habits[index] = { ...oldHabit, ...updatedHabit };
      
      // Update notification if reminder time changed
      if (oldHabit.reminderTime !== updatedHabit.reminderTime) {
        await cancelHabitNotifications(id);
        if (updatedHabit.reminderTime) {
          const notificationId = await scheduleHabitReminder(
            id,
            updatedHabit.title || oldHabit.title,
            updatedHabit.reminderTime
          );
          if (notificationId) {
            habits[index].notificationId = notificationId;
          }
        }
      }
      
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
      
      // Track analytics
      await trackEvent(AnalyticsEvents.HABIT_EDITED, {
        habitId: id,
        changedReminder: oldHabit.reminderTime !== updatedHabit.reminderTime,
      });
      
      return habits[index];
    }
    throw new Error('Habit not found');
  } catch (error) {
    console.error('Error updating habit:', error);
    throw error;
  }
};

export const deleteHabit = async (id) => {
  try {
    console.log('Deleting habit with id:', id);
    const habits = await getHabits();
    console.log('Current habits:', habits.length);
    
    // Cancel notifications
    await cancelHabitNotifications(id);
    
    const filtered = habits.filter(h => h.id !== id);
    console.log('Filtered habits:', filtered.length);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(filtered));
    
    // Also delete related entries
    const entries = await getEntries();
    const filteredEntries = entries.filter(e => e.habitId !== id);
    await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(filteredEntries));
    
    // Track analytics
    await trackEvent(AnalyticsEvents.HABIT_DELETED, { habitId: id });
    
    console.log('Habit deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting habit:', error);
    throw error;
  }
};

// Entry operations
export const saveEntry = async (habitId) => {
  try {
    const entries = await getEntries();
    const newEntry = {
      id: Date.now().toString(),
      habitId,
      completedAt: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
    };
    entries.push(newEntry);
    await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
    
    // Track analytics
    const habitEntries = entries.filter(e => e.habitId === habitId);
    const streak = habitEntries.length;
    
    await trackEvent(AnalyticsEvents.HABIT_COMPLETED, {
      habitId,
      currentStreak: streak,
    });
    
    // Track streak milestones
    if ([7, 30, 100, 365].includes(streak)) {
      await trackEvent(AnalyticsEvents.STREAK_MILESTONE, {
        habitId,
        milestone: streak,
      });
    }
    
    return newEntry;
  } catch (error) {
    console.error('Error saving entry:', error);
    throw error;
  }
};

export const getEntries = async () => {
  try {
    const entries = await AsyncStorage.getItem(ENTRIES_KEY);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error getting entries:', error);
    return [];
  }
};

export const getEntriesForHabit = async (habitId) => {
  try {
    const entries = await getEntries();
    return entries.filter(e => e.habitId === habitId);
  } catch (error) {
    console.error('Error getting entries for habit:', error);
    return [];
  }
};
