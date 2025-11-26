import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { HabitRepository } from '../repositories/HabitRepository';
import type { HabitFrequency } from '../models';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitForm'>;

const HabitSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too short').required('Required'),
  frequency: Yup.mixed<HabitFrequency>().oneOf(['daily', 'weekly', 'custom']).required('Required'),
});

export const HabitFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const habitId = route.params?.habitId;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    frequency: 'daily' as HabitFrequency,
  });

  useEffect(() => {
    if (!habitId) return;
    setIsEditing(true);
    HabitRepository.getById(habitId).then(habit => {
      if (habit) {
        setInitialValues({
          title: habit.title,
          description: habit.description ?? '',
          frequency: habit.frequency,
        });
      }
    });
  }, [habitId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Edit Habit' : 'New Habit'}</Text>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={HabitSchema}
        onSubmit={async values => {
          if (isEditing && habitId) {
            await HabitRepository.update(habitId, {
              title: values.title,
              description: values.description,
              frequency: values.frequency,
            });
          } else {
            await HabitRepository.create({
              title: values.title,
              description: values.description,
              frequency: values.frequency,
            });
          }
          navigation.goBack();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Drink water"
            />
            {errors.title && touched.title && <Text style={styles.error}>{errors.title}</Text>}

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              placeholder="Optional notes..."
              multiline
            />

            <Text style={styles.label}>Frequency</Text>
            <View style={styles.frequencyRow}>
              <Button
                title="Daily"
                onPress={() => handleChange('frequency')('daily')}
                color={values.frequency === 'daily' ? '#007AFF' : undefined}
              />
              <Button
                title="Weekly"
                onPress={() => handleChange('frequency')('weekly')}
                color={values.frequency === 'weekly' ? '#007AFF' : undefined}
              />
              <Button
                title="Custom"
                onPress={() => handleChange('frequency')('custom')}
                color={values.frequency === 'custom' ? '#007AFF' : undefined}
              />
            </View>
            {errors.frequency && touched.frequency && (
              <Text style={styles.error}>{errors.frequency}</Text>
            )}

            <View style={styles.submitRow}>
              <Button title={isEditing ? 'Save' : 'Create'} onPress={() => handleSubmit()} />
            </View>
          </View>
        )}
      </Formik>
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
  label: {
    fontSize: 14,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  frequencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  submitRow: {
    marginTop: 24,
  },
});


