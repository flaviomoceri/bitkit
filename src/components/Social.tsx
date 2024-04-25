import React, { ReactElement } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Pressable } from '../styles/components';
import { openAppURL } from '../utils/helpers';
import {
	DiscordIcon,
	GithubIcon,
	GlobeIcon,
	MediumIcon,
	TelegramIcon,
	TwitterIcon,
} from '../styles/icons';

const Social = ({ style }: { style?: StyleProp<ViewStyle> }): ReactElement => {
	return (
		<View style={[styles.root, style]}>
			<Pressable
				style={styles.socialLink}
				color="white10"
				onPress={(): void => {
					openAppURL('https://www.bitkit.to');
				}}>
				<GlobeIcon color="white" height={24} width={24} />
			</Pressable>
			<Pressable
				style={styles.socialLink}
				color="white10"
				onPress={(): void => {
					openAppURL('https://www.medium.com/synonym-to');
				}}>
				<MediumIcon color="white" height={24} width={24} />
			</Pressable>
			<Pressable
				style={styles.socialLink}
				color="white10"
				onPress={(): void => {
					openAppURL('https://www.twitter.com/bitkitwallet');
				}}>
				<TwitterIcon color="white" height={24} width={24} />
			</Pressable>
			<Pressable
				style={styles.socialLink}
				color="white10"
				onPress={(): void => {
					openAppURL('https://discord.gg/DxTBJXvJxn');
				}}>
				<DiscordIcon color="white" height={24} width={24} />
			</Pressable>
			<Pressable
				style={styles.socialLink}
				color="white10"
				onPress={(): void => {
					openAppURL('https://t.me/bitkitchat');
				}}>
				<TelegramIcon color="white" height={24} width={24} />
			</Pressable>
			<Pressable
				style={styles.socialLink}
				color="white10"
				onPress={(): void => {
					openAppURL('https://www.github.com/synonymdev');
				}}>
				<GithubIcon color="white" height={24} width={24} />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	socialLink: {
		padding: 14,
		borderRadius: 32,
	},
});

export default Social;
