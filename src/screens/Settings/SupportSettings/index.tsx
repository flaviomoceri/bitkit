import React, { memo, ReactElement, useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Text01S } from '../../../styles/text';
import {
	DiscordIcon,
	GithubIcon,
	GlobeIcon,
	MediumIcon,
	TelegramIcon,
	TwitterIcon,
} from '../../../styles/icons';
import { View as ThemedView } from '../../../styles/components';
import NavigationHeader from '../../../components/NavigationHeader';
import List, { EItemType, IListData } from '../../../components/List';
import SafeAreaInset from '../../../components/SafeAreaInset';
import type { SettingsScreenProps } from '../../../navigation/types';
import GlowImage from '../../../components/GlowImage';
import { openAppURL, openURL } from '../../../utils/helpers';

const imageSrc = require('../../../assets/illustrations/question-mark.png');

const SupportSettings = ({
	navigation,
}: SettingsScreenProps<'SupportSettings'>): ReactElement => {
	const { t } = useTranslation('settings');

	const settingsSupportListData: IListData[] = useMemo(
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
						onPress: (): void => navigation.navigate('AppStatus'),
						testID: 'AppStatus',
					},
				],
			},
		],
		// [isReviewing],
		[t, navigation],
	);

	return (
		<ThemedView style={styles.fullHeight}>
			<SafeAreaInset type="top" />
			<NavigationHeader
				title={t('support_title')}
				onClosePress={(): void => {
					navigation.navigate('Wallet');
				}}
			/>
			<View style={styles.content}>
				<Text01S style={styles.text} color="gray1">
					{t('support.text')}
				</Text01S>

				<List
					style={styles.list}
					data={settingsSupportListData}
					bounces={false}
				/>
				<View style={styles.logoContainer}>
					<GlowImage image={imageSrc} imageSize={192} glowColor={'green'} />
				</View>

				<View style={styles.footer}>
					<View style={styles.socialLinks}>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openAppURL('https://www.bitkit.to');
							}}>
							<GlobeIcon color="white" height={24} width={24} />
						</Pressable>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openAppURL('https://www.medium.com/synonym-to');
							}}>
							<MediumIcon color="white" height={24} width={24} />
						</Pressable>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openAppURL('https://www.twitter.com/bitkitwallet');
							}}>
							<TwitterIcon color="white" height={24} width={24} />
						</Pressable>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openAppURL('https://discord.gg/DxTBJXvJxn');
							}}>
							<DiscordIcon color="white" height={24} width={24} />
						</Pressable>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openAppURL('https://t.me/bitkitchat');
							}}>
							<TelegramIcon color="white" height={24} width={24} />
						</Pressable>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openAppURL('https://www.github.com/synonymdev');
							}}>
							<GithubIcon color="white" height={24} width={24} />
						</Pressable>
					</View>
				</View>
			</View>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	fullHeight: {
		flex: 1,
	},
	content: {
		flexGrow: 1,
		paddingHorizontal: 16,
	},
	text: {
		paddingBottom: 32,
	},
	list: {
		marginBottom: 32,
	},
	footer: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: 'auto',
		marginBottom: 32,
	},
	logoContainer: {
		position: 'relative',
		marginBottom: 200,
		justifyContent: 'center',
		alignItems: 'center',
	},
	socialLinks: {
		width: 375,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	socialLink: {
		padding: 14,
		backgroundColor: '#2a2a2a',
		borderRadius: 32,
	},
});

export default memo(SupportSettings);
