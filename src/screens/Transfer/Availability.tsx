import React, { ReactElement, memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Trans, useTranslation } from 'react-i18next';

import { Display, Text01B, Text01S } from '../../styles/text';
import SafeAreaInset from '../../components/SafeAreaInset';
import GlowingBackground from '../../components/GlowingBackground';
import NavigationHeader from '../../components/NavigationHeader';
import GlowImage from '../../components/GlowImage';
import Button from '../../components/Button';
import { refreshWallet } from '../../utils/wallet';
import { closeAllChannels } from '../../utils/lightning';
import type { TransferScreenProps } from '../../navigation/types';
import { startCoopCloseTimer } from '../../store/slices/user';
import {
	selectedNetworkSelector,
	selectedWalletSelector,
} from '../../store/reselect/wallet';

const imageSrc = require('../../assets/illustrations/exclamation-mark.png');

const Availability = ({
	navigation,
}: TransferScreenProps<'Availability'>): ReactElement => {
	const { t } = useTranslation('lightning');
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();
	const selectedWallet = useAppSelector(selectedWalletSelector);
	const selectedNetwork = useAppSelector(selectedNetworkSelector);

	const onCancel = (): void => {
		navigation.goBack();
	};

	const onContinue = async (): Promise<void> => {
		setIsLoading(true);
		const closeResponse = await closeAllChannels({
			selectedNetwork,
			selectedWallet,
		});

		if (closeResponse.isOk() && closeResponse.value.length === 0) {
			await refreshWallet();
			navigation.navigate('Success', { type: 'savings' });
			return;
		} else {
			dispatch(startCoopCloseTimer());
			navigation.navigate('Interrupted');
		}
	};

	return (
		<GlowingBackground topLeft="purple">
			<SafeAreaInset type="top" />
			<NavigationHeader
				title={t('availability_title')}
				displayBackButton={false}
			/>
			<View style={styles.root}>
				<Display color="purple">{t('availability_header')}</Display>
				<Text01S color="gray1" style={styles.text}>
					<Trans
						t={t}
						i18nKey="availability_text"
						components={{ highlight: <Text01B color="white" /> }}
					/>
				</Text01S>

				<GlowImage image={imageSrc} glowColor="purple" />

				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						text={t('cancel')}
						size="large"
						variant="secondary"
						onPress={onCancel}
					/>
					<View style={styles.divider} />
					<Button
						style={styles.button}
						text={t('ok')}
						size="large"
						loading={isLoading}
						onPress={onContinue}
					/>
				</View>
			</View>
			<SafeAreaInset type="bottom" minPadding={16} />
		</GlowingBackground>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		marginTop: 8,
		paddingHorizontal: 16,
	},
	text: {
		marginTop: 4,
		marginBottom: 16,
	},
	buttonContainer: {
		marginTop: 'auto',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	button: {
		flex: 1,
	},
	divider: {
		width: 16,
	},
});

export default memo(Availability);
