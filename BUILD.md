# Building Bitkit from source

These instructions are for building Bitkit from source to get a production version of the app. If you are looking for the latest release, you can download it from the [App Store](https://apps.apple.com/app/bitkit-wallet/id6502440655) or [Google Play](https://play.google.com/store/apps/details?id=to.bitkit) or get the latest APK from the [releases page](https://github.com/synonymdev/bitkit/releases).

## Requirements

Make sure you have [setup your environment for React Native](https://reactnative.dev/docs/environment-setup).

> [!NOTE]  
> Not all of the steps outlined in the above link may be required for building the app. You can skip the ones not relevant to you.

## Setup

1. Clone the repository

```shell
git clone git@github.com:synonymdev/bitkit.git && cd bitkit
```

2. Switch Node version

Switch to the Node.js version defined in `.node-version`. You can visit [.node-version File Usage](https://github.com/shadowspawn/node-version-usage) and use one of these methods to change the node version you need.

3. Install dependencies

```shell
yarn install
```

4. Set environment variables

```shell
cp .env.production.template .env.production
```

## Build

### iOS

Follow instructions from the [React Native docs](https://reactnative.dev/docs/publishing-to-app-store) for iOS.

### Android

Follow instructions from the [React Native docs](https://reactnative.dev/docs/signed-apk-android) for Android. After that you can find the `.aab` under `android/app/build/outputs/bundle/release/app-release.aab` which can be installed on your device.
