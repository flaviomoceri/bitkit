import { Platform } from 'react-native';
import { getBundleId } from 'react-native-device-info';

export const appName = 'Bitkit';
const appleAppId = '6443905609';
const androidPackageName = getBundleId();

const appStoreUrl =
	Platform.OS === 'ios'
		? `https://apps.apple.com/us/app/bitkit/id${appleAppId}`
		: `https://play.google.com/store/apps/details?id=${androidPackageName}`;

export const shareText = `Download Bitkit, Your Ultimate Bitcoin Toolkit. Handing you the keys to reshape your digital life. ${appStoreUrl}`;
