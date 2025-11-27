# Smart Habit Coach: Streaks, Reminders & Insight Cards

A React Native mobile application to help users build consistent habits through simple tracking, streak motivation, and weekly insights.

**Student:** Ritesh Sharma  
**Roll No:** 240410700085  
**Year & Section:** 3 Sem

## 🎯 Project Overview

Smart Habit Coach helps users build discipline and routines through:
- ✅ Simple habit tracking with CRUD operations
- 🔥 Streak calculation and motivation
- 📊 Weekly insights with charts
- 💾 Offline-first with local storage
- ♿ Accessibility features

## 📱 Features Implemented (Week 1 & 2)

### Week 1: Project Setup & Basic CRUD
- [x] Project initialization with Expo
- [x] React Navigation setup
- [x] AsyncStorage integration for offline storage
- [x] Habit CRUD operations (Create, Read, Update, Delete)
- [x] Form validation using Formik + Yup
- [x] Basic UI with proper styling

### Week 2: Streak Logic & Charts
- [x] Streak calculation algorithm
- [x] Track habit completions
- [x] Weekly insights screen
- [x] Victory Charts integration (Bar & Line charts)
- [x] Completion rate calculation
- [x] Top performing habits display
- [x] Insight cards with motivational messages

## 🛠️ Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** React Navigation (Stack Navigator)
- **Storage:** AsyncStorage (offline-first)
- **Forms:** Formik + Yup validation
- **Charts:** Victory Native
- **Notifications:** Expo Notifications (Week 3)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical device)

### Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm start
```

3. **Run on device:**
- Scan the QR code with Expo Go app (Android/iOS)
- Or press `a` for Android emulator
- Or press `i` for iOS simulator

## 📂 Project Structure

```
smart-habit-coach/
├── App.js                      # Main app entry with navigation
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js       # Main dashboard with habit list
│   │   ├── AddHabitScreen.js   # Create new habit
│   │   ├── EditHabitScreen.js  # Edit existing habit
│   │   └── InsightsScreen.js   # Weekly insights & charts
│   └── utils/
│       ├── storage.js          # AsyncStorage CRUD operations
│       └── streakCalculator.js # Streak logic & calculations
└── README.md
```

## 🎨 Screens

### 1. Home Screen
- Display all habits with current streaks
- Complete habit button (disabled if already done today)
- Edit and delete options
- Navigation to insights and add habit

### 2. Add/Edit Habit Screen
- Form with validation
- Fields: Title, Description, Frequency, Reminder Time
- Real-time error messages
- Frequency selection (Daily/Weekly/Custom)

### 3. Insights Screen
- Summary cards (Total Habits, Completions, Average Streak)
- Weekly activity bar chart
- Completion trend line chart
- Top performing habits list
- Motivational insight cards

## 🔥 Streak Algorithm

The streak calculation follows these rules:
- Counts consecutive days of habit completion
- Allows 1-day grace period (completed today or yesterday)
- Resets to 0 if more than 1 day missed
- Tracks longest streak separately
- Calculates weekly completion rate (last 7 days)

## ♿ Accessibility Features

- Proper accessibility labels on all interactive elements
- High contrast colors (WCAG AA compliant)
- Logical focus order
- Descriptive button labels
- Screen reader support

## 📊 Data Storage

All data is stored locally using AsyncStorage:
- **Habits:** `@habits` key
- **Entries:** `@entries` key

Data structure:
```javascript
// Habit
{
  id: "timestamp",
  title: "Morning Exercise",
  description: "30 min workout",
  frequency: "daily",
  reminderTime: "08:00 AM",
  createdAt: "ISO date"
}

// Entry
{
  id: "timestamp",
  habitId: "habit_id",
  completedAt: "ISO datetime",
  date: "YYYY-MM-DD"
}
```

## 🚀 Upcoming Features (Week 3 & 4)

- [ ] Push notifications for reminders
- [ ] Background notification service
- [ ] Analytics integration (Firebase)
- [ ] Crash logging (Sentry)
- [ ] Enhanced accessibility audit
- [ ] Store listing assets
- [ ] Privacy policy
- [ ] APK/IPA build

## 🧪 Testing

Manual testing checklist:
- ✅ Create habit with validation
- ✅ Edit habit details
- ✅ Delete habit with confirmation
- ✅ Complete habit (once per day)
- ✅ Streak calculation accuracy
- ✅ Charts display correctly
- ✅ Offline functionality
- ✅ App state persistence

## 📝 License

This project is created for educational purposes as part of OJT Project.

## 👨‍💻 Developer

**Ritesh Sharma**  
Roll No: 240410700085  
Year: 3 Sem

---

**Status:** Week 1 & 2 Completed ✅
