import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { getAnalyticsSummary, isAnalyticsEnabled, setAnalyticsEnabled } from '../utils/analytics';
import { getScheduledNotifications } from '../utils/notifications';
import { isScreenReaderEnabled } from '../utils/accessibility';

export default function SettingsScreen() {
  const [analyticsEnabled, setAnalyticsEnabledState] = useState(true);
  const [analyticsSummary, setAnalyticsSummary] = useState(null);
  const [scheduledNotifications, setScheduledNotifications] = useState([]);
  const [screenReaderActive, setScreenReaderActive] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const enabled = await isAnalyticsEnabled();
      setAnalyticsEnabledState(enabled);

      const summary = await getAnalyticsSummary();
      setAnalyticsSummary(summary);

      const notifications = await getScheduledNotifications();
      setScheduledNotifications(notifications);

      const srEnabled = await isScreenReaderEnabled();
      setScreenReaderActive(srEnabled);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const toggleAnalytics = async (value) => {
    try {
      await setAnalyticsEnabled(value);
      setAnalyticsEnabledState(value);
      Alert.alert(
        'Analytics Updated',
        value ? 'Analytics tracking enabled' : 'Analytics tracking disabled'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update analytics setting');
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.content}>
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Scheduled Reminders</Text>
            <Text style={styles.infoValue}>{scheduledNotifications.length}</Text>
            <Text style={styles.infoSubtext}>
              Active habit reminders
            </Text>
          </View>
        </View>

        {/* Analytics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analytics & Privacy</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Enable Analytics</Text>
              <Text style={styles.settingDescription}>
                Track app usage to improve your experience
              </Text>
            </View>
            <Switch
              value={analyticsEnabled}
              onValueChange={toggleAnalytics}
              trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
              thumbColor={analyticsEnabled ? '#6366f1' : '#f3f4f6'}
            />
          </View>

          {analyticsSummary && (
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Analytics Summary</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{analyticsSummary.totalEvents}</Text>
                  <Text style={styles.statLabel}>Total Events</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{analyticsSummary.syncedEvents}</Text>
                  <Text style={styles.statLabel}>Synced</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{analyticsSummary.unsyncedEvents}</Text>
                  <Text style={styles.statLabel}>Pending</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Accessibility Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Screen Reader</Text>
            <Text style={styles.infoValue}>
              {screenReaderActive ? '✓ Active' : '✗ Inactive'}
            </Text>
            <Text style={styles.infoSubtext}>
              {screenReaderActive 
                ? 'TalkBack/VoiceOver is enabled'
                : 'Enable in device settings for better accessibility'}
            </Text>
          </View>

          <View style={styles.accessibilityInfo}>
            <Text style={styles.accessibilityTitle}>Accessibility Features</Text>
            <Text style={styles.accessibilityText}>✓ Screen reader support</Text>
            <Text style={styles.accessibilityText}>✓ High contrast colors (WCAG AA)</Text>
            <Text style={styles.accessibilityText}>✓ Minimum 44pt touch targets</Text>
            <Text style={styles.accessibilityText}>✓ Semantic labels on all controls</Text>
            <Text style={styles.accessibilityText}>✓ Logical focus order</Text>
          </View>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Smart Habit Coach</Text>
            <Text style={styles.infoValue}>Version 1.0.0</Text>
            <Text style={styles.infoSubtext}>
              Build consistent habits with simple tracking, streak motivation, and weekly insights.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Alert.alert('Privacy Policy', 'Your data is stored locally on your device. We do not collect or share personal information.')}
          >
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Alert.alert('Support', 'For support, please contact: support@smarthabitcoach.app')}
          >
            <Text style={styles.linkText}>Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  infoSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  accessibilityInfo: {
    backgroundColor: '#eef2ff',
    padding: 16,
    borderRadius: 12,
  },
  accessibilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4338ca',
    marginBottom: 12,
  },
  accessibilityText: {
    fontSize: 14,
    color: '#4338ca',
    marginBottom: 6,
  },
  linkButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
    textAlign: 'center',
  },
});
