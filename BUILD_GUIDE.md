# Build Guide - Smart Habit Coach

This guide will help you build production-ready APK (Android) and IPA (iOS) files for Smart Habit Coach.

## Prerequisites

- Node.js v14+ installed
- Expo CLI installed: `npm install -g expo-cli`
- EAS CLI installed: `npm install -g eas-cli`
- Expo account (free): https://expo.dev/signup
- Apple Developer account (for iOS, $99/year)

## Setup

### 1. Install Dependencies

```bash
cd smart-habit-coach
npm install
```

### 2. Login to Expo

```bash
eas login
```

Enter your Expo credentials.

### 3. Configure EAS Build

```bash
eas build:configure
```

This creates `eas.json` with build profiles.

## Building for Android

### Development Build (APK)

For testing on physical devices:

```bash
eas build --platform android --profile preview
```

This creates an APK file you can install directly.

### Production Build (AAB)

For Google Play Store submission:

```bash
eas build --platform android --profile production
```

This creates an Android App Bundle (AAB) file.

### Download the Build

After build completes:
1. Visit the provided URL
2. Download the APK/AAB file
3. For APK: Transfer to device and install
4. For AAB: Upload to Google Play Console

## Building for iOS

### Development Build (IPA)

For testing on physical devices:

```bash
eas build --platform ios --profile preview
```

### Production Build (IPA)

For App Store submission:

```bash
eas build --platform ios --profile production
```

### Requirements

- Apple Developer account
- App Store Connect access
- Provisioning profiles and certificates (EAS handles this)

### Download the Build

After build completes:
1. Visit the provided URL
2. Download the IPA file
3. Install via TestFlight or Xcode
4. Or upload to App Store Connect

## Build Profiles (eas.json)

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "simulator": false
      }
    }
  }
}
```

## Testing the Build

### Android APK

1. Enable "Install from Unknown Sources" on your device
2. Transfer APK to device
3. Open and install
4. Test all features

### iOS IPA

1. Upload to TestFlight
2. Invite testers
3. Install via TestFlight app
4. Test all features

## Store Submission

### Google Play Store

1. Create app in Google Play Console
2. Upload AAB file
3. Fill out store listing:
   - Title: Smart Habit Coach
   - Short description: Build consistent habits with simple tracking
   - Full description: See STORE_LISTING.md
   - Screenshots: Prepare 2-8 screenshots
   - Feature graphic: 1024x500px
   - App icon: 512x512px
4. Set content rating
5. Set pricing (Free)
6. Submit for review

### Apple App Store

1. Create app in App Store Connect
2. Upload IPA via Xcode or Transporter
3. Fill out app information:
   - Name: Smart Habit Coach
   - Subtitle: Build Better Habits Daily
   - Description: See STORE_LISTING.md
   - Screenshots: Prepare for all device sizes
   - App icon: 1024x1024px
4. Set age rating
5. Set pricing (Free)
6. Submit for review

## Troubleshooting

### Build Fails

**Error: Missing credentials**
```bash
eas credentials
```
Follow prompts to configure credentials.

**Error: Invalid bundle identifier**
- Check `app.json` for correct bundle ID
- Ensure it matches Apple Developer account

**Error: Out of memory**
- Use `--clear-cache` flag
- Increase Node memory: `export NODE_OPTIONS=--max_old_space_size=4096`

### Installation Issues

**Android: App not installed**
- Uninstall previous version
- Check device storage
- Enable unknown sources

**iOS: Unable to install**
- Check provisioning profile
- Verify device UDID is registered
- Use TestFlight for easier distribution

## Build Optimization

### Reduce Bundle Size

1. Remove unused dependencies:
```bash
npm prune
```

2. Enable Hermes (Android):
```json
// app.json
"android": {
  "jsEngine": "hermes"
}
```

3. Optimize images:
- Use WebP format
- Compress assets
- Remove unused assets

### Performance

1. Enable production mode
2. Minify JavaScript
3. Optimize images
4. Use ProGuard (Android)

## Continuous Integration

### GitHub Actions

Create `.github/workflows/build.yml`:

```yaml
name: EAS Build
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 16
      - run: npm install
      - run: npm install -g eas-cli
      - run: eas build --platform android --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

## Version Management

### Update Version

1. Update `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",
    "android": {
      "versionCode": 2
    },
    "ios": {
      "buildNumber": "1.0.1"
    }
  }
}
```

2. Update `package.json`:
```json
{
  "version": "1.0.1"
}
```

3. Commit changes
4. Tag release: `git tag v1.0.1`
5. Build new version

## Release Checklist

- [ ] Update version numbers
- [ ] Test all features
- [ ] Run QA test report
- [ ] Update changelog
- [ ] Prepare store assets
- [ ] Build production version
- [ ] Test production build
- [ ] Submit to stores
- [ ] Monitor crash reports
- [ ] Respond to reviews

## Support

**EAS Build Docs**: https://docs.expo.dev/build/introduction/  
**Expo Forums**: https://forums.expo.dev/  
**GitHub Issues**: [Open an issue](https://github.com/yourusername/smart-habit-coach/issues)

---

**Good luck with your build! 🚀**
