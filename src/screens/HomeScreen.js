import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Animated,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getHabits, deleteHabit, saveEntry, getEntriesForHabit } from '../utils/storage';
import { calculateStreak, isCompletedToday } from '../utils/streakCalculator';

export default function HomeScreen({ navigation }) {
  const [habits, setHabits] = useState([]);
  const [habitStats, setHabitStats] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const loadHabits = async () => {
    try {
      const loadedHabits = await getHabits();
      setHabits(loadedHabits);
      
      // Load stats for each habit
      const stats = {};
      for (const habit of loadedHabits) {
        const entries = await getEntriesForHabit(habit.id);
        stats[habit.id] = {
          streak: calculateStreak(entries, habit.frequency),
          completedToday: isCompletedToday(entries),
          entries,
        };
      }
      setHabitStats(stats);
    } catch (error) {
      Alert.alert('Error', 'Failed to load habits');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHabits();
    setRefreshing(false);
  };

  const handleCompleteHabit = async (habitId) => {
    try {
      const stats = habitStats[habitId];
      if (stats?.completedToday) {
        Alert.alert('Already Done', 'You have already completed this habit today!');
        return;
      }

      await saveEntry(habitId);
      await loadHabits();
      Alert.alert('Success', '🎉 Habit completed! Keep up the streak!');
    } catch (error) {
      Alert.alert('Error', 'Failed to complete habit');
    }
  };

  const handleDeleteHabit = async (habitId, habitTitle) => {
    // For web compatibility, use window.confirm
    if (typeof window !== 'undefined' && window.confirm) {
      const confirmed = window.confirm(`Are you sure you want to delete "${habitTitle}"?`);
      if (confirmed) {
        try {
          console.log('Deleting habit:', habitId);
          await deleteHabit(habitId);
          await loadHabits();
          alert('Habit deleted successfully!');
        } catch (error) {
          console.error('Delete error:', error);
          alert('Failed to delete habit: ' + error.message);
        }
      }
    } else {
      // For mobile, use Alert.alert
      Alert.alert(
        'Delete Habit',
        `Are you sure you want to delete "${habitTitle}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                console.log('Deleting habit:', habitId);
                await deleteHabit(habitId);
                await loadHabits();
                Alert.alert('Success', 'Habit deleted successfully!');
              } catch (error) {
                console.error('Delete error:', error);
                Alert.alert('Error', 'Failed to delete habit: ' + error.message);
              }
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const getStreakColor = (streak) => {
    if (streak >= 30) return '#f59e0b'; // Gold
    if (streak >= 7) return '#ef4444'; // Red
    return '#6366f1'; // Blue
  };

  const getStreakEmoji = (streak) => {
    if (streak >= 100) return '💎';
    if (streak >= 30) return '🏆';
    if (streak >= 7) return '🔥';
    return '⭐';
  };

  const renderHabitItem = ({ item, index }) => {
    const stats = habitStats[item.id] || { streak: 0, completedToday: false };
    const streakColor = getStreakColor(stats.streak);
    const streakEmoji = getStreakEmoji(stats.streak);
    
    return (
      <View 
        style={[
          styles.habitCard,
          stats.completedToday && styles.habitCardCompleted
        ]} 
        accessibilityLabel={`Habit: ${item.title}`}
      >
        {/* Streak Badge - Top Right Corner */}
        {stats.streak > 0 && (
          <View style={[styles.streakCornerBadge, { backgroundColor: streakColor }]}>
            <Text style={styles.streakCornerText}>{streakEmoji}</Text>
            <Text style={styles.streakCornerNumber}>{stats.streak}</Text>
          </View>
        )}

        {/* Habit Content */}
        <View style={styles.habitContent}>
          <View style={styles.habitMainInfo}>
            <View style={styles.habitIconContainer}>
              <Text style={styles.habitIcon}>
                {stats.completedToday ? '✅' : '⚪'}
              </Text>
            </View>
            
            <View style={styles.habitTextContainer}>
              <Text style={styles.habitTitle}>{item.title}</Text>
              {item.description && (
                <Text style={styles.habitDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              )}
              
              <View style={styles.habitMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>📅</Text>
                  <Text style={styles.metaText}>{item.frequency}</Text>
                </View>
                {item.reminderTime && (
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>⏰</Text>
                    <Text style={styles.metaText}>{item.reminderTime}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                stats.completedToday && styles.primaryButtonCompleted
              ]}
              onPress={() => handleCompleteHabit(item.id)}
              disabled={stats.completedToday}
              accessibilityLabel={stats.completedToday ? 'Completed today' : 'Mark as complete'}
            >
              <Text style={styles.primaryButtonText}>
                {stats.completedToday ? '✓ Completed' : '✓ Complete'}
              </Text>
            </TouchableOpacity>

            <View style={styles.secondaryButtons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('EditHabit', { habit: item })}
                accessibilityLabel="Edit habit"
              >
                <Text style={styles.iconButtonText}>✏️</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDeleteHabit(item.id, item.title)}
                accessibilityLabel="Delete habit"
              >
                <Text style={styles.iconButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Calculate summary stats
  const totalHabits = habits.length;
  const completedToday = Object.values(habitStats).filter(s => s.completedToday).length;
  const totalStreak = Object.values(habitStats).reduce((sum, s) => sum + s.streak, 0);

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      {totalHabits > 0 && (
        <View style={styles.headerStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{completedToday}/{totalHabits}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>🔥 {totalStreak}</Text>
            <Text style={styles.statLabel}>Total Streaks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{Math.round((completedToday / totalHabits) * 100)}%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
        </View>
      )}

      <FlatList
        data={habits}
        renderItem={renderHabitItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        style={styles.flatList}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎯</Text>
            <Text style={styles.emptyText}>Start Your Journey!</Text>
            <Text style={styles.emptySubtext}>
              Create your first habit and begin building a better you
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('AddHabit')}
            >
              <Text style={styles.emptyButtonText}>+ Create First Habit</Text>
            </TouchableOpacity>
          </View>
        }
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#6366f1']}
            tintColor="#6366f1"
          />
        }
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel="Open settings"
          accessibilityHint="Double tap to view app settings and preferences"
        >
          <Text style={styles.smallButtonText}>⚙️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.insightsButton}
          onPress={() => navigation.navigate('Insights')}
          accessibilityLabel="View weekly insights"
          accessibilityHint="Double tap to view your weekly statistics and progress"
        >
          <Text style={styles.insightsButtonText}>📊 Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddHabit')}
          accessibilityLabel="Add new habit"
          accessibilityHint="Double tap to create a new habit"
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerStats: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 8,
    gap: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  flatList: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  habitCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  habitCardCompleted: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  streakCornerBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomLeftRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    zIndex: 10,
  },
  streakCornerText: {
    fontSize: 16,
  },
  streakCornerNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  habitContent: {
    padding: 16,
  },
  habitMainInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  habitIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  habitIcon: {
    fontSize: 24,
  },
  habitTextContainer: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  habitDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    lineHeight: 20,
  },
  habitMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metaIcon: {
    fontSize: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonCompleted: {
    backgroundColor: '#64748b',
    shadowColor: '#64748b',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconButtonText: {
    fontSize: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 100,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  smallButton: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
    minHeight: 56,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  smallButtonText: {
    fontSize: 24,
  },
  insightsButton: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  insightsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
