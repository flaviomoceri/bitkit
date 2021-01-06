import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform, NativeModules } from 'react-native';
import resources from './locales';

const getDeviceLanguage = (): string => {
	let language = '';
	if (Platform.OS === 'ios') {
		language =
			NativeModules.SettingsManager.settings.AppleLocale ||
			NativeModules.SettingsManager.settings.AppleLanguages[0];
	} else {
		language = NativeModules.I18nManager.localeIdentifier;
	}

	// Android returns specific locales that iOS does not i.e. en_US, en_GB.
	// If we want to support very specific locales we'll need to add a way to map them here.
	if (language.indexOf('_')) {
		language = language.split('_')[0];
	}

	return language;
};

i18n
	.use(initReactI18next)
	.init({
		lng: getDeviceLanguage(),
		fallbackLng: 'en',
		resources,
		ns: Object.keys(resources),
		defaultNS: 'common',
		debug: __DEV__,
		cache: {
			enabled: true,
		},
		interpolation: {
			escapeValue: false,
		},
	})
	.then();

export default i18n;
