import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	TChannel as TLdkChannel,
	TBackupStateUpdate,
	TClaimableBalance,
} from '@synonymdev/react-native-ldk';

import { initialLightningState } from '../shapes/lightning';
import { EAvailableNetwork } from '../../utils/networks';
import { TWalletName } from '../types/wallet';
import {
	EChannelStatus,
	TChannels,
	TLdkAccountVersion,
	TLightningNodeVersion,
	TPendingPayment,
} from '../types/lightning';

export const lightningSlice = createSlice({
	name: 'lightning',
	initialState: initialLightningState,
	reducers: {
		updateLightningNodeId: (
			state,
			action: PayloadAction<{
				nodeId: string;
				selectedWallet: TWalletName;
				selectedNetwork: EAvailableNetwork;
			}>,
		) => {
			const { nodeId, selectedWallet, selectedNetwork } = action.payload;
			state.nodes[selectedWallet].nodeId[selectedNetwork] = nodeId;
		},
		updateLightningNodeVersion: (
			state,
			action: PayloadAction<TLightningNodeVersion>,
		) => {
			state.version = action.payload;
		},
		updateLightningChannels: (
			state,
			action: PayloadAction<{
				channels: TLdkChannel[];
				selectedWallet: TWalletName;
				selectedNetwork: EAvailableNetwork;
			}>,
		) => {
			const { channels, selectedWallet, selectedNetwork } = action.payload;

			// add status and createdAt (if new channel)
			const current = state.nodes[selectedWallet].channels[selectedNetwork];
			const updated = channels.map((channel) => {
				const existing = Object.values(current).find((c) => {
					return c.channel_id === channel.channel_id;
				});

				const status = channel.is_channel_ready
					? EChannelStatus.open
					: EChannelStatus.pending;

				return {
					...channel,
					status,
					createdAt: existing?.createdAt ?? new Date().getTime(),
				};
			});

			// LDK only returns open channels, so we need to compare with stored channels to find closed ones
			const closedChannels = Object.values(current)
				.filter((o) => !channels.some((i) => i.channel_id === o.channel_id))
				.map((channel) => {
					// Mark closed channels as such
					return {
						...channel,
						status: EChannelStatus.closed,
						is_channel_ready: false,
						is_usable: false,
					};
				});

			const allChannels = [...updated, ...closedChannels];
			// Channels come in unsorted, so we sort them by the added createdAt
			const sorted = allChannels.sort((a, b) => a.createdAt - b.createdAt);
			const channelsObject = sorted.reduce<TChannels>((acc, channel) => {
				acc[channel.channel_id] = channel;
				return acc;
			}, {});

			state.nodes[selectedWallet].channels[selectedNetwork] = channelsObject;
		},
		saveLightningPeer: (
			state,
			action: PayloadAction<{
				peer: string;
				selectedWallet: TWalletName;
				selectedNetwork: EAvailableNetwork;
			}>,
		) => {
			const { peer, selectedWallet, selectedNetwork } = action.payload;
			state.nodes[selectedWallet].peers[selectedNetwork].push(peer);
		},
		removeLightningPeer: (
			state,
			action: PayloadAction<{
				peer: string;
				selectedWallet: TWalletName;
				selectedNetwork: EAvailableNetwork;
			}>,
		) => {
			const { selectedWallet, selectedNetwork } = action.payload;
			let filtered = state.nodes[selectedWallet].peers[selectedNetwork].filter(
				(peer) => peer !== action.payload.peer,
			);
			state.nodes[selectedWallet].peers[selectedNetwork] = filtered;
		},
		updateClaimableBalances: (
			state,
			action: PayloadAction<{
				claimableBalances: TClaimableBalance[];
				selectedNetwork: EAvailableNetwork;
				selectedWallet: TWalletName;
			}>,
		) => {
			const { claimableBalances, selectedNetwork, selectedWallet } =
				action.payload;
			state.nodes[selectedWallet].claimableBalances[selectedNetwork] =
				claimableBalances;
		},
		updateBackupState: (
			state,
			action: PayloadAction<{
				backup: TBackupStateUpdate;
				selectedWallet: TWalletName;
				selectedNetwork: EAvailableNetwork;
			}>,
		) => {
			const { backup, selectedWallet, selectedNetwork } = action.payload;
			state.nodes[selectedWallet].backup[selectedNetwork] = backup;
		},
		updateLdkAccountVersion: (
			state,
			action: PayloadAction<TLdkAccountVersion>,
		) => {
			state.accountVersion = action.payload;
		},
		addPendingPayment: (state, action: PayloadAction<TPendingPayment>) => {
			state.pendingPayments.push(action.payload);
		},
		removePendingPayment: (state, action: PayloadAction<string>) => {
			const filtered = state.pendingPayments.filter(
				(payment) => payment.payment_hash !== action.payload,
			);
			state.pendingPayments = filtered;
		},
		resetLightningState: () => initialLightningState,
	},
});

const { actions, reducer } = lightningSlice;

export const {
	updateLightningNodeId,
	updateLightningNodeVersion,
	updateLightningChannels,
	saveLightningPeer,
	removeLightningPeer,
	updateClaimableBalances,
	updateBackupState,
	updateLdkAccountVersion,
	addPendingPayment,
	removePendingPayment,
	resetLightningState,
} = actions;

export default reducer;
