import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { EntryRepository } from '../repositories/EntryRepository';
import { HabitRepository } from '../repositories/HabitRepository';
import type { Habit, Entry } from '../models';
import { WeeklyBarChart } from '../components/WeeklyBarChart';

interface WeeklyInsight {
  habit: Habit;
  entries: Entry[];
  weeklyCounts: { day: string; value: number }[];
}

export const InsightsScreen: React.FC = () => {
  const [insights, setInsights] = useState<WeeklyInsight[]>([]);

  const loadInsights = async () => {
    const habits = await HabitRepository.getAll();
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);

    const endKey = end.toISOString().slice(0, 10);
    const startKey = start.toISOString().slice(0, 10);

    const allEntries: { habit: Habit; entries: Entry[] }[] = [];
    for (const habit of habits) {
      const entries = await EntryRepository.getForHabit(habit.id);
      const lastWeekEntries = entries.filter(
        e => e.date >= startKey && e.date <= endKey && e.completed,
      );
      allEntries.push({ habit, entries: lastWeekEntries });
    }

    const result: WeeklyInsight[] = allEntries.map(({ habit, entries }) => {
      const counts: Record<string, number> = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0,
      };

      entries.forEach(e => {
        const dow = new Date(e.date).getDay(); // 0=Sun
        const label = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dow];
        counts[label] += 1;
      });

      const weeklyCounts = Object.keys(counts).map(day => ({
        day,
        value: counts[day],
      }));

      return { habit, entries, weeklyCounts };
    });

    setInsights(result);
  };

  useEffect(() => {
    loadInsights();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Insights</Text>
      {insights.length === 0 ? (
        <Text style={styles.emptyText}>Complete habits this week to see insights here.</Text>
      ) : (
        <FlatList
          data={insights}
          keyExtractor={item => String(item.habit.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.habit.title}</Text>
              <WeeklyBarChart data={item.weeklyCounts} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    marginTop: 24,
    textAlign: 'center',
  },
  card: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});


