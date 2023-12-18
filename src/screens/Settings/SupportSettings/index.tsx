import React, { memo, ReactElement, useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';

import { Text01S } from '../../../styles/text';
import {
	DiscordIcon,
	GithubIcon,
	GlobeIcon,
	MediumIcon,
	TelegramIcon,
	TwitterIcon,
} from '../../../styles/icons';
import { openURL } from '../../../utils/helpers';
import NavigationHeader from '../../../components/NavigationHeader';
import List, { EItemType, IListData } from '../../../components/List';
import GlowingBackground from '../../../components/GlowingBackground';
import SafeAreaInset from '../../../components/SafeAreaInset';
import type { SettingsScreenProps } from '../../../navigation/types';
import GlowImage from '../../../components/GlowImage';

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
							// TODO: update with correct url
							openURL('https://support.synonym.to/hc/help-center').then();
						},
					},
				],
			},
		],
		// [isReviewing],
		[t, navigation],
	);

	return (
		<GlowingBackground>
			<SafeAreaInset type="top" />
			<NavigationHeader
				title={t('support_title')}
				onClosePress={(): void => {
					navigation.navigate('Wallet');
				}}
			/>
			<View style={styles.content}>
				<Text01S style={styles.text} color="gray1">
					<Trans t={t} i18nKey="support.text" />
				</Text01S>

				<List
					style={styles.list}
					data={settingsSupportListData}
					bounces={false}
				/>
				<View style={styles.logoContainer}>
					<GlowImage image={imageSrc} imageSize={200} glowColor={'green'} />
				</View>

				<View style={styles.footer}>
					<View style={styles.socialLinks}>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openURL('https://www.bitkit.to');
							}}>
							<GlobeIcon color="white" height={24} width={24} />
						</Pressable>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openURL('https://www.medium.com/synonym-to');
							}}>
							<MediumIcon color="white" height={24} width={24} />
						</Pressable>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openURL('https://www.twitter.com/bitkitwallet');
							}}>
							<TwitterIcon color="white" height={24} width={24} />
						</Pressable>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openURL('https://discord.gg/DxTBJXvJxn');
							}}>
							<DiscordIcon color="white" height={24} width={24} />
						</Pressable>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openURL('https://t.me/bitkitchat');
							}}>
							<TelegramIcon color="white" height={24} width={24} />
						</Pressable>
						<Pressable
							style={styles.socialLink}
							onPress={(): void => {
								openURL('https://www.github.com/synonymdev');
							}}>
							<GithubIcon color="white" height={24} width={24} />
						</Pressable>
					</View>
				</View>
			</View>
		</GlowingBackground>
	);
};

const styles = StyleSheet.create({
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
		width: 300,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	socialLink: {
		padding: 14,
		backgroundColor: '#2a2a2a',
		borderRadius: 100,
		marginLeft: 38,
		marginRight: 38,
	},
});

export default memo(SupportSettings);
