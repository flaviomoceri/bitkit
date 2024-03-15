import React, { ReactElement, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
	BtOpenChannelState,
	IBtOrder,
} from '@synonymdev/blocktank-lsp-http-client';
import { BtOrderState2 } from '@synonymdev/blocktank-lsp-http-client/dist/shared/BtOrderState2';
import { BtPaymentState2 } from '@synonymdev/blocktank-lsp-http-client/dist/shared/BtPaymentState2';

import { EChannelStatus } from '../../../store/types/lightning';
import { View as ThemedView } from '../../../styles/components';
import { Text01M } from '../../../styles/text';
import {
	ArrowCounterClock,
	Checkmark,
	ClockIcon,
	HourglassSimpleIcon,
	LightningIcon,
	TimerSpeedIcon,
	XIcon,
} from '../../../styles/icons';

const ChannelStatus = ({
	status,
	order,
}: {
	status: EChannelStatus;
	order?: IBtOrder;
}): ReactElement => {
	const { t } = useTranslation('lightning');

	// Use open/closed status from LDK if available
	switch (status) {
		case EChannelStatus.open: {
			return (
				<View style={styles.statusRow}>
					<ThemedView style={styles.statusIcon} color="green16">
						<LightningIcon color="green" width={16} height={16} />
					</ThemedView>
					<Text01M color="green">{t('order_state.open')}</Text01M>
				</View>
			);
		}
		case EChannelStatus.closed: {
			return (
				<View style={styles.statusRow}>
					<ThemedView style={styles.statusIcon} color="white10">
						<LightningIcon color="gray1" width={16} height={16} />
					</ThemedView>
					<Text01M color="gray1">{t('order_state.closed')}</Text01M>
				</View>
			);
		}
	}

	if (order) {
		// If the channel is with the LSP, we can show a more accurate status for pending channels
		const orderState = order.state2;
		const paymentState = order.payment.state2;
		const channelState = order.channel?.state;

		if (channelState) {
			switch (channelState) {
				case BtOpenChannelState.OPENING: {
					return (
						<View style={styles.statusRow}>
							<ThemedView style={styles.statusIcon} color="purple16">
								<HourglassSimpleIcon color="purple" width={16} height={16} />
							</ThemedView>
							<Text01M color="purple">{t('order_state.opening')}</Text01M>
						</View>
					);
				}
			}
		}

		switch (orderState) {
			case BtOrderState2.EXPIRED: {
				return (
					<View style={styles.statusRow}>
						<ThemedView style={styles.statusIcon} color="red16">
							<TimerSpeedIcon color="red" width={16} height={16} />
						</ThemedView>
						<Text01M color="red">{t('order_state.expired')}</Text01M>
					</View>
				);
			}
		}

		switch (paymentState) {
			case BtPaymentState2.CANCELED: {
				return (
					<View style={styles.statusRow}>
						<ThemedView style={styles.statusIcon} color="red16">
							<XIcon color="red" width={16} height={16} />
						</ThemedView>
						<Text01M color="red">{t('order_state.payment_canceled')}</Text01M>
					</View>
				);
			}
			case BtPaymentState2.REFUND_AVAILABLE: {
				return (
					<View style={styles.statusRow}>
						<ThemedView style={styles.statusIcon} color="yellow16">
							<ArrowCounterClock color="yellow" width={16} height={16} />
						</ThemedView>
						<Text01M color="yellow">
							{t('order_state.refund_available')}
						</Text01M>
					</View>
				);
			}
			case BtPaymentState2.REFUNDED: {
				return (
					<View style={styles.statusRow}>
						<ThemedView style={styles.statusIcon} color="white10">
							<ArrowCounterClock color="gray1" width={16} height={16} />
						</ThemedView>
						<Text01M color="gray1">{t('order_state.refunded')}</Text01M>
					</View>
				);
			}
		}

		switch (paymentState) {
			case BtPaymentState2.CREATED: {
				return (
					<View style={styles.statusRow}>
						<ThemedView style={styles.statusIcon} color="purple16">
							<ClockIcon color="purple" width={16} height={16} />
						</ThemedView>
						<Text01M color="purple">
							{t('order_state.awaiting_payment')}
						</Text01M>
					</View>
				);
			}
			case BtPaymentState2.PAID: {
				return (
					<View style={styles.statusRow}>
						<ThemedView style={styles.statusIcon} color="purple16">
							<Checkmark color="purple" width={16} height={16} />
						</ThemedView>
						<Text01M color="purple">{t('order_state.paid')}</Text01M>
					</View>
				);
			}
		}
	}

	switch (status) {
		case EChannelStatus.pending: {
			return (
				<View style={styles.statusRow}>
					<ThemedView style={styles.statusIcon} color="purple16">
						<HourglassSimpleIcon color="purple" width={16} height={16} />
					</ThemedView>
					<Text01M color="purple">{t('order_state.opening')}</Text01M>
				</View>
			);
		}
	}
};

const styles = StyleSheet.create({
	statusRow: {
		marginTop: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	statusIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 16,
	},
});

export default memo(ChannelStatus);
