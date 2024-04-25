import { Platform } from 'react-native';
import { getBundleId } from 'react-native-device-info';

export const appName = 'Bitkit';

// TODO: add correct store IDs and test
// const appleAppID = '1634634088';
const androidPackageName = getBundleId();

// const appStoreUrl =
// 	Platform.OS === 'ios'
// 		? `https://apps.apple.com/us/app/bitkit/id${appleAppID}`
// 		: `https://play.google.com/store/apps/details?id=${androidPackageName}`;

const appStoreUrl =
	Platform.OS === 'ios'
		? 'https://testflight.apple.com/join/lGXhnwcC'
		: `https://play.google.com/store/apps/details?id=${androidPackageName}`;

export const shareText = `Download Bitkit, Your Ultimate Bitcoin Toolkit. Handing you the keys to reshape your digital life. ${appStoreUrl}`;
