import React, { memo, ReactElement, useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

import { View as ThemedView } from '../../../styles/components';
import { EItemType, IListData } from '../../../components/List';
import SafeAreaInset from '../../../components/SafeAreaInset';
import Social from '../../../components/Social';
import SettingsView from '../SettingsView';
import { openURL } from '../../../utils/helpers';
import type { SettingsScreenProps } from '../../../navigation/types';

const imageSrc = require('../../../assets/illustrations/question-mark.png');

const SupportSettings = ({
	navigation,
}: SettingsScreenProps<'SupportSettings'>): ReactElement => {
	const { t } = useTranslation('settings');

	const listData: IListData[] = useMemo(
		() => [
			{
				data: [
					{
						title: t('support.report'),
						type: EItemType.button,
						onPress: (): void => navigation.navigate('ReportIssue'),
					},
					{
						title: t('support.help'),
						type: EItemType.button,
						onPress: (): void => {
							openURL('https://help.bitkit.to').then();
						},
					},
					{
						title: t('support.status'),
						type: EItemType.button,
						testID: 'AppStatus',
						onPress: (): void => navigation.navigate('AppStatus'),
					},
				],
			},
		],
		[t, navigation],
	);

	return (
		<ThemedView style={styles.root}>
			<SettingsView
				title={t('support.title')}
				headerText={t('support.text')}
				listData={listData}
				fullHeight={false}
			/>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={imageSrc} />
			</View>
			<Social style={styles.social} />
			<SafeAreaInset type="bottom" minPadding={16} />
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	imageContainer: {
		flexShrink: 1,
		alignItems: 'center',
		alignSelf: 'center',
		width: 256,
		aspectRatio: 1,
		marginTop: 'auto',
	},
	image: {
		flex: 1,
		resizeMode: 'contain',
	},
	social: {
		marginTop: 'auto',
		paddingHorizontal: 16,
	},
});

export default memo(SupportSettings);
