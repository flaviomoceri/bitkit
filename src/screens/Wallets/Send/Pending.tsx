import React, { memo, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Text01S } from '../../../styles/text';
import BottomSheetNavigationHeader from '../../../components/BottomSheetNavigationHeader';
import AmountToggle from '../../../components/AmountToggle';
import SafeAreaInset from '../../../components/SafeAreaInset';
import GradientView from '../../../components/GradientView';
import GlowImage from '../../../components/GlowImage';
import Button from '../../../components/Button';
import { rootNavigation } from '../../../navigation/root/RootNavigator';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { closeSheet } from '../../../store/slices/ui';
import { activityItemSelector } from '../../../store/reselect/activity';
import type { SendScreenProps } from '../../../navigation/types';

const imageSrc = require('../../../assets/illustrations/hourglass.png');

const Pending = ({ route }: SendScreenProps<'Pending'>): ReactElement => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation('wallet');
	const { txId } = route.params;

	const activityItem = useAppSelector((state) => {
		return activityItemSelector(state, txId);
	});

	const navigateToTxDetails = (): void => {
		if (activityItem) {
			dispatch(closeSheet('sendNavigation'));
			rootNavigation.navigate('ActivityDetail', {
				id: activityItem.id,
				extended: false,
			});
		}
	};

	const handleClose = (): void => {
		dispatch(closeSheet('sendNavigation'));
	};

	return (
		<GradientView style={styles.container}>
			<BottomSheetNavigationHeader
				title={t('send_pending')}
				displayBackButton={false}
			/>

			<View style={styles.content}>
				{activityItem && (
					<AmountToggle
						sats={activityItem.value}
						reverse={true}
						space={12}
						testID="NewTxPrompt"
						onPress={navigateToTxDetails}
					/>
				)}

				<GlowImage image={imageSrc} imageSize={200} glowColor="purple" />

				<Text01S style={styles.note} color="gray1">
					{t('send_pending_note')}
				</Text01S>

				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						variant="secondary"
						size="large"
						disabled={!activityItem}
						text={t('send_details')}
						onPress={navigateToTxDetails}
					/>
					<View style={styles.divider} />
					<Button
						style={styles.button}
						size="large"
						text={t('close')}
						testID="Close"
						onPress={handleClose}
					/>
				</View>
			</View>
			<SafeAreaInset type="bottom" minPadding={16} />
		</GradientView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
	},
	note: {
		marginBottom: 32,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 'auto',
	},
	button: {
		flex: 1,
	},
	divider: {
		width: 16,
	},
});

export default memo(Pending);
