# Quick Setup Guide

Get Smart Habit Coach running in 5 minutes!

## Prerequisites

- Node.js v14+ ([Download](https://nodejs.org/))
- npm or yarn
- Git

## Installation

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/smart-habit-coach.git
cd smart-habit-coach

# Install dependencies
npm install

# Install Expo CLI globally (if not already installed)
npm install -g expo-cli
```

### 2. Start Development Server

```bash
npm start
```

This opens Expo DevTools in your browser.

### 3. Run on Device/Emulator

#### Option A: Physical Device (Recommended)

**iOS**:
1. Install "Expo Go" from App Store
2. Scan QR code from terminal with Camera app
3. App opens in Expo Go

**Android**:
1. Install "Expo Go" from Play Store
2. Scan QR code from terminal with Expo Go app
3. App opens in Expo Go

#### Option B: Emulator

**iOS Simulator** (Mac only):
```bash
npm run ios
```

**Android Emulator**:
```bash
npm run android
```

#### Option C: Web Browser

```bash
npm run web
```

Note: Some features (notifications) won't work on web.

## Project Structure

```
smart-habit-coach/
├── App.js                    # Root component
├── app.json                  # Expo configuration
├── package.json              # Dependencies
│
├── src/
│   ├── screens/              # App screens
│   │   ├── HomeScreen.js
│   │   ├── AddHabitScreen.js
│   │   ├── EditHabitScreen.js
│   │   ├── InsightsScreen.js
│   │   └── SettingsScreen.js
│   │
│   └── utils/                # Utilities
│       ├── storage.js        # AsyncStorage operations
│       ├── streakCalculator.js
│       ├── notifications.js  # Push notifications
│       ├── analytics.js      # Event tracking
│       └── accessibility.js  # A11y helpers
│
└── assets/                   # Images and icons
```

## Testing Features

### 1. Create a Habit
- Tap "+ Add" button
- Fill in habit details
- Set a reminder time
- Save

### 2. Complete a Habit
- Tap "Complete" button on any habit
- Watch streak increment
- See success message

### 3. View Insights
- Tap "📊 Insights" button
- See charts and statistics
- View top performing habits

### 4. Test Notifications
- Create habit with reminder time
- Wait for scheduled time
- Or change device time to test

### 5. Check Settings
- Tap "⚙️" button
- View analytics summary
- Toggle analytics on/off
- See accessibility info

## Common Issues

### Issue: Metro bundler won't start
**Solution**:
```bash
# Clear cache and restart
npm start -- --clear
```

### Issue: "Unable to resolve module"
**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: Notifications not working
**Solution**:
- Check device notification permissions
- Ensure app has notification permission
- Test on physical device (not simulator)

### Issue: Charts not displaying
**Solution**:
```bash
# Reinstall victory-native
npm install victory-native react-native-svg
```

## Development Tips

### Hot Reload
- Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
- Enable "Fast Refresh" in dev menu

### Debug Menu
- **iOS**: `Cmd+D` in simulator
- **Android**: `Cmd+M` in emulator
- **Physical**: Shake device

### View Logs
```bash
# All logs
npm start

# iOS only
npm run ios -- --verbose

# Android only
npm run android -- --verbose
```

### Clear Data
To reset all habits and data:
1. Uninstall app
2. Reinstall
Or use device settings to clear app data

## Next Steps

1. ✅ Run the app
2. ✅ Create your first habit
3. ✅ Complete it daily
4. ✅ Build a streak!
5. 📖 Read [BUILD_GUIDE.md](BUILD_GUIDE.md) for production builds
6. 📋 Use [QA_TEST_REPORT.md](QA_TEST_REPORT.md) for testing

## Need Help?

- 📖 [Full README](README.md)
- 🔨 [Build Guide](BUILD_GUIDE.md)
- 🐛 [Report Issues](https://github.com/yourusername/smart-habit-coach/issues)
- 💬 [Expo Forums](https://forums.expo.dev/)

## Quick Commands

```bash
# Start dev server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web

# Clear cache
npm start -- --clear

# Build for production
eas build --platform android
eas build --platform ios
```

---

**Happy habit building! 🎯**
