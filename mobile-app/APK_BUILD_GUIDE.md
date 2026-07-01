# Android APK Build Guide

## Prerequisites

1. **Node.js** (v14 or higher)
2. **npm** or **yarn**
3. **Expo CLI**:
```bash
npm install -g expo-cli eas-cli
```

4. **Expo Account** (Free):
   - Create account at: https://expo.dev
   - Login via CLI: `expo login`

## Build Methods

### Method 1: Using EAS Build (Recommended) ⭐

**Easiest way - No local setup needed!**

1. **Login to Expo:**
```bash
eas login
```

2. **Navigate to app directory:**
```bash
cd mobile-app
```

3. **Build APK:**
```bash
eas build --platform android --local
```

4. **Select build type when prompted:**
   - Choose: `apk` for immediate testing
   - Choose: `aab` for Google Play Store

5. **Download your APK** from the link provided

---

### Method 2: Local Build with Expo

```bash
# 1. Navigate to app
cd mobile-app

# 2. Generate native Android project
npm run eject

# 3. Install Android Studio and Android SDK
# Download from: https://developer.android.com/studio

# 4. Build APK using Gradle
./gradlew assembleRelease

# 5. APK location: android/app/build/outputs/apk/release/
```

---

## Installation on Your Phone

### Option A: Direct APK Installation

**Android 6 and below:**
1. Download APK file to your phone
2. Enable "Unknown Sources" in Settings
3. Tap APK file to install

**Android 7+:**
1. Download APK file
2. Go to Settings → Apps & notifications → Special app access → Install unknown apps
3. Select your file manager
4. Enable "Allow from this source"
5. Tap APK file to install

### Option B: Using ADB (Advanced)

```bash
# Connect phone via USB
# Enable USB Debugging on phone

# Install via ADB
adb install app-release.apk
```

---

## Publishing to Google Play Store

1. **Create Google Play Developer Account:**
   - Visit: https://play.google.com/console
   - Pay $25 one-time fee

2. **Generate Keystore:**
```bash
cd mobile-app/android/app

# Create signing key
keytool -genkey -v -keystore my-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias
```

3. **Build Release AAB:**
```bash
eas build --platform android
# Select 'aab' when prompted
```

4. **Upload to Google Play Console:**
   - Create new app
   - Upload AAB file
   - Fill app details
   - Submit for review

---

## Build Status Monitoring

Check your build status:
```bash
# List all builds
eas build:list

# View specific build
eas build:view <build-id>
```

---

## Troubleshooting

### "Module not found" error
```bash
cd mobile-app
rm -rf node_modules
npm install
```

### Build fails on EAS
```bash
# Clear cache and rebuild
eas build --platform android --clean
```

### Can't login to Expo
```bash
expo logout
expo login
```

### APK too large
- Remove unnecessary dependencies
- Use ProGuard minification (enabled by default)
- Split APK by architecture

---

## APK File Sizes

- **Debug APK**: 80-120 MB
- **Release APK**: 40-60 MB (optimized)
- **AAB**: 35-45 MB (Google Play optimizes per device)

---

## Download Links

📱 **Test APK** (Easy setup):
https://github.com/TYCOONTECH281328/ondicho-solution/releases

🎮 **Google Play Store** (Coming soon):
https://play.google.com/store

---

## Quick Commands

```bash
# Test on Expo Go
npm start

# Build APK
eas build --platform android

# Build for Play Store (AAB)
eas build --platform android

# List builds
eas build:list

# View build details
eas build:view <build-id>
```

---

## Support

📞 Phone: 0790329385
💬 WhatsApp: +254714104723
📧 Email: kevinondicho064@gmail.com

---

**Next Steps:**
1. Create Expo account at https://expo.dev
2. Run `eas build --platform android`
3. Download and install APK on your phone
4. Test the app!
