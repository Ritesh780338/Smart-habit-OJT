import AsyncStorage from '@react-native-async-storage/async-storage';

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
      habits[index] = { ...habits[index], ...updatedHabit };
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
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
    const filtered = habits.filter(h => h.id !== id);
    console.log('Filtered habits:', filtered.length);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(filtered));
    
    // Also delete related entries
    const entries = await getEntries();
    const filteredEntries = entries.filter(e => e.habitId !== id);
    await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(filteredEntries));
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
