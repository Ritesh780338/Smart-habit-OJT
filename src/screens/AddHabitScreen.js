import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { saveHabit } from '../utils/storage';

const HabitSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be less than 50 characters')
    .required('Title is required'),
  description: Yup.string()
    .max(200, 'Description must be less than 200 characters'),
  frequency: Yup.string().required('Frequency is required'),
  reminderTime: Yup.string(),
});

export default function AddHabitScreen({ navigation }) {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await saveHabit(values);
      resetForm();
      Alert.alert('Success', 'Habit created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create habit');
      setSubmitting(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
    >
      <Formik
        initialValues={{
          title: '',
          description: '',
          frequency: 'daily',
          reminderTime: '',
        }}
        validationSchema={HabitSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Habit Title *</Text>
              <TextInput
                style={[styles.input, touched.title && errors.title && styles.inputError]}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                placeholder="e.g., Morning Exercise"
                accessibilityLabel="Habit title input"
              />
              {touched.title && errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                placeholder="Optional description"
                multiline
                numberOfLines={3}
                accessibilityLabel="Habit description input"
              />
              {touched.description && errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Frequency *</Text>
              <View style={styles.frequencyButtons}>
                {['daily', 'weekly', 'custom'].map((freq) => (
                  <TouchableOpacity
                    key={freq}
                    style={[
                      styles.frequencyButton,
                      values.frequency === freq && styles.frequencyButtonActive
                    ]}
                    onPress={() => setFieldValue('frequency', freq)}
                    accessibilityLabel={`Set frequency to ${freq}`}
                  >
                    <Text style={[
                      styles.frequencyButtonText,
                      values.frequency === freq && styles.frequencyButtonTextActive
                    ]}>
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reminder Time (Optional)</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('reminderTime')}
                onBlur={handleBlur('reminderTime')}
                value={values.reminderTime}
                placeholder="e.g., 08:00 AM"
                accessibilityLabel="Reminder time input"
              />
              <Text style={styles.helperText}>Format: HH:MM AM/PM</Text>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              accessibilityLabel="Create habit button"
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Creating...' : 'Create Habit'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },
  frequencyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  frequencyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  frequencyButtonActive: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  frequencyButtonTextActive: {
    color: '#6366f1',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
