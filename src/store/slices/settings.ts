import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { defaultSettingsShape } from '../shapes/settings';
import {
	ETransactionSpeed,
	ICustomElectrumPeer,
	TChest,
	TCoinSelectPreference,
	TCustomElectrumPeers,
	TReceiveOption,
	TTheme,
} from '../types/settings';
import { TAvailableNetworks } from '../../utils/networks';
import { EUnit } from '../types/wallet';

export type TSettings = {
	enableAutoReadClipboard: boolean;
	enableSendAmountWarning: boolean;
	pin: boolean;
	pinOnLaunch: boolean;
	pinOnIdle: boolean;
	pinForPayments: boolean;
	biometrics: boolean;
	rbf: boolean;
	theme: TTheme;
	unit: EUnit;
	customElectrumPeers: TCustomElectrumPeers;
	rapidGossipSyncUrl: string;
	selectedCurrency: string;
	selectedLanguage: string;
	coinSelectAuto: boolean;
	coinSelectPreference: TCoinSelectPreference;
	receivePreference: TReceiveOption[];
	enableOfflinePayments: boolean;
	showSuggestions: boolean;
	transactionSpeed: ETransactionSpeed;
	customFeeRate: number;
	hideBalance: boolean;
	hideOnboardingMessage: boolean;
	hideBeta: boolean;
	enableDevOptions: boolean;
	treasureChests: TChest[];
	webRelay: string;
};

export const initialSettingsState: TSettings = defaultSettingsShape;

export const settingsSlice = createSlice({
	name: 'settings',
	initialState: initialSettingsState,
	reducers: {
		updateSettings: (state, action: PayloadAction<Partial<TSettings>>) => {
			state = Object.assign(state, action.payload);
		},
		addElectrumPeer: (
			state,
			action: PayloadAction<{
				peer: ICustomElectrumPeer;
				network: TAvailableNetworks;
			}>,
		) => {
			state.customElectrumPeers[action.payload.network].unshift(
				action.payload.peer,
			);
		},
		addTreasureChest: (state, action: PayloadAction<TChest>) => {
			state.treasureChests.push(action.payload);
		},
		updateTreasureChest: (state, action: PayloadAction<TChest>) => {
			const { chestId } = action.payload;
			const current = state.treasureChests.find((c) => c.chestId === chestId);
			const updatedChest = { ...current, ...action.payload };

			// replace old data while keeping the order
			state.treasureChests = state.treasureChests.map((chest) => {
				return chest === current ? updatedChest : chest;
			});
		},
		resetSettingsState: () => initialSettingsState,
	},
});

const { actions, reducer } = settingsSlice;

export const {
	updateSettings,
	addElectrumPeer,
	addTreasureChest,
	updateTreasureChest,
	resetSettingsState,
} = actions;

export default reducer;
