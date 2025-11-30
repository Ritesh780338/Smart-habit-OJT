import { AccessibilityInfo, Platform } from 'react-native';

// Check if screen reader is enabled
export const isScreenReaderEnabled = async () => {
  try {
    return await AccessibilityInfo.isScreenReaderEnabled();
  } catch (error) {
    console.error('Error checking screen reader:', error);
    return false;
  }
};

// Announce message to screen reader
export const announceForAccessibility = (message) => {
  try {
    AccessibilityInfo.announceForAccessibility(message);
  } catch (error) {
    console.error('Error announcing for accessibility:', error);
  }
};

// Accessibility guidelines for the app
export const AccessibilityGuidelines = {
  // Minimum touch target size (44x44 points on iOS, 48x48 dp on Android)
  minTouchTarget: Platform.OS === 'ios' ? 44 : 48,
  
  // Color contrast ratios (WCAG AA)
  contrastRatios: {
    normalText: 4.5, // 4.5:1 for normal text
    largeText: 3, // 3:1 for large text (18pt+)
  },
  
  // Font sizes
  fontSizes: {
    minimum: 12,
    body: 16,
    heading: 20,
  },
};

// Validate color contrast (simplified)
export const hasGoodContrast = (foreground, background) => {
  // This is a simplified check - in production, use a proper contrast calculation library
  // For now, we ensure our predefined colors meet WCAG AA standards
  const goodCombinations = [
    { fg: '#fff', bg: '#6366f1' }, // White on indigo
    { fg: '#fff', bg: '#10b981' }, // White on green
    { fg: '#fff', bg: '#ef4444' }, // White on red
    { fg: '#1f2937', bg: '#fff' }, // Dark gray on white
  ];
  
  return goodCombinations.some(
    combo => combo.fg === foreground && combo.bg === background
  );
};

// Get accessibility label for habit card
export const getHabitAccessibilityLabel = (habit, streak, completedToday) => {
  let label = `Habit: ${habit.title}`;
  
  if (habit.description) {
    label += `, ${habit.description}`;
  }
  
  label += `, Current streak: ${streak} days`;
  label += `, Frequency: ${habit.frequency}`;
  
  if (habit.reminderTime) {
    label += `, Reminder at ${habit.reminderTime}`;
  }
  
  if (completedToday) {
    label += `, Completed today`;
  } else {
    label += `, Not completed today`;
  }
  
  return label;
};

// Get accessibility hint for buttons
export const AccessibilityHints = {
  completeHabit: 'Double tap to mark this habit as completed for today',
  editHabit: 'Double tap to edit this habit',
  deleteHabit: 'Double tap to delete this habit',
  addHabit: 'Double tap to create a new habit',
  viewInsights: 'Double tap to view your weekly insights and statistics',
};
