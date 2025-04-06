# E-Waste Management Mobile App

A React Native mobile application for managing e-waste recycling and disposal. The app allows users to sell or donate their e-waste, schedule pickups, find collection centers, track their items, and earn rewards.

## Features

- Welcome & Onboarding Screens
- User Authentication (Email, Google Sign-In)
- Home Dashboard with Quick Actions
- Sell/Donate E-Waste with AI Valuation
- Schedule Pickup with Real-time Tracking
- Find Collection Centers with Maps Integration
- Track Item Status
- Rewards & Loyalty Program
- User Profile Management

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd e-waste-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your device:
- Scan the QR code with the Expo Go app (Android/iOS)
- Press 'a' to run on Android emulator
- Press 'i' to run on iOS simulator (macOS only)

## Configuration

1. Create a Firebase project and add your configuration in `src/config/firebase.js`
2. Set up Google Sign-In credentials
3. Configure Google Maps API key for collection centers map

## Project Structure

```
e-waste-app/
├── src/
│   ├── assets/          # Images and icons
│   ├── components/      # Reusable components
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # App screens
│   ├── services/        # API and service functions
│   ├── utils/           # Utility functions
│   └── constants/       # App constants
├── App.js              # Main app component
└── package.json        # Dependencies and scripts
```

## Dependencies

- React Native
- Expo
- React Navigation
- Firebase
- Google Sign-In
- React Native Maps
- Expo Image Picker
- Expo Location
- Expo Notifications
- Styled Components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@ewasteapp.com or create an issue in the repository. 