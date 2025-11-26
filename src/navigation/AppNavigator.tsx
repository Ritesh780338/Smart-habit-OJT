import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { HabitListScreen } from '../screens/HabitListScreen';
import { HabitFormScreen } from '../screens/HabitFormScreen';
import { HabitDetailScreen } from '../screens/HabitDetailScreen';
import { InsightsScreen } from '../screens/InsightsScreen';

export type RootStackParamList = {
  Home: undefined;
  Habits: undefined;
  HabitForm: { habitId?: number } | undefined;
  HabitDetail: { habitId: number };
  Insights: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Smart Habit Coach' }} />
      <Stack.Screen name="Habits" component={HabitListScreen} options={{ title: 'Your Habits' }} />
      <Stack.Screen name="HabitForm" component={HabitFormScreen} options={{ title: 'Habit' }} />
      <Stack.Screen
        name="HabitDetail"
        component={HabitDetailScreen}
        options={{ title: 'Habit Details' }}
      />
      <Stack.Screen name="Insights" component={InsightsScreen} options={{ title: 'Insights' }} />
    </Stack.Navigator>
  );
};


