import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
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

  const renderHabitItem = ({ item }) => {
    const stats = habitStats[item.id] || { streak: 0, completedToday: false };
    
    return (
      <View style={styles.habitCard} accessibilityLabel={`Habit: ${item.title}`}>
        <View style={styles.habitHeader}>
          <Text style={styles.habitTitle}>{item.title}</Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {stats.streak}</Text>
          </View>
        </View>
        
        {item.description && (
          <Text style={styles.habitDescription}>{item.description}</Text>
        )}
        
        <View style={styles.habitMeta}>
          <Text style={styles.metaText}>📅 {item.frequency}</Text>
          {item.reminderTime && (
            <Text style={styles.metaText}>⏰ {item.reminderTime}</Text>
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.completeButton,
              stats.completedToday && styles.completedButton
            ]}
            onPress={() => handleCompleteHabit(item.id)}
            disabled={stats.completedToday}
            accessibilityLabel={stats.completedToday ? 'Completed today' : 'Mark as complete'}
          >
            <Text style={styles.buttonText}>
              {stats.completedToday ? '✓ Done Today' : 'Complete'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditHabit', { habit: item })}
            accessibilityLabel="Edit habit"
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteHabit(item.id, item.title)}
            accessibilityLabel="Delete habit"
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.emptyText}>No habits yet!</Text>
            <Text style={styles.emptySubtext}>Tap the + button to create your first habit</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.insightsButton}
          onPress={() => navigation.navigate('Insights')}
          accessibilityLabel="View weekly insights"
        >
          <Text style={styles.insightsButtonText}>📊 Weekly Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddHabit')}
          accessibilityLabel="Add new habit"
        >
          <Text style={styles.addButtonText}>+ Add Habit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flatList: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 180,
  },
  habitCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  streakBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400e',
  },
  habitDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  habitMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  completeButton: {
    flex: 2,
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#6b7280',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9ca3af',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#d1d5db',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  insightsButton: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
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
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
