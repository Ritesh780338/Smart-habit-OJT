@echo off
REM Smart Habit Coach - Organized Git Commits (Windows)
REM This script creates multiple commits for better project history

echo 🚀 Starting organized commits for Smart Habit Coach...
echo.

REM Initialize git if needed
if not exist .git (
    echo 📦 Initializing git repository...
    git init
    git branch -M main
)

REM Commit 1: Project Setup
echo 📝 Commit 1: Project setup and dependencies
git add package.json package-lock.json babel.config.js app.json .gitignore
git commit -m "chore: Initial project setup with Expo and dependencies" -m "- React Native 0.74.5" -m "- Expo SDK 51" -m "- React Navigation 6" -m "- AsyncStorage for local storage" -m "- Formik + Yup for form validation" -m "- Victory Native for charts" -m "- Expo Notifications for reminders"

REM Commit 2: App Entry Point
echo 📝 Commit 2: App entry point and navigation
git add App.js
git commit -m "feat: Setup app entry point with navigation" -m "- Configure React Navigation stack" -m "- Setup screen routing (Home, Add, Edit, Insights, Settings)" -m "- Initialize notifications and analytics on app start" -m "- Configure header styling"

REM Commit 3: Storage Utilities
echo 📝 Commit 3: Storage utilities
git add src/utils/storage.js
git commit -m "feat: Implement local storage with AsyncStorage" -m "- CRUD operations for habits" -m "- Entry logging system" -m "- Habit and entry data persistence" -m "- Integration with notifications on save/update/delete" -m "- Analytics event tracking on all operations"

REM Commit 4: Streak Calculator
echo 📝 Commit 4: Streak calculation logic
git add src/utils/streakCalculator.js
git commit -m "feat: Add streak calculation algorithms" -m "- Calculate current streak based on consecutive days" -m "- Track longest streak" -m "- Calculate weekly completion rate" -m "- Check if habit completed today" -m "- Support different frequency types (daily, weekly, custom)"

REM Commit 5: Notifications System
echo 📝 Commit 5: Notifications system
git add src/utils/notifications.js
git commit -m "feat: Implement push notification system" -m "- Request notification permissions" -m "- Schedule daily habit reminders" -m "- Configure Android notification channels" -m "- Cancel notifications on habit deletion" -m "- Update notifications on habit edit" -m "- Get all scheduled notifications"

REM Commit 6: Analytics System
echo 📝 Commit 6: Analytics tracking
git add src/utils/analytics.js
git commit -m "feat: Add offline-first analytics tracking" -m "- Event tracking system (habit created, completed, edited, deleted)" -m "- Offline queue with sync mechanism" -m "- Track streak milestones (7, 30, 100, 365 days)" -m "- Analytics enable/disable toggle" -m "- Analytics summary and statistics" -m "- Privacy-focused implementation"

REM Commit 7: Accessibility Utilities
echo 📝 Commit 7: Accessibility features
git add src/utils/accessibility.js
git commit -m "feat: Implement accessibility utilities" -m "- Screen reader detection (TalkBack/VoiceOver)" -m "- Accessibility announcements" -m "- WCAG AA compliance guidelines" -m "- Color contrast validation" -m "- Semantic labels and hints" -m "- Touch target size validation (44pt minimum)"

REM Commit 8: Home Screen
echo 📝 Commit 8: Home screen with attractive UI
git add src/screens/HomeScreen.js
git commit -m "feat: Create attractive home screen with habit list" -m "- Display all habits with completion status" -m "- Header stats dashboard (today's progress, total streaks)" -m "- Dynamic streak badges with color coding" -m "- Complete/Edit/Delete actions" -m "- Pull-to-refresh functionality" -m "- Empty state with call-to-action" -m "- Modern card-based design with shadows" -m "- Completed habit visual feedback"

REM Commit 9: Add Habit Screen
echo 📝 Commit 9: Add habit screen
git add src/screens/AddHabitScreen.js
git commit -m "feat: Add habit creation screen" -m "- Form with title, description, frequency, reminder time" -m "- Form validation with Formik + Yup" -m "- Frequency selection (daily, weekly, custom)" -m "- Reminder time input" -m "- Scrollable form with keyboard handling" -m "- Success feedback on creation"

REM Commit 10: Edit Habit Screen
echo 📝 Commit 10: Edit habit screen
git add src/screens/EditHabitScreen.js
git commit -m "feat: Add habit editing screen" -m "- Pre-filled form with existing habit data" -m "- Update habit details" -m "- Change reminder time" -m "- Form validation" -m "- Scrollable form with keyboard handling" -m "- Success feedback on update"

REM Commit 11: Insights Screen
echo 📝 Commit 11: Weekly insights screen
git add src/screens/InsightsScreen.js
git commit -m "feat: Create weekly insights screen with charts" -m "- Summary statistics (total habits, completions, average streak)" -m "- Bar chart showing last 7 days activity" -m "- Line chart showing completion trends" -m "- Top 5 performing habits ranking" -m "- Motivational insight cards" -m "- Victory Native charts integration" -m "- Analytics tracking for insights views"

REM Commit 12: Settings Screen
echo 📝 Commit 12: Settings screen
git add src/screens/SettingsScreen.js
git commit -m "feat: Add settings and preferences screen" -m "- View scheduled notifications count" -m "- Toggle analytics tracking on/off" -m "- Analytics summary display" -m "- Screen reader status detection" -m "- Accessibility features list" -m "- App version and information" -m "- Privacy policy access" -m "- Support contact information"

REM Commit 13: Documentation - README
echo 📝 Commit 13: Main documentation
git add README.md
git commit -m "docs: Add comprehensive README" -m "- Project overview and features" -m "- Installation instructions" -m "- Getting started guide" -m "- Project structure" -m "- Configuration details" -m "- Testing checklist" -m "- Privacy policy summary" -m "- Contributing guidelines" -m "- Roadmap and future enhancements"

REM Commit 14: Documentation - Setup Guide
echo 📝 Commit 14: Setup guide
git add SETUP.md
git commit -m "docs: Add quick setup guide" -m "- 5-minute quick start" -m "- Prerequisites" -m "- Installation steps" -m "- Running on device/emulator" -m "- Testing features" -m "- Common issues and solutions" -m "- Development tips"

REM Commit 15: Documentation - Build Guide
echo 📝 Commit 15: Build guide
git add BUILD_GUIDE.md
git commit -m "docs: Add production build guide" -m "- EAS Build setup" -m "- Android APK/AAB build instructions" -m "- iOS IPA build instructions" -m "- Store submission guidelines" -m "- Troubleshooting build issues" -m "- Version management" -m "- CI/CD setup with GitHub Actions"

REM Commit 16: Documentation - Privacy Policy
echo 📝 Commit 16: Privacy policy
git add PRIVACY_POLICY.md
git commit -m "docs: Add privacy policy" -m "- Data collection details" -m "- Local storage explanation" -m "- Analytics opt-out information" -m "- User rights and controls" -m "- Third-party services disclosure" -m "- Contact information"

REM Commit 17: Documentation - QA Test Report
echo 📝 Commit 17: QA test report template
git add QA_TEST_REPORT.md
git commit -m "docs: Add QA test report template" -m "- Comprehensive test cases for all features" -m "- Core functionality tests" -m "- Notification testing checklist" -m "- Analytics testing scenarios" -m "- Accessibility testing guide" -m "- Device testing matrix" -m "- Sign-off template"

REM Commit 18: Documentation - Store Listing
echo 📝 Commit 18: Store listing assets
git add STORE_LISTING.md
git commit -m "docs: Add app store listing template" -m "- App name and descriptions" -m "- Keywords for ASO" -m "- Screenshot guidelines" -m "- Feature graphic specifications" -m "- Promotional text" -m "- What's new template" -m "- Category and rating information"

REM Commit 19: Documentation - Changelog
echo 📝 Commit 19: Changelog
git add CHANGELOG.md
git commit -m "docs: Add changelog" -m "- Version 1.0.0 release notes" -m "- Complete feature list" -m "- Known issues" -m "- Future enhancements roadmap" -m "- Version history"

REM Commit 20: Documentation - Feature Checklist
echo 📝 Commit 20: Feature checklist
git add FEATURE_CHECKLIST.md
git commit -m "docs: Add feature completion checklist" -m "- Week 1-2 core features status" -m "- Week 3 notifications and analytics status" -m "- Week 4 accessibility and polish status" -m "- Success metrics tracking" -m "- Production readiness checklist"

REM Commit 21: Documentation - Quick Reference
echo 📝 Commit 21: Quick reference
git add QUICK_REFERENCE.md
git commit -m "docs: Add quick reference card" -m "- Getting started in 30 seconds" -m "- Project structure overview" -m "- Core features summary" -m "- Key commands" -m "- Analytics events list" -m "- Common issues and fixes" -m "- Testing checklist"

REM Commit 22: Documentation - Week 3-4 Summary
echo 📝 Commit 22: Implementation summary
git add WEEK_3_4_SUMMARY.md
git commit -m "docs: Add Week 3-4 implementation summary" -m "- Notifications system overview" -m "- Analytics implementation details" -m "- Accessibility features summary" -m "- Settings screen documentation" -m "- Files created/modified list" -m "- Testing instructions" -m "- Success metrics achieved"

REM Commit 23: Documentation - GitHub Guide
echo 📝 Commit 23: GitHub upload guide
git add GITHUB_UPLOAD_GUIDE.md
git commit -m "docs: Add GitHub upload guide" -m "- Step-by-step upload instructions" -m "- Git commands reference" -m "- Personal access token setup" -m "- Repository configuration" -m "- Common issues and solutions" -m "- Future update workflow"

REM Commit 24: Git Scripts
echo 📝 Commit 24: Git commit scripts
git add git-commits.sh git-commits.bat
git commit -m "chore: Add git commit automation scripts" -m "- Bash script for Linux/Mac" -m "- Batch script for Windows" -m "- Organized commit history" -m "- Descriptive commit messages"

REM Final commit: Any remaining files
echo 📝 Final commit: Remaining files
git add .
git commit -m "chore: Add remaining configuration files" -m "- Additional documentation" -m "- Configuration files" -m "- Project metadata" 2>nul || echo No remaining files to commit

echo.
echo ✅ All commits created successfully!
echo.
echo 📊 Commit Summary:
git log --oneline --graph --all -20
echo.
echo 🎯 Next Steps:
echo 1. Create a GitHub repository at: https://github.com/new
echo 2. Run: git remote add origin https://github.com/YOUR_USERNAME/smart-habit-coach.git
echo 3. Run: git push -u origin main
echo.
echo 🚀 Happy coding!
pause
