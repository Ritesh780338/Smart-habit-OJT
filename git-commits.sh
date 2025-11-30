#!/bin/bash

# Smart Habit Coach - Organized Git Commits
# This script creates multiple commits for better project history

echo "🚀 Starting organized commits for Smart Habit Coach..."

# Initialize git if needed
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
fi

# Commit 1: Project Setup
echo "📝 Commit 1: Project setup and dependencies"
git add package.json package-lock.json babel.config.js app.json .gitignore
git commit -m "chore: Initial project setup with Expo and dependencies

- React Native 0.74.5
- Expo SDK 51
- React Navigation 6
- AsyncStorage for local storage
- Formik + Yup for form validation
- Victory Native for charts
- Expo Notifications for reminders"

# Commit 2: App Entry Point
echo "📝 Commit 2: App entry point and navigation"
git add App.js
git commit -m "feat: Setup app entry point with navigation

- Configure React Navigation stack
- Setup screen routing (Home, Add, Edit, Insights, Settings)
- Initialize notifications and analytics on app start
- Configure header styling"

# Commit 3: Storage Utilities
echo "📝 Commit 3: Storage utilities"
git add src/utils/storage.js
git commit -m "feat: Implement local storage with AsyncStorage

- CRUD operations for habits
- Entry logging system
- Habit and entry data persistence
- Integration with notifications on save/update/delete
- Analytics event tracking on all operations"

# Commit 4: Streak Calculator
echo "📝 Commit 4: Streak calculation logic"
git add src/utils/streakCalculator.js
git commit -m "feat: Add streak calculation algorithms

- Calculate current streak based on consecutive days
- Track longest streak
- Calculate weekly completion rate
- Check if habit completed today
- Support different frequency types (daily, weekly, custom)"

# Commit 5: Notifications System
echo "📝 Commit 5: Notifications system"
git add src/utils/notifications.js
git commit -m "feat: Implement push notification system

- Request notification permissions
- Schedule daily habit reminders
- Configure Android notification channels
- Cancel notifications on habit deletion
- Update notifications on habit edit
- Get all scheduled notifications"

# Commit 6: Analytics System
echo "📝 Commit 6: Analytics tracking"
git add src/utils/analytics.js
git commit -m "feat: Add offline-first analytics tracking

- Event tracking system (habit created, completed, edited, deleted)
- Offline queue with sync mechanism
- Track streak milestones (7, 30, 100, 365 days)
- Analytics enable/disable toggle
- Analytics summary and statistics
- Privacy-focused implementation"

# Commit 7: Accessibility Utilities
echo "📝 Commit 7: Accessibility features"
git add src/utils/accessibility.js
git commit -m "feat: Implement accessibility utilities

- Screen reader detection (TalkBack/VoiceOver)
- Accessibility announcements
- WCAG AA compliance guidelines
- Color contrast validation
- Semantic labels and hints
- Touch target size validation (44pt minimum)"

# Commit 8: Home Screen
echo "📝 Commit 8: Home screen with attractive UI"
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

# Commit 9: Add Habit Screen
echo "📝 Commit 9: Add habit screen"
git add src/screens/AddHabitScreen.js
git commit -m "feat: Add habit creation screen

- Form with title, description, frequency, reminder time
- Form validation with Formik + Yup
- Frequency selection (daily, weekly, custom)
- Reminder time input
- Scrollable form with keyboard handling
- Success feedback on creation"

# Commit 10: Edit Habit Screen
echo "📝 Commit 10: Edit habit screen"
git add src/screens/EditHabitScreen.js
git commit -m "feat: Add habit editing screen

- Pre-filled form with existing habit data
- Update habit details
- Change reminder time
- Form validation
- Scrollable form with keyboard handling
- Success feedback on update"

# Commit 11: Insights Screen
echo "📝 Commit 11: Weekly insights screen"
git add src/screens/InsightsScreen.js
git commit -m "feat: Create weekly insights screen with charts

- Summary statistics (total habits, completions, average streak)
- Bar chart showing last 7 days activity
- Line chart showing completion trends
- Top 5 performing habits ranking
- Motivational insight cards
- Victory Native charts integration
- Analytics tracking for insights views"

# Commit 12: Settings Screen
echo "📝 Commit 12: Settings screen"
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

# Commit 13: Documentation - README
echo "📝 Commit 13: Main documentation"
git add README.md
git commit -m "docs: Add comprehensive README

- Project overview and features
- Installation instructions
- Getting started guide
- Project structure
- Configuration details
- Testing checklist
- Privacy policy summary
- Contributing guidelines
- Roadmap and future enhancements"

# Commit 14: Documentation - Setup Guide
echo "📝 Commit 14: Setup guide"
git add SETUP.md
git commit -m "docs: Add quick setup guide

- 5-minute quick start
- Prerequisites
- Installation steps
- Running on device/emulator
- Testing features
- Common issues and solutions
- Development tips"

# Commit 15: Documentation - Build Guide
echo "📝 Commit 15: Build guide"
git add BUILD_GUIDE.md
git commit -m "docs: Add production build guide

- EAS Build setup
- Android APK/AAB build instructions
- iOS IPA build instructions
- Store submission guidelines
- Troubleshooting build issues
- Version management
- CI/CD setup with GitHub Actions"

# Commit 16: Documentation - Privacy Policy
echo "📝 Commit 16: Privacy policy"
git add PRIVACY_POLICY.md
git commit -m "docs: Add privacy policy

- Data collection details
- Local storage explanation
- Analytics opt-out information
- User rights and controls
- Third-party services disclosure
- Contact information"

# Commit 17: Documentation - QA Test Report
echo "📝 Commit 17: QA test report template"
git add QA_TEST_REPORT.md
git commit -m "docs: Add QA test report template

- Comprehensive test cases for all features
- Core functionality tests
- Notification testing checklist
- Analytics testing scenarios
- Accessibility testing guide
- Device testing matrix
- Sign-off template"

# Commit 18: Documentation - Store Listing
echo "📝 Commit 18: Store listing assets"
git add STORE_LISTING.md
git commit -m "docs: Add app store listing template

- App name and descriptions
- Keywords for ASO
- Screenshot guidelines
- Feature graphic specifications
- Promotional text
- What's new template
- Category and rating information"

# Commit 19: Documentation - Changelog
echo "📝 Commit 19: Changelog"
git add CHANGELOG.md
git commit -m "docs: Add changelog

- Version 1.0.0 release notes
- Complete feature list
- Known issues
- Future enhancements roadmap
- Version history"

# Commit 20: Documentation - Feature Checklist
echo "📝 Commit 20: Feature checklist"
git add FEATURE_CHECKLIST.md
git commit -m "docs: Add feature completion checklist

- Week 1-2 core features status
- Week 3 notifications and analytics status
- Week 4 accessibility and polish status
- Success metrics tracking
- Production readiness checklist"

# Commit 21: Documentation - Quick Reference
echo "📝 Commit 21: Quick reference"
git add QUICK_REFERENCE.md
git commit -m "docs: Add quick reference card

- Getting started in 30 seconds
- Project structure overview
- Core features summary
- Key commands
- Analytics events list
- Common issues and fixes
- Testing checklist"

# Commit 22: Documentation - Week 3-4 Summary
echo "📝 Commit 22: Implementation summary"
git add WEEK_3_4_SUMMARY.md
git commit -m "docs: Add Week 3-4 implementation summary

- Notifications system overview
- Analytics implementation details
- Accessibility features summary
- Settings screen documentation
- Files created/modified list
- Testing instructions
- Success metrics achieved"

# Commit 23: Documentation - GitHub Guide
echo "📝 Commit 23: GitHub upload guide"
git add GITHUB_UPLOAD_GUIDE.md
git commit -m "docs: Add GitHub upload guide

- Step-by-step upload instructions
- Git commands reference
- Personal access token setup
- Repository configuration
- Common issues and solutions
- Future update workflow"

# Commit 24: Assets (if any)
if [ -d assets ]; then
    echo "📝 Commit 24: App assets"
    git add assets/
    git commit -m "assets: Add app icons and splash screens

- App icon (1024x1024)
- Adaptive icon for Android
- Splash screen
- Favicon for web"
fi

# Final commit: Any remaining files
echo "📝 Final commit: Remaining files"
git add .
git commit -m "chore: Add remaining configuration files

- Git commit script
- Additional documentation
- Configuration files
- Project metadata" || echo "No remaining files to commit"

echo ""
echo "✅ All commits created successfully!"
echo ""
echo "📊 Commit Summary:"
git log --oneline --graph --all -20
echo ""
echo "🎯 Next Steps:"
echo "1. Create a GitHub repository at: https://github.com/new"
echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/smart-habit-coach.git"
echo "3. Run: git push -u origin main"
echo ""
echo "🚀 Happy coding!"
