import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddHabitScreen from './src/screens/AddHabitScreen';
import EditHabitScreen from './src/screens/EditHabitScreen';
import InsightsScreen from './src/screens/InsightsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#6366f1' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Smart Habit Coach' }}
        />
        <Stack.Screen 
          name="AddHabit" 
          component={AddHabitScreen}
          options={{ title: 'Add New Habit' }}
        />
        <Stack.Screen 
          name="EditHabit" 
          component={EditHabitScreen}
          options={{ title: 'Edit Habit' }}
        />
        <Stack.Screen 
          name="Insights" 
          component={InsightsScreen}
          options={{ title: 'Weekly Insights' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
