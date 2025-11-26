import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import type { Habit } from '../models';
import { HabitRepository } from '../repositories/HabitRepository';

type Props = NativeStackScreenProps<RootStackParamList, 'Habits'>;

export const HabitListScreen: React.FC<Props> = ({ navigation }) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const loadHabits = async () => {
    const data = await HabitRepository.getAll();
    setHabits(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadHabits);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Your Habits</Text>
        <Button title="Add" onPress={() => navigation.navigate('HabitForm')} />
      </View>
      {habits.length === 0 ? (
        <Text style={styles.emptyText}>No habits yet. Tap "Add" to create one.</Text>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('HabitDetail', { habitId: item.id })}
            >
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.frequency.toUpperCase()}</Text>
            </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyText: {
    marginTop: 24,
    textAlign: 'center',
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});


