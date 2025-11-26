## Smart Habit Coach – Data Layer

This folder structure and code define the **schema, models, and database setup** for the _Smart Habit Coach: Streaks, Reminders & Insight Cards_ project.

The focus is on:

- **SQLite schema** for: `habits`, `entries`, `reminders`, `analytics_queue`
- **TypeScript domain models** for clean usage in React Native screens
- **Expandable folder structure** suitable for a full Expo app later

### Tech Stack (Data Layer)

- `expo-sqlite` – local SQLite database
- `@react-native-async-storage/async-storage` – optional key–value storage
- TypeScript models (`src/models`)

### Structure

- `src/models` – domain types/interfaces (Habit, Entry, Reminder, AnalyticsEvent)
- `src/db/schema.ts` – raw SQL schema definitions
- `src/db/database.ts` – database initialization and helper

You can plug this data layer into a full Expo project by importing the db helper from `src/db/database.ts` and using the models from `src/models`.


