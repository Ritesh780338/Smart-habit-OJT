import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLine } from 'victory-native';
import { getHabits, getEntries } from '../utils/storage';
import { calculateStreak, calculateLongestStreak, getWeeklyCompletionRate } from '../utils/streakCalculator';

const screenWidth = Dimensions.get('window').width;

export default function InsightsScreen() {
  const [insights, setInsights] = useState({
    totalHabits: 0,
    totalCompletions: 0,
    averageStreak: 0,
    weeklyData: [],
    topHabits: [],
  });

  const loadInsights = async () => {
    try {
      const habits = await getHabits();
      const allEntries = await getEntries();

      // Calculate weekly completion data (last 7 days)
      const weeklyData = getLast7DaysData(allEntries);

      // Calculate top performing habits
      const topHabits = habits.map(habit => {
        const habitEntries = allEntries.filter(e => e.habitId === habit.id);
        return {
          title: habit.title,
          streak: calculateStreak(habitEntries, habit.frequency),
          longestStreak: calculateLongestStreak(habitEntries),
          completionRate: getWeeklyCompletionRate(habitEntries),
          totalCompletions: habitEntries.length,
        };
      }).sort((a, b) => b.streak - a.streak).slice(0, 5);

      // Calculate average streak
      const avgStreak = topHabits.length > 0
        ? Math.round(topHabits.reduce((sum, h) => sum + h.streak, 0) / topHabits.length)
        : 0;

      setInsights({
        totalHabits: habits.length,
        totalCompletions: allEntries.length,
        averageStreak: avgStreak,
        weeklyData,
        topHabits,
      });
    } catch (error) {
      console.error('Error loading insights:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadInsights();
    }, [])
  );

  const getLast7DaysData = (entries) => {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = dayNames[date.getDay()];
      
      const count = entries.filter(e => e.date === dateStr).length;
      
      days.push({
        day: dayName,
        completions: count,
      });
    }
    
    return days;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{insights.totalHabits}</Text>
            <Text style={styles.summaryLabel}>Total Habits</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{insights.totalCompletions}</Text>
            <Text style={styles.summaryLabel}>Completions</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>🔥 {insights.averageStreak}</Text>
            <Text style={styles.summaryLabel}>Avg Streak</Text>
          </View>
        </View>

        {/* Weekly Completion Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Activity</Text>
          <Text style={styles.chartSubtitle}>Completions per day (last 7 days)</Text>
          
          {insights.weeklyData.length > 0 ? (
            <VictoryChart
              theme={VictoryTheme.material}
              width={screenWidth - 64}
              height={250}
              domainPadding={{ x: 20 }}
            >
              <VictoryAxis
                style={{
                  tickLabels: { fontSize: 12, fill: '#6b7280' }
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  tickLabels: { fontSize: 12, fill: '#6b7280' }
                }}
              />
              <VictoryBar
                data={insights.weeklyData}
                x="day"
                y="completions"
                style={{
                  data: { fill: '#6366f1' }
                }}
                cornerRadius={{ top: 5 }}
              />
            </VictoryChart>
          ) : (
            <Text style={styles.noDataText}>No data available yet</Text>
          )}
        </View>

        {/* Trend Line Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Completion Trend</Text>
          <Text style={styles.chartSubtitle}>Your progress over the week</Text>
          
          {insights.weeklyData.length > 0 ? (
            <VictoryChart
              theme={VictoryTheme.material}
              width={screenWidth - 64}
              height={200}
            >
              <VictoryAxis
                style={{
                  tickLabels: { fontSize: 12, fill: '#6b7280' }
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  tickLabels: { fontSize: 12, fill: '#6b7280' }
                }}
              />
              <VictoryLine
                data={insights.weeklyData}
                x="day"
                y="completions"
                style={{
                  data: { stroke: '#10b981', strokeWidth: 3 }
                }}
              />
            </VictoryChart>
          ) : (
            <Text style={styles.noDataText}>No data available yet</Text>
          )}
        </View>

        {/* Top Habits */}
        <View style={styles.topHabitsCard}>
          <Text style={styles.chartTitle}>Top Performing Habits</Text>
          
          {insights.topHabits.length > 0 ? (
            insights.topHabits.map((habit, index) => (
              <View key={index} style={styles.habitRow}>
                <View style={styles.habitRank}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                <View style={styles.habitInfo}>
                  <Text style={styles.habitName}>{habit.title}</Text>
                  <View style={styles.habitStats}>
                    <Text style={styles.statText}>🔥 {habit.streak} day streak</Text>
                    <Text style={styles.statText}>📊 {habit.completionRate}% this week</Text>
                    <Text style={styles.statText}>✓ {habit.totalCompletions} total</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>Start tracking habits to see insights!</Text>
          )}
        </View>

        {/* Insight Cards */}
        <View style={styles.insightCardsContainer}>
          <View style={styles.insightCard}>
            <Text style={styles.insightEmoji}>💪</Text>
            <Text style={styles.insightTitle}>Keep Going!</Text>
            <Text style={styles.insightText}>
              You've completed {insights.totalCompletions} habits. Every completion builds discipline!
            </Text>
          </View>

          {insights.averageStreak >= 3 && (
            <View style={styles.insightCard}>
              <Text style={styles.insightEmoji}>🔥</Text>
              <Text style={styles.insightTitle}>On Fire!</Text>
              <Text style={styles.insightText}>
                Your average streak is {insights.averageStreak} days. You're building strong habits!
              </Text>
            </View>
          )}

          {insights.totalHabits >= 3 && (
            <View style={styles.insightCard}>
              <Text style={styles.insightEmoji}>🎯</Text>
              <Text style={styles.insightTitle}>Habit Master</Text>
              <Text style={styles.insightText}>
                You're tracking {insights.totalHabits} habits. Great commitment to self-improvement!
              </Text>
            </View>
          )}
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
  content: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  noDataText: {
    textAlign: 'center',
    color: '#9ca3af',
    padding: 40,
    fontSize: 14,
  },
  topHabitsCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  habitRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  habitStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
  },
  insightCardsContainer: {
    gap: 12,
  },
  insightCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  insightEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
