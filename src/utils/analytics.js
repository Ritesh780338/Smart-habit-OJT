import AsyncStorage from '@react-native-async-storage/async-storage';

const ANALYTICS_QUEUE_KEY = '@analytics_queue';
const ANALYTICS_ENABLED_KEY = '@analytics_enabled';

// Event types
export const AnalyticsEvents = {
  HABIT_CREATED: 'habit_created',
  HABIT_COMPLETED: 'habit_completed',
  HABIT_EDITED: 'habit_edited',
  HABIT_DELETED: 'habit_deleted',
  REMINDER_FIRED: 'reminder_fired',
  STREAK_MILESTONE: 'streak_milestone',
  INSIGHTS_VIEWED: 'insights_viewed',
  APP_OPENED: 'app_opened',
};

// Track an event (offline-first)
export const trackEvent = async (eventName, properties = {}) => {
  try {
    const enabled = await isAnalyticsEnabled();
    if (!enabled) return;

    const event = {
      id: Date.now().toString(),
      name: eventName,
      properties,
      timestamp: new Date().toISOString(),
      synced: false,
    };

    const queue = await getAnalyticsQueue();
    queue.push(event);
    await AsyncStorage.setItem(ANALYTICS_QUEUE_KEY, JSON.stringify(queue));

    // Try to sync if online
    await syncAnalytics();
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Get analytics queue
export const getAnalyticsQueue = async () => {
  try {
    const queue = await AsyncStorage.getItem(ANALYTICS_QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  } catch (error) {
    console.error('Error getting analytics queue:', error);
    return [];
  }
};

// Sync analytics (placeholder for future backend integration)
export const syncAnalytics = async () => {
  try {
    const queue = await getAnalyticsQueue();
    const unsyncedEvents = queue.filter(e => !e.synced);

    if (unsyncedEvents.length === 0) return;

    // TODO: Send to analytics backend (Firebase, Mixpanel, etc.)
    // For now, just mark as synced locally
    console.log('Analytics events to sync:', unsyncedEvents.length);
    
    // Simulate sync
    const syncedQueue = queue.map(e => ({ ...e, synced: true }));
    await AsyncStorage.setItem(ANALYTICS_QUEUE_KEY, JSON.stringify(syncedQueue));
  } catch (error) {
    console.error('Error syncing analytics:', error);
  }
};

// Check if analytics is enabled
export const isAnalyticsEnabled = async () => {
  try {
    const enabled = await AsyncStorage.getItem(ANALYTICS_ENABLED_KEY);
    return enabled !== 'false'; // Default to true
  } catch (error) {
    return true;
  }
};

// Toggle analytics
export const setAnalyticsEnabled = async (enabled) => {
  try {
    await AsyncStorage.setItem(ANALYTICS_ENABLED_KEY, enabled.toString());
  } catch (error) {
    console.error('Error setting analytics enabled:', error);
  }
};

// Get analytics summary
export const getAnalyticsSummary = async () => {
  try {
    const queue = await getAnalyticsQueue();
    const summary = {
      totalEvents: queue.length,
      syncedEvents: queue.filter(e => e.synced).length,
      unsyncedEvents: queue.filter(e => !e.synced).length,
      eventsByType: {},
    };

    queue.forEach(event => {
      summary.eventsByType[event.name] = (summary.eventsByType[event.name] || 0) + 1;
    });

    return summary;
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    return null;
  }
};
