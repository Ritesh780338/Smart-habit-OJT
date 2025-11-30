import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Request permissions
export const requestNotificationPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('habit-reminders', {
        name: 'Habit Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#6366f1',
      });
    }

    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

// Schedule a daily reminder for a habit
export const scheduleHabitReminder = async (habitId, habitTitle, reminderTime) => {
  try {
    if (!reminderTime) return null;

    // Parse time (format: "HH:MM")
    const [hours, minutes] = reminderTime.split(':').map(Number);
    
    const trigger = {
      hour: hours,
      minute: minutes,
      repeats: true,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Habit Reminder',
        body: `Time to complete: ${habitTitle}`,
        data: { habitId },
        sound: true,
      },
      trigger,
    });

    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};

// Cancel a specific notification
export const cancelNotification = async (notificationId) => {
  try {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    }
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};

// Cancel all notifications for a habit
export const cancelHabitNotifications = async (habitId) => {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const habitNotifications = scheduled.filter(
      n => n.content.data?.habitId === habitId
    );
    
    for (const notification of habitNotifications) {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  } catch (error) {
    console.error('Error canceling habit notifications:', error);
  }
};

// Get all scheduled notifications
export const getScheduledNotifications = async () => {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
};
