# GitHub Upload Guide - Smart Habit Coach

## Quick Upload Steps

### Option 1: New Repository (Recommended)

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit your changes
git commit -m "Initial commit: Smart Habit Coach v1.0.0 - Complete habit tracking app with notifications, analytics, and accessibility"

# 4. Create a new repository on GitHub
# Go to: https://github.com/new
# Repository name: smart-habit-coach
# Description: Build consistent habits with simple tracking, streaks, and insights
# Make it Public or Private
# DO NOT initialize with README (we already have one)

# 5. Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/smart-habit-coach.git

# 6. Push to GitHub
git branch -M main
git push -u origin main
```

### Option 2: Existing Repository

```bash
# 1. Add all files
git add .

# 2. Commit changes
git commit -m "Update: Week 3-4 features - Notifications, Analytics, Accessibility, and UI improvements"

# 3. Push to GitHub
git push origin main
```

---

## Detailed Step-by-Step Instructions

### Step 1: Check Git Status

```bash
# Check if git is initialized
git status
```

If you see "fatal: not a git repository", run:
```bash
git init
```

### Step 2: Configure Git (First Time Only)

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"
```

### Step 3: Create .gitignore (Already exists, but verify)

Make sure `.gitignore` includes:
```
node_modules/
.expo/
.expo-shared/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
dist/
```

### Step 4: Stage All Files

```bash
# Add all files to staging
git add .

# Check what will be committed
git status
```

### Step 5: Commit Your Changes

```bash
# Commit with descriptive message
git commit -m "Initial commit: Smart Habit Coach v1.0.0

Features:
- Habit CRUD operations
- Streak tracking and calculation
- Weekly insights with charts
- Push notifications and reminders
- Analytics tracking (offline-first)
- Accessibility (WCAG AA compliant)
- Settings screen
- Attractive UI with modern design
- Complete documentation"
```

### Step 6: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **+** icon (top right) → **New repository**
3. Fill in details:
   - **Repository name**: `smart-habit-coach`
   - **Description**: `Build consistent habits with simple tracking, streak motivation, and weekly insights. React Native + Expo app with offline-first architecture.`
   - **Visibility**: Public (recommended) or Private
   - **DO NOT** check "Initialize with README" (we have one)
   - **DO NOT** add .gitignore or license (we have them)
4. Click **Create repository**

### Step 7: Connect to GitHub

```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/smart-habit-coach.git

# Verify remote
git remote -v
```

### Step 8: Push to GitHub

```bash
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

If prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (not your password)

### Step 9: Create Personal Access Token (If Needed)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token (classic)**
3. Give it a name: "Smart Habit Coach Upload"
4. Select scopes: `repo` (full control)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## Verify Upload

After pushing, visit:
```
https://github.com/YOUR_USERNAME/smart-habit-coach
```

You should see:
- ✅ All your files
- ✅ README.md displayed
- ✅ Commit history
- ✅ File structure

---

## Add Repository Topics (Recommended)

On your GitHub repository page:
1. Click **⚙️ Settings** (or the gear icon near About)
2. Add topics:
   - `react-native`
   - `expo`
   - `habit-tracker`
   - `mobile-app`
   - `productivity`
   - `react-navigation`
   - `asyncstorage`
   - `notifications`
   - `analytics`
   - `accessibility`

---

## Update Repository Description

Add this to your GitHub repository description:

```
🎯 Smart Habit Coach - Build consistent habits with simple tracking, streak motivation, and weekly insights. 
Features: Offline-first, Push notifications, Analytics, Accessibility (WCAG AA), Beautiful UI. 
Built with React Native + Expo.
```

---

## Add GitHub Repository Badges (Optional)

Add these to the top of your README.md:

```markdown
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.74.5-61dafb)
![Expo](https://img.shields.io/badge/Expo-51.0.0-000020)
![License](https://img.shields.io/badge/license-MIT-green)
```

---

## Future Updates

When you make changes:

```bash
# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "Update: Description of changes"

# 4. Push to GitHub
git push origin main
```

---

## Common Issues & Solutions

### Issue: "fatal: not a git repository"
**Solution**: Run `git init`

### Issue: "remote origin already exists"
**Solution**: 
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/smart-habit-coach.git
```

### Issue: "failed to push some refs"
**Solution**:
```bash
git pull origin main --rebase
git push origin main
```

### Issue: Authentication failed
**Solution**: Use Personal Access Token instead of password

### Issue: Large files warning
**Solution**: Make sure `node_modules/` is in `.gitignore`

---

## Clone Your Repository (On Another Machine)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/smart-habit-coach.git

# Navigate to directory
cd smart-habit-coach

# Install dependencies
npm install

# Start the app
npm start
```

---

## Repository Structure on GitHub

```
smart-habit-coach/
├── .expo/
├── src/
│   ├── screens/
│   └── utils/
├── App.js
├── app.json
├── package.json
├── README.md
├── BUILD_GUIDE.md
├── SETUP.md
├── PRIVACY_POLICY.md
├── CHANGELOG.md
├── QA_TEST_REPORT.md
├── STORE_LISTING.md
├── FEATURE_CHECKLIST.md
├── QUICK_REFERENCE.md
└── .gitignore
```

---

## Enable GitHub Pages (Optional)

If you want to showcase your project:

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Save

Your project will be available at:
```
https://YOUR_USERNAME.github.io/smart-habit-coach
```

---

## Add Collaborators (Optional)

1. Go to repository Settings → Collaborators
2. Click **Add people**
3. Enter GitHub username or email
4. Select permission level
5. Send invitation

---

## Protect Main Branch (Recommended)

1. Go to Settings → Branches
2. Add branch protection rule
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
5. Save changes

---

## Next Steps After Upload

1. ✅ Verify all files are uploaded
2. ✅ Check README displays correctly
3. ✅ Add repository topics
4. ✅ Update description
5. ✅ Star your own repository ⭐
6. ✅ Share with others!

---

## Share Your Project

Share your repository:
- Twitter: "Just built a habit tracking app with React Native! 🎯"
- LinkedIn: Post about your project
- Reddit: r/reactnative, r/expo
- Dev.to: Write a blog post

---

**Congratulations! Your Smart Habit Coach app is now on GitHub! 🎉**

Repository URL: `https://github.com/YOUR_USERNAME/smart-habit-coach`
