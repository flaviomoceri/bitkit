import React, { ReactElement, memo, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import { BtOrderState2 } from '@synonymdev/blocktank-lsp-http-client/dist/shared/BtOrderState2';
import {
	BtOpenChannelState,
	IBtOrder,
} from '@synonymdev/blocktank-lsp-http-client';

import { View as ThemedView } from '../../../styles/components';
import { Caption13Up, Caption13M } from '../../../styles/text';
import SafeAreaInset from '../../../components/SafeAreaInset';
import Button from '../../../components/Button';
import NavigationHeader from '../../../components/NavigationHeader';
import LightningChannel, {
	TStatus,
} from '../../../components/LightningChannel';
import ChannelStatus from './ChannelStatus';
import Money from '../../../components/Money';
import { useAppSelector } from '../../../hooks/redux';
import { usePaidBlocktankOrders } from '../../../hooks/blocktank';
import {
	useLightningChannelBalance,
	useLightningChannelName,
} from '../../../hooks/lightning';
import { showToast } from '../../../utils/notifications';
import { getTransactions } from '../../../utils/wallet/electrum';
import { getBlockExplorerLink } from '../../../utils/wallet/transactions';
import { openURL } from '../../../utils/helpers';
import { createOrderSupportLink } from '../../../utils/support';
import { EUnit } from '../../../store/types/wallet';
import { selectedNetworkSelector } from '../../../store/reselect/wallet';
import { enableDevOptionsSelector } from '../../../store/reselect/settings';
import { i18nTime } from '../../../utils/i18n';
import { updateOrder } from '../../../store/utils/blocktank';
import { EChannelStatus } from '../../../store/types/lightning';
import type { SettingsScreenProps } from '../../../navigation/types';
import { BtPaymentState2 } from '@synonymdev/blocktank-lsp-http-client/dist/shared/BtPaymentState2';

const Section = memo(
	({
		name,
		value,
		testID,
		onPress,
	}: {
		name: string;
		value: ReactElement;
		testID?: string;
		onPress?: () => void;
	}): ReactElement => {
		return (
			<TouchableOpacity
				activeOpacity={onPress ? 0.5 : 1}
				onPress={onPress}
				style={styles.sectionRoot}>
				<View style={styles.sectionName}>
					<Caption13M>{name}</Caption13M>
				</View>
				<View style={styles.sectionValue} testID={testID}>
					{value}
				</View>
			</TouchableOpacity>
		);
	},
);

const ChannelDetails = ({
	navigation,
	route,
}: SettingsScreenProps<'ChannelDetails'>): ReactElement => {
	const { t } = useTranslation('lightning');
	const { t: tTime } = useTranslation('intl', { i18n: i18nTime });
	const { channel } = route.params;

	const [txTime, setTxTime] = useState<string>();
	const { spendingAvailable, receivingAvailable, capacity } =
		useLightningChannelBalance(channel);
	const selectedNetwork = useAppSelector(selectedNetworkSelector);
	const enableDevOptions = useAppSelector(enableDevOptionsSelector);
	const paidBlocktankOrders = usePaidBlocktankOrders();
	const blocktankOrder = Object.values(paidBlocktankOrders).find((order) => {
		// real channel
		if (channel.funding_txid) {
			return order.channel?.fundingTx.id === channel.funding_txid;
		}

		// fake channel
		return order.id === channel.channel_id;
	});

	const channelName = useLightningChannelName(channel, blocktankOrder);
	const channelIsOpen = channel.status === EChannelStatus.open;

	useEffect(() => {
		if (blocktankOrder) {
			updateOrder(blocktankOrder.id).then();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!channel.funding_txid) {
			return;
		}
		getTransactions({
			txHashes: [{ tx_hash: channel.funding_txid }],
		}).then((txResponse) => {
			if (txResponse.isErr()) {
				return;
			}
			const txData = txResponse.value.data;
			if (txData.length === 0) {
				return;
			}
			const timestamp = txData[0].result.time;
			if (!timestamp) {
				return;
			}

			const formattedDate = tTime('dateTime', {
				v: new Date(timestamp * 1000),
				formatParams: {
					v: {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						hour12: false,
					},
				},
			});

			setTxTime(formattedDate);
		});
	}, [selectedNetwork, channel.funding_txid, tTime]);

	const openSupportLink = async (order: IBtOrder): Promise<void> => {
		const link = await createOrderSupportLink(
			order.id,
			`Transaction ID: ${order?.channel?.fundingTx.id}`,
		);
		const res = await openURL(link);
		if (!res) {
			await openURL('https://synonym.to/contact');
		}
	};

	const getChannelStatus = (): TStatus => {
		if (channel.status !== EChannelStatus.pending) {
			return channel.status;
		}

		// If the channel is with the LSP, we can show a more accurate status for pending channels
		if (blocktankOrder) {
			switch (blocktankOrder.channel?.state) {
				case BtOpenChannelState.OPENING:
					return 'pending';
			}
			switch (blocktankOrder.state2) {
				case BtOrderState2.CREATED:
				case BtOrderState2.PAID:
					return 'pending';
				case BtOrderState2.EXPIRED:
					return 'closed';
			}
			switch (blocktankOrder.payment.state2) {
				case BtPaymentState2.CANCELED:
				case BtPaymentState2.REFUNDED:
				case BtPaymentState2.REFUND_AVAILABLE:
					return 'closed';
			}
		}

		return channel.status;
	};

	let channelCloseTime: string | undefined;
	if (blocktankOrder?.channel?.close) {
		channelCloseTime = tTime('dateTime', {
			v: new Date(blocktankOrder.channel.close.registeredAt),
			formatParams: {
				v: {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					hour12: false,
				},
			},
		});
	}

	return (
		<ThemedView style={styles.root}>
			<SafeAreaInset type="top" />
			<NavigationHeader
				title={channelName}
				onClosePress={(): void => navigation.navigate('Wallet')}
			/>
			<ScrollView
				contentContainerStyle={styles.content}
				testID="ChannelScrollView">
				<View style={styles.channel}>
					<LightningChannel channel={channel} status={getChannelStatus()} />
				</View>

				<View style={styles.status}>
					<View style={styles.sectionTitle}>
						<Caption13Up color="gray1">{t('status')}</Caption13Up>
					</View>
					<ChannelStatus status={channel.status} order={blocktankOrder} />
				</View>

				{blocktankOrder && (
					<View style={styles.section}>
						<View style={styles.sectionTitle}>
							<Caption13Up color="gray1">{t('order_details')}</Caption13Up>
						</View>
						<Section
							name={t('order')}
							value={
								<Caption13M ellipsizeMode="middle" numberOfLines={1}>
									{blocktankOrder.id}
								</Caption13M>
							}
							onPress={(): void => {
								Clipboard.setString(blocktankOrder.id);
								showToast({
									type: 'success',
									title: t('copied'),
									description: blocktankOrder.id,
								});
							}}
						/>
						<Section
							name={t('created_on')}
							value={
								<Caption13M>
									{tTime('dateTime', {
										v: new Date(blocktankOrder.createdAt),
										formatParams: {
											v: {
												year: 'numeric',
												month: 'short',
												day: 'numeric',
												hour: 'numeric',
												minute: 'numeric',
												hour12: false,
											},
										},
									})}
								</Caption13M>
							}
						/>
						{channel.funding_txid && (
							<Section
								name={t('transaction')}
								value={
									<Caption13M ellipsizeMode="middle" numberOfLines={1}>
										{channel.funding_txid}
									</Caption13M>
								}
								onPress={(): void => {
									if (channel.funding_txid) {
										const blockExplorerUrl = getBlockExplorerLink(
											channel.funding_txid,
										);
										Clipboard.setString(channel.funding_txid);
										openURL(blockExplorerUrl).then();
									}
								}}
							/>
						)}
						<Section
							name={t('order_fee')}
							value={
								<Money
									sats={blocktankOrder.feeSat - blocktankOrder.clientBalanceSat}
									size="caption13M"
									color="white"
									symbol={true}
									symbolColor="gray1"
									unit={EUnit.BTC}
								/>
							}
						/>
					</View>
				)}

				<View style={styles.section}>
					<View style={styles.sectionTitle}>
						<Caption13Up color="gray1">{t('balance')}</Caption13Up>
					</View>
					<Section
						name={t('receiving_label')}
						value={
							<Money
								sats={receivingAvailable}
								size="caption13M"
								symbol={true}
								symbolColor="gray1"
								color="white"
								unit={EUnit.BTC}
							/>
						}
					/>
					<Section
						name={t('spending_label')}
						value={
							<Money
								sats={spendingAvailable}
								size="caption13M"
								symbol={true}
								symbolColor="gray1"
								color="white"
								unit={EUnit.BTC}
							/>
						}
					/>
					<Section
						name={t('reserve_balance')}
						value={
							<Money
								sats={Number(channel.unspendable_punishment_reserve)}
								size="caption13M"
								symbol={true}
								symbolColor="gray1"
								color="white"
								unit={EUnit.BTC}
							/>
						}
					/>
					<Section
						name={t('total_size')}
						testID="TotalSize"
						value={
							<Money
								sats={capacity}
								size="caption13M"
								symbol={true}
								symbolColor="gray1"
								color="white"
								unit={EUnit.BTC}
							/>
						}
					/>
				</View>

				{/* TODO: show fees */}
				{/* <View style={styles.section}>
					<View style={styles.sectionTitle}>
						<Caption13Up color="gray1">Fees</Caption13Up>
					</View>
					<Section
						name="Spending base fee"
						value={
							<Money
								sats={123}
								size="caption13M"
								symbol={true}
								symbolColor="gray1"
								color="white"
								unit={EUnit.BTC}
							/>
						}
					/>
					<Section
						name="Receiving base fee"
						value={
							<Money
								sats={123}
								size="caption13M"
								symbol={true}
								symbolColor="gray1"
								color="white"
								unit={EUnit.BTC}
							/>
						}
					/>
				</View> */}

				<View style={styles.section}>
					<View style={styles.sectionTitle}>
						<Caption13Up color="gray1">{t('other')}</Caption13Up>
					</View>
					{txTime && (
						<Section
							name={t('opened_on')}
							value={<Caption13M>{txTime}</Caption13M>}
						/>
					)}
					{channelCloseTime && (
						<Section
							name={t('closed_on')}
							value={<Caption13M>{channelCloseTime}</Caption13M>}
						/>
					)}
					<Section
						name={t('channel_node_id')}
						value={
							<Caption13M ellipsizeMode="middle" numberOfLines={1}>
								{channel.counterparty_node_id}
							</Caption13M>
						}
						onPress={(): void => {
							Clipboard.setString(channel.counterparty_node_id);
							showToast({
								type: 'success',
								title: t('copied'),
								description: channel.counterparty_node_id,
							});
						}}
					/>
				</View>

				{enableDevOptions && (
					<View style={styles.section}>
						<View style={styles.sectionTitle}>
							<Caption13Up color="gray1">{t('debug')}</Caption13Up>
						</View>
						{blocktankOrder?.orderExpiresAt && (
							<Section
								name="Order Expiry"
								value={
									<Caption13M>
										{new Date(blocktankOrder.orderExpiresAt).toLocaleString()}
									</Caption13M>
								}
							/>
						)}
						<Section
							name={t('is_usable')}
							value={
								<Caption13M>{t(channel.is_usable ? 'yes' : 'no')}</Caption13M>
							}
						/>
						<Section
							name={t('is_ready')}
							testID={channel.is_channel_ready ? 'IsReadyYes' : 'IsReadyNo'}
							value={
								<Caption13M>
									{t(channel.is_channel_ready ? 'yes' : 'no')}
								</Caption13M>
							}
						/>
					</View>
				)}

				<View style={styles.buttons}>
					{blocktankOrder && (
						<>
							<Button
								style={styles.button}
								text={t('support')}
								size="large"
								variant="secondary"
								onPress={(): void => {
									openSupportLink(blocktankOrder);
								}}
							/>
							<View style={styles.divider} />
						</>
					)}
					{channelIsOpen && (
						<Button
							style={styles.button}
							text={t('close_conn')}
							size="large"
							testID="CloseConnection"
							onPress={(): void =>
								navigation.navigate('CloseConnection', {
									channelId: channel.channel_id,
								})
							}
						/>
					)}
				</View>

				<SafeAreaInset type="bottom" minPadding={16} />
			</ScrollView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'space-between',
	},
	content: {
		paddingHorizontal: 16,
		flexGrow: 1,
	},
	channel: {
		paddingTop: 16,
		paddingBottom: 32,
		marginBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255, 255, 255, 0.1)',
	},
	status: {
		marginBottom: 16,
	},
	section: {
		marginTop: 16,
	},
	sectionTitle: {
		height: 30,
		flexDirection: 'row',
		alignItems: 'center',
	},
	sectionRoot: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255, 255, 255, 0.1)',
	},
	sectionName: {
		flex: 1,
	},
	sectionValue: {
		flex: 1.5,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	buttons: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 'auto',
	},
	button: {
		marginTop: 16,
		paddingHorizontal: 16,
		flex: 1,
	},
	divider: {
		width: 16,
	},
});

export default memo(ChannelDetails);
