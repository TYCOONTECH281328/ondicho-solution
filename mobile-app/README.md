# ONDICHO SOLUTION Mobile App

📱 React Native mobile application for ONDICHO SOLUTION - Data, Minutes, and SMS reseller platform.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Setup

1. Navigate to the mobile app directory:
```bash
cd mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Running on Devices

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

## Features

✨ **Home Tab**
- M-Pesa payment information
- Why choose us section
- Contact information

📊 **Offers Tab**
- Browse Data bundles
- Browse Call Minutes
- Browse SMS packages
- Select offers easily

🛒 **Order Tab**
- Enter customer details
- Select desired offer
- WhatsApp integration
- One-click ordering

## Building for Production

### iOS Build
```bash
eas build --platform ios
```

### Android Build
```bash
eas build --platform android
```

## Configuration

Edit the following in `App.js` to customize:
- M-Pesa Till Number: `MPESA_TILL`
- WhatsApp Number: `WHATSAPP_NUMBER`
- Offers and pricing
- Company contact information

## Support

📞 Phone: 0790329385
💬 WhatsApp: +254714104723

## License

MIT License - Open Source
