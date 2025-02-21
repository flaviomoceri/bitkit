# Development

This document describes how to setup your environment to build Bitkit for development and to run automated tests. If you just want to build it from source for normal usage, see [BUILD.md](./BUILD.md).

## Requirements

Make sure you have [setup your environment for React Native](https://reactnative.dev/docs/environment-setup).

## Installation

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

4. Start the project

On iOS Simulator/Device:

```shell
yarn ios
```

On Android Emulator/Device:

```shell
yarn android
```

## Testing

Bitkit uses two types of testing: unit and end-to-end (E2E) tests.

Before running tests, you need to install [Docker](https://docs.docker.com/get-docker/) and run bitcoind and the electrum server in regtest mode. You can do this by using the `docker-compose.yml` file from the **docker** directory:

```shell
cd docker
docker compose up
```

After that, you are ready to run the tests:

### 1. Unit tests

```shell
yarn test
```

### 2. End-to-end (E2E) tests

End-to-end tests are powered by [Detox](https://github.com/wix/Detox). Currently, only the iOS Simulator is supported.

To build the tests:

```shell
yarn e2e:build:ios-release
```

To run them:

```shell
yarn e2e:test:ios-release
```

## Troubleshooting

When running into issues there are a couple things to check.

- Clean caches & build folders: `yarn clean`
- Clean simulator cache (iOS): `xcrun simctl erase all`
- Increase emulated device storage (Android): `Android Studio -> Virtual Device Manager -> Edit Device -> Show Advanced Settings -> increase RAM, VM heap and Internal Storage sizes`
