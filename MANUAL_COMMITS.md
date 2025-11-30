# Manual Git Commits Guide

If you prefer to run commands manually, copy and paste these one by one:

## Initialize Git (if needed)

```bash
git init
git branch -M main
```

---

## Commit 1: Project Setup

```bash
git add package.json package-lock.json babel.config.js app.json .gitignore
git commit -m "chore: Initial project setup with Expo and dependencies

- React Native 0.74.5
- Expo SDK 51
- React Navigation 6
- AsyncStorage for local storage
- Formik + Yup for form validation
- Victory Native for charts
- Expo Notifications for reminders"
```

---

## Commit 2: App Entry Point

```bash
git add App.js
git commit -m "feat: Setup app entry point with navigation

- Configure React Navigation stack
- Setup screen routing (Home, Add, Edit, Insights, Settings)
- Initialize notifications and analytics on app start
- Configure header styling"
```

---

## Commit 3: Storage Utilities

```bash
git add src/utils/storage.js
git commit -m "feat: Implement local storage with AsyncStorage

- CRUD operations for habits
- Entry logging system
- Habit and entry data persistence
- Integration with notifications on save/update/delete
- Analytics event tracking on all operations"
```

---

## Commit 4: Streak Calculator

```bash
git add src/utils/streakCalculator.js
git commit -m "feat: Add streak calculation algorithms

- Calculate current streak based on consecutive days
- Track longest streak
- Calculate weekly completion rate
- Check if habit completed today
- Support different frequency types (daily, weekly, custom)"
```

---

## Commit 5: Notifications System

```bash
git add src/utils/notifications.js
git commit -m "feat: Implement push notification system

- Request notification permissions
- Schedule daily habit reminders
- Configure Android notification channels
- Cancel notifications on habit deletion
- Update notifications on habit edit
- Get all scheduled notifications"
```

---

## Commit 6: Analytics System

```bash
git add src/utils/analytics.js
git commit -m "feat: Add offline-first analytics tracking

- Event tracking system (habit created, completed, edited, deleted)
- Offline queue with sync mechanism
- Track streak milestones (7, 30, 100, 365 days)
- Analytics enable/disable toggle
- Analytics summary and statistics
- Privacy-focused implementation"
```

---

## Commit 7: Accessibility Utilities

```bash
git add src/utils/accessibility.js
git commit -m "feat: Implement accessibility utilities

- Screen reader detection (TalkBack/VoiceOver)
- Accessibility announcements
- WCAG AA compliance guidelines
- Color contrast validation
- Semantic labels and hints
- Touch target size validation (44pt minimum)"
```

---

## Commit 8: Home Screen

```bash
git add src/screens/HomeScreen.js
git commit -m "feat: Create attractive home screen with habit list

- Display all habits with completion status
- Header stats dashboard (today's progress, total streaks)
- Dynamic streak badges with color coding
- Complete/Edit/Delete actions
- Pull-to-refresh functionality
- Empty state with call-to-action
- Modern card-based design with shadows
- Completed habit visual feedback"
```

---

## Commit 9: Add Habit Screen

```bash
git add src/screens/AddHabitScreen.js
git commit -m "feat: Add habit creation screen

- Form with title, description, frequency, reminder time
- Form validation with Formik + Yup
- Frequency selection (daily, weekly, custom)
- Reminder time input
- Scrollable form with keyboard handling
- Success feedback on creation"
```

---

## Commit 10: Edit Habit Screen

```bash
git add src/screens/EditHabitScreen.js
git commit -m "feat: Add habit editing screen

- Pre-filled form with existing habit data
- Update habit details
- Change reminder time
- Form validation
- Scrollable form with keyboard handling
- Success feedback on update"
```

---

## Commit 11: Insights Screen

```bash
git add src/screens/InsightsScreen.js
git commit -m "feat: Create weekly insights screen with charts

- Summary statistics (total habits, completions, average streak)
- Bar chart showing last 7 days activity
- Line chart showing completion trends
- Top 5 performing habits ranking
- Motivational insight cards
- Victory Native charts integration
- Analytics tracking for insights views"
```

---

## Commit 12: Settings Screen

```bash
git add src/screens/SettingsScreen.js
git commit -m "feat: Add settings and preferences screen

- View scheduled notifications count
- Toggle analytics tracking on/off
- Analytics summary display
- Screen reader status detection
- Accessibility features list
- App version and information
- Privacy policy access
- Support contact information"
```

---

## Commit 13-23: Documentation (All at once)

```bash
git add README.md SETUP.md BUILD_GUIDE.md PRIVACY_POLICY.md QA_TEST_REPORT.md STORE_LISTING.md CHANGELOG.md FEATURE_CHECKLIST.md QUICK_REFERENCE.md WEEK_3_4_SUMMARY.md GITHUB_UPLOAD_GUIDE.md
git commit -m "docs: Add comprehensive project documentation

- README with full project overview
- Quick setup guide (SETUP.md)
- Production build guide (BUILD_GUIDE.md)
- Privacy policy
- QA test report template
- App store listing template
- Changelog and version history
- Feature completion checklist
- Quick reference card
- Week 3-4 implementation summary
- GitHub upload guide"
```

---

## Commit 24: Git Scripts

```bash
git add git-commits.sh git-commits.bat MANUAL_COMMITS.md
git commit -m "chore: Add git commit automation scripts

- Bash script for Linux/Mac
- Batch script for Windows
- Manual commands guide
- Organized commit history
- Descriptive commit messages"
```

---

## Final Commit: Remaining Files

```bash
git add .
git commit -m "chore: Add remaining configuration files

- Additional documentation
- Configuration files
- Project metadata"
```

---

## View Commit History

```bash
git log --oneline --graph --all
```

---

## Connect to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/smart-habit-coach.git
git push -u origin main
```

---

## Alternative: Single Commit (Quick Method)

If you want just one commit:

```bash
git add .
git commit -m "feat: Smart Habit Coach v1.0.0 - Complete habit tracking app

Features:
- Habit CRUD operations with local storage
- Streak tracking and calculation
- Weekly insights with Victory charts
- Push notifications and reminders
- Offline-first analytics tracking
- Accessibility (WCAG AA compliant)
- Settings and preferences
- Attractive modern UI design
- Comprehensive documentation

Tech Stack:
- React Native 0.74.5
- Expo SDK 51
- React Navigation 6
- AsyncStorage
- Formik + Yup
- Victory Native
- Expo Notifications"

git remote add origin https://github.com/YOUR_USERNAME/smart-habit-coach.git
git push -u origin main
```

---

## Check Status Anytime

```bash
git status
git log --oneline -10
```
