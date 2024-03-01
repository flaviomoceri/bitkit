import React, { memo, ReactElement, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import { View as ThemedView } from '../../styles/components';
import { EItemType, IListData, ItemData } from '../../components/List';
import SettingsView from './SettingsView';
import GlowImage from '../../components/GlowImage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateSettings } from '../../store/slices/settings';
import { showToast } from '../../utils/notifications';
import { SettingsScreenProps } from '../../navigation/types';
import { enableDevOptionsSelector } from '../../store/reselect/settings';
import {
	AboutIcon,
	AdvancedIcon,
	BackupIcon,
	DevSettingsIcon,
	GeneralSettingsIcon,
	SecurityIcon,
	SupportIcon,
} from '../../styles/icons';

const imageSrc = require('./../../assets/illustrations/cog.png');

const MainSettings = ({
	navigation,
}: SettingsScreenProps<'MainSettings'>): ReactElement => {
	const { t } = useTranslation('settings');
	const dispatch = useAppDispatch();
	const enableDevOptions = useAppSelector(enableDevOptionsSelector);
	const [enableDevOptionsCount, setEnableDevOptionsCount] = useState(0);

	const updateDevOptions = (): void => {
		const count = enableDevOptionsCount + 1;
		setEnableDevOptionsCount(count);
		if (count >= 5) {
			const enabled = !enableDevOptions;
			dispatch(updateSettings({ enableDevOptions: enabled }));
			showToast({
				type: 'success',
				title: t(enabled ? 'dev_enabled_title' : 'dev_disabled_title'),
				description: t(
					enabled ? 'dev_enabled_message' : 'dev_disabled_message',
				),
			});
			setEnableDevOptionsCount(0);
		}
	};

	const settingsListData: IListData[] = useMemo(() => {
		const data: ItemData[] = [
			{
				title: t('general_title'),
				type: EItemType.button,
				Icon: GeneralSettingsIcon,
				onPress: (): void => navigation.navigate('GeneralSettings'),
				testID: 'GeneralSettings',
			},
			{
				title: t('security_title'),
				type: EItemType.button,
				Icon: SecurityIcon,
				onPress: (): void => navigation.navigate('SecuritySettings'),
				testID: 'SecuritySettings',
			},
			{
				title: t('backup_title'),
				type: EItemType.button,
				Icon: BackupIcon,
				onPress: (): void => navigation.navigate('BackupSettings'),
				testID: 'BackupSettings',
			},
			{
				title: t('advanced_title'),
				type: EItemType.button,
				Icon: AdvancedIcon,
				onPress: (): void => navigation.navigate('AdvancedSettings'),
				testID: 'AdvancedSettings',
			},
			{
				title: t('support_title'),
				type: EItemType.button,
				Icon: SupportIcon,
				testID: 'Support',
				onPress: (): void => navigation.navigate('SupportSettings'),
			},
			{
				title: t('about_title'),
				type: EItemType.button,
				Icon: AboutIcon,
				testID: 'About',
				onPress: (): void => navigation.navigate('AboutSettings'),
			},
			{
				title: t('dev_title'),
				type: EItemType.button,
				hide: !enableDevOptions,
				Icon: DevSettingsIcon,
				testID: 'DevSettings',
				onPress: (): void => navigation.navigate('DevSettings'),
			},
		];

		return [{ data }];
	}, [enableDevOptions, navigation, t]);

	return (
		<ThemedView style={styles.container}>
			<SettingsView
				title={t('settings')}
				listData={settingsListData}
				showBackNavigation={true}
				fullHeight={false}
			/>
			<TouchableOpacity
				style={styles.imageContainer}
				activeOpacity={1}
				onPress={updateDevOptions}
				testID="DevOptions">
				<GlowImage image={imageSrc} imageSize={200} />
			</TouchableOpacity>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexGrow: 1,
	},
});

export default memo(MainSettings);
