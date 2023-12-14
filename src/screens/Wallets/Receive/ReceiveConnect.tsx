import React, { memo, ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';

import { Caption13Up, Text01S } from '../../../styles/text';
import GradientView from '../../../components/GradientView';
import AmountToggle from '../../../components/AmountToggle';
import BottomSheetNavigationHeader from '../../../components/BottomSheetNavigationHeader';
import SafeAreaInset from '../../../components/SafeAreaInset';
import Button from '../../../components/Button';
import GlowImage from '../../../components/GlowImage';
import Money from '../../../components/Money';
import { useScreenSize } from '../../../hooks/screen';
import useDisplayValues from '../../../hooks/displayValues';
import { useLightningBalance } from '../../../hooks/lightning';
import { receiveSelector } from '../../../store/reselect/receive';
import type { ReceiveScreenProps } from '../../../navigation/types';
import { DEFAULT_CHANNEL_DURATION } from '../../Lightning/CustomConfirm';
import { addCJitEntry } from '../../../store/actions/blocktank';
import { createCJitEntry, estimateOrderFee } from '../../../utils/blocktank';
import { showToast } from '../../../utils/notifications';
import { updateInvoice } from '../../../store/actions/receive';
import { blocktankInfoSelector } from '../../../store/reselect/blocktank';
import { ICreateOrderRequest } from '../../../store/types/blocktank';

const imageSrc = require('../../../assets/illustrations/lightning.png');

const ReceiveConnect = ({
	navigation,
}: ReceiveScreenProps<'ReceiveConnect'>): ReactElement => {
	const { t } = useTranslation('wallet');
	const { isSmallScreen } = useScreenSize();
	const lightningBalance = useLightningBalance(true);
	const [feeEstimate, setFeeEstimate] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const { amount } = useSelector(receiveSelector);
	const invoice = useSelector(receiveSelector);
	const blocktank = useSelector(blocktankInfoSelector);

	const { maxChannelSizeSat } = blocktank.options;

	const requestData: ICreateOrderRequest = {
		lspBalanceSat: amount,
		channelExpiryWeeks: DEFAULT_CHANNEL_DURATION,
		options: {},
	};

	async function feeEstimation(): Promise<void> {
		try {
			const estimate = await estimateOrderFee(requestData);
			if (estimate.isOk()) {
				setFeeEstimate(estimate.value);
			} else {
				console.error('Error in estimate');
			}
		} catch (error) {
			console.error('Error', error);
		}
	}

	feeEstimation();

	const payAmount = amount - feeEstimate;
	const displayFee = useDisplayValues(feeEstimate);

	const onContinue = async (): Promise<void> => {
		setIsLoading(true);

		const cJitEntryResponse = await createCJitEntry({
			channelSizeSat: maxChannelSizeSat,
			invoiceSat: invoice.amount,
			invoiceDescription: invoice.message,
			channelExpiryWeeks: DEFAULT_CHANNEL_DURATION,
			couponCode: 'bitkit',
		});
		if (cJitEntryResponse.isErr()) {
			setIsLoading(false);
			console.log({ error: cJitEntryResponse.error.message });
			showToast({
				type: 'error',
				title: t('receive_cjit_error'),
				description: cJitEntryResponse.error.message,
			});
			return;
		}
		const order = cJitEntryResponse.value;
		updateInvoice({ jitOrder: order });
		addCJitEntry(order).then();
		navigation.navigate('ReceiveQR');
		setIsLoading(false);
	};

	const isInitial = lightningBalance.localBalance === 0;
	const imageSize = isSmallScreen ? 130 : 192;

	return (
		<GradientView style={styles.container}>
			<BottomSheetNavigationHeader title={t('receive_instantly')} />
			<View style={styles.content}>
				<AmountToggle sats={amount} reverse={true} space={12} />

				<Text01S style={styles.text} color="gray1">
					<Trans
						t={t}
						i18nKey={
							isInitial
								? 'receive_connect_initial'
								: 'receive_connect_additional'
						}
						components={{
							white: <Text01S color="white" />,
						}}
						values={{
							fee: `${displayFee.fiatSymbol}${displayFee.fiatFormatted}`,
						}}
					/>
				</Text01S>

				<View style={styles.payAmount}>
					<Caption13Up style={styles.payAmountText} color="gray1">
						{t('receive_will')}
					</Caption13Up>
					<Money
						sats={payAmount}
						size="title"
						symbol={true}
						testID="AvailableAmount"
					/>
				</View>

				<GlowImage image={imageSrc} glowColor="purple" imageSize={imageSize} />

				<View style={styles.buttonContainer}>
					<Button
						size="large"
						text={t('continue')}
						loading={isLoading}
						testID="ReceiveConnectContinue"
						onPress={onContinue}
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
	text: {
		marginTop: 32,
	},
	payAmount: {
		marginTop: 32,
	},
	payAmountText: {
		marginBottom: 5,
	},
	buttonContainer: {
		marginTop: 'auto',
	},
});

export default memo(ReceiveConnect);
