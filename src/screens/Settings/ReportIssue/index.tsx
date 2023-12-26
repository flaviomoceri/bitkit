import React, { memo, ReactElement, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Platform } from 'react-native';
import {
	getBuildNumber,
	getSystemVersion,
	getVersion,
} from 'react-native-device-info';
import { useTranslation } from 'react-i18next';

import { getNodeId, getNodeVersion } from '../../../utils/lightning';
import { Text01S } from '../../../styles/text';
import { View as ThemedView } from '../../../styles/components';
import NavigationHeader from '../../../components/NavigationHeader';
import SafeAreaInset from '../../../components/SafeAreaInset';
import type { SettingsScreenProps } from '../../../navigation/types';
import LabeledInput from '../../../components/LabeledInput';
import Button from '../../../components/Button';
import { __CHATWOOT_API__ } from '../../../constants/env';

const ReportIssue = ({
	navigation,
}: SettingsScreenProps<'ReportIssue'>): ReactElement => {
	const { t } = useTranslation('settings');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const validateEmail = (emailText: string): boolean => {
		if (emailText.indexOf('@') !== -1) {
			const [beforeAt, afterAt] = emailText.split('@');
			if (beforeAt.length > 0 && afterAt.length > 0) {
				return true;
			}
		}
		return false;
	};

	const SendRequest = async (): Promise<void> => {
		try {
			setIsLoading(true);
			let ldkVersion = '';
			let ldkNodeId = '';
			const ldkVersionUser = await getNodeVersion();
			const ldknodeIdUser = await getNodeId();

			if (ldkVersionUser.isOk() && ldknodeIdUser.isOk()) {
				ldkVersion += `ldk-${ldkVersionUser.value.ldk} c_bindings-${ldkVersionUser.value.c_bindings}`;
				ldkNodeId += `${ldknodeIdUser.value}`;
			}
			await axios.post(`${__CHATWOOT_API__}`, {
				email,
				message,
				platform: `${Platform.OS} ${getSystemVersion()}`,
				version: `${getVersion()} (${getBuildNumber()})`,
				ldkVersion: ldkVersion,
				ldkNodeId: ldkNodeId,
			});
			navigation.navigate('FormSuccess');
			setEmail('');
			setMessage('');
			setIsLoading(false);
		} catch (error) {
			console.error('Error', error);
			navigation.navigate('FormError');
			setEmail('');
			setMessage('');
			setIsLoading(false);
		}
	};

	const isValid = validateEmail(email) && message;

	return (
		<ThemedView style={styles.fullHeight}>
			<SafeAreaInset type="top" />
			<NavigationHeader
				title={t('support.report')}
				onClosePress={(): void => {
					navigation.navigate('Wallet');
				}}
			/>
			<View style={styles.content}>
				<Text01S style={styles.text} color="gray1">
					{t('support.report_text')}
				</Text01S>

				<LabeledInput
					style={styles.addressInput}
					label={t('support.label_address')}
					placeholder={t('support.placeholder_address')}
					maxLength={25}
					value={email}
					testID="LinkLabelInput"
					onChange={(value: string): void => {
						setEmail(value);
					}}
				/>
				<LabeledInput
					placeholder={t('support.placeholder_message')}
					multiline={true}
					value={message}
					returnKeyType="default"
					label={t('support.label_message')}
					maxLength={5048}
					testID="LinkValueInput"
					lines={5.5}
					onChange={(value: string): void => {
						setMessage(value);
					}}
				/>

				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						text={t('support.text_button')}
						size="large"
						disabled={!isValid}
						loading={isLoading}
						testID="SendRequest"
						onPress={SendRequest}
					/>
				</View>
				<SafeAreaInset type="bottom" minPadding={16} />
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
	addressInput: {
		marginBottom: 26,
	},
	buttonContainer: {
		marginTop: 'auto',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	button: {
		flex: 1,
	},
});

export default memo(ReportIssue);
