#!/bin/bash

# ONDICHO SOLUTION - APK Build Script
# This script automates the APK building process

echo "========================================"
echo "  ONDICHO SOLUTION - APK Builder"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Navigate to mobile-app directory
cd "$(dirname "$0")"

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔐 Checking Expo login..."

if ! eas whoami &> /dev/null; then
    echo "⚠️  You need to login to Expo first!"
    echo "Run: eas login"
    exit 1
fi

echo "✅ Logged in to Expo"
echo ""

echo "🏗️  Building APK for Android..."
echo "Please select 'apk' when prompted for build type"
echo ""

eas build --platform android

echo ""
echo "✅ APK Build Complete!"
echo "Your APK is being built. Check the URL provided above to download it."
echo ""
echo "📱 To install on your phone:"
echo "1. Download the APK file"
echo "2. Transfer to your Android phone"
echo "3. Open file manager and tap the APK"
echo "4. Follow installation prompts"
echo ""
