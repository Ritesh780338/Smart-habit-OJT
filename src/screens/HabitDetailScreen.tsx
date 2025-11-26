import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Habit, Entry } from '../models';
import { HabitRepository } from '../repositories/HabitRepository';
import { EntryRepository } from '../repositories/EntryRepository';
import { calculateCurrentStreak, calculateBestStreak } from '../utils/streaks';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitDetail'>;

export const HabitDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { habitId } = route.params;
  const [habit, setHabit] = useState<Habit | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);

  const loadData = async () => {
    const [h, e] = await Promise.all([
      HabitRepository.getById(habitId),
      EntryRepository.getForHabit(habitId),
    ]);
    setHabit(h);
    setEntries(e);
  };

  useEffect(() => {
    loadData();
  }, [habitId]);

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const todayKey = new Date().toISOString().slice(0, 10);
  const currentStreak = calculateCurrentStreak(entries);
  const bestStreak = calculateBestStreak(entries);

  const handleToggleToday = async () => {
    await EntryRepository.toggleCompletion(habit.id, todayKey);
    await loadData();
  };

  const handleDelete = async () => {
    await HabitRepository.delete(habit.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{habit.title}</Text>
      {habit.description ? <Text style={styles.description}>{habit.description}</Text> : null}

      <View style={styles.streakRow}>
        <Text style={styles.streakText}>Current streak: {currentStreak} 🔥</Text>
        <Text style={styles.streakText}>Best streak: {bestStreak}</Text>
      </View>

      <View style={styles.actionsRow}>
        <Button title="Edit" onPress={() => navigation.navigate('HabitForm', { habitId })} />
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>

      <View style={styles.todayRow}>
        <Text style={styles.sectionTitle}>Today</Text>
        <Button title="Toggle Complete" onPress={handleToggleToday} />
      </View>

      <Text style={styles.sectionTitle}>Recent Completions</Text>
      <FlatList
        data={entries}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.entryItem}>
            <Text>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  todayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  entryItem: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
});


