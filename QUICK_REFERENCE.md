# Quick Reference Card

## 🚀 Getting Started (30 seconds)

```bash
npm install
npm start
# Scan QR code with Expo Go app
```

---

## 📁 Project Structure

```
smart-habit-coach/
├── src/
│   ├── screens/          # 5 screens (Home, Add, Edit, Insights, Settings)
│   └── utils/            # 5 utilities (storage, streak, notifications, analytics, a11y)
├── App.js                # Root component
└── app.json              # Expo config
```

---

## 🎯 Core Features

| Feature | Status | File |
|---------|--------|------|
| Habit CRUD | ✅ | `storage.js` |
| Streak Tracking | ✅ | `streakCalculator.js` |
| Notifications | ✅ | `notifications.js` |
| Analytics | ✅ | `analytics.js` |
| Accessibility | ✅ | `accessibility.js` |
| Weekly Insights | ✅ | `InsightsScreen.js` |
| Settings | ✅ | `SettingsScreen.js` |

---

## 📱 Screens

1. **HomeScreen** - Habit list, complete habits, view streaks
2. **AddHabitScreen** - Create new habits with reminders
3. **EditHabitScreen** - Modify existing habits
4. **InsightsScreen** - Charts, stats, top habits
5. **SettingsScreen** - Analytics, notifications, accessibility

---

## 🔧 Key Commands

```bash
# Development
npm start              # Start dev server
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator
npm run web            # Run in browser

# Production
eas build --platform android    # Build APK/AAB
eas build --platform ios        # Build IPA

# Troubleshooting
npm start -- --clear   # Clear cache
rm -rf node_modules && npm install  # Reinstall
```

---

## 📊 Analytics Events

- `habit_created` - New habit
- `habit_completed` - Habit done
- `habit_edited` - Habit updated
- `habit_deleted` - Habit removed
- `streak_milestone` - 7/30/100/365 days
- `insights_viewed` - Insights screen
- `app_opened` - App launch

---

## 🔔 Notifications

**Setup:**
- Permissions requested on app start
- Set reminder time when creating habit
- Notifications fire daily at set time

**Management:**
- View count in Settings
- Auto-cancel on habit delete
- Auto-update on habit edit

---

## ♿ Accessibility

**Features:**
- Screen reader support (TalkBack/VoiceOver)
- WCAG AA color contrast (4.5:1)
- 44pt minimum touch targets
- Semantic labels on all elements
- Logical focus order

**Test:**
- Enable TalkBack/VoiceOver
- Navigate with screen reader
- Check Settings for status

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| README.md | Main overview |
| SETUP.md | Quick start (5 min) |
| BUILD_GUIDE.md | Production builds |
| QA_TEST_REPORT.md | Testing checklist |
| PRIVACY_POLICY.md | Privacy info |
| STORE_LISTING.md | App store assets |
| CHANGELOG.md | Version history |
| FEATURE_CHECKLIST.md | Feature status |
| WEEK_3_4_SUMMARY.md | Implementation summary |

---

## 🐛 Common Issues

**Metro won't start:**
```bash
npm start -- --clear
```

**Module not found:**
```bash
rm -rf node_modules && npm install
```

**Notifications not working:**
- Test on physical device (not simulator)
- Check device notification permissions
- Verify reminder time is set

**Charts not showing:**
```bash
npm install victory-native react-native-svg
```

---

## ✅ Testing Checklist

- [ ] Create a habit
- [ ] Complete a habit (streak increments)
- [ ] Edit a habit
- [ ] Delete a habit
- [ ] View insights (charts display)
- [ ] Check settings (analytics summary)
- [ ] Test notification (set reminder)
- [ ] Test offline (airplane mode)
- [ ] Test accessibility (screen reader)

---

## 📦 Dependencies

**Core:**
- React Native 0.74.5
- Expo SDK 51
- React Navigation 6

**Features:**
- AsyncStorage (storage)
- Expo Notifications (reminders)
- Victory Native (charts)
- Formik + Yup (forms)

---

## 🎯 Success Metrics

- ✅ 100% CRUD functionality
- ✅ Offline-first architecture
- ✅ Notification system
- ✅ Analytics tracking
- ✅ WCAG AA accessibility
- ✅ Production ready

---

## 🚀 Deployment

**Android:**
```bash
eas build --platform android --profile production
# Upload AAB to Google Play Console
```

**iOS:**
```bash
eas build --platform ios --profile production
# Upload IPA to App Store Connect
```

---

## 📞 Support

- 📖 Read documentation files
- 🐛 GitHub Issues
- 💬 Expo Forums
- 📧 support@smarthabitcoach.app

---

## 🎉 Quick Wins

**Day 1:** Install and run app  
**Day 2:** Create your first habit  
**Day 3:** Complete it daily  
**Day 7:** See your first streak milestone!  
**Day 30:** View insights and celebrate progress  

---

**Built with ❤️ using React Native & Expo**

Version 1.0.0 | November 2025
