# React-Native demo application. Provides integration examples with connatix-player-sdk-react-native

Run the following commands in the terminal in order to install dependencies:
```
yarn
cd ios
pod install
```

In order to run the application on Android, run the following command in the terminal:
```
npx react-native run-android
```

In order to run the application on iOS, run the following command in the terminal:
```
npx react-native run-ios
```

Bare in mind that running the application on devices instead of simulators/emulators may require additional code signing that you need to do on your end. Due to an issue on the current demo app version of React-Native (0.71.3), the player will render only when running the build on a physical iOS device.