@echo off
REM ONDICHO SOLUTION - APK Build Script for Windows
REM This script automates the APK building process

echo.
echo ========================================
echo   ONDICHO SOLUTION - APK Builder
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo X Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo X npm is not installed!
    pause
    exit /b 1
)

echo [OK] npm found: 
npm --version
echo.

echo Installing dependencies...
call npm install

echo.
echo Checking Expo login...

eas whoami >nul 2>&1
if errorlevel 1 (
    echo You need to login to Expo first!
    echo Run: eas login
    pause
    exit /b 1
)

echo [OK] Logged in to Expo
echo.

echo Building APK for Android...
echo Please select 'apk' when prompted for build type
echo.

call eas build --platform android

echo.
echo [OK] APK Build Complete!
echo Your APK is being built. Check the URL provided above to download it.
echo.
echo To install on your phone:
echo 1. Download the APK file
echo 2. Transfer to your Android phone
echo 3. Open file manager and tap the APK
echo 4. Follow installation prompts
echo.
pause
