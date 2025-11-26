import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Habit Coach</Text>
      <Text style={styles.subtitle}>Build streaks, stay consistent, and get insights.</Text>
      <View style={styles.buttonsRow}>
        <Button title="Your Habits" onPress={() => navigation.navigate('Habits')} />
      </View>
      <View style={styles.buttonsRow}>
        <Button title="Weekly Insights" onPress={() => navigation.navigate('Insights')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonsRow: {
    marginVertical: 8,
    width: '80%',
  },
});


