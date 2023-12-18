import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOnchainFees } from '../types/fees';

export type TFeesState = {
	onchain: IOnchainFees;
	override: boolean;
};

export const initialFeesState: TFeesState = {
	//On-chain fees in sats/vbyte
	onchain: {
		fast: 4, // 10-20 mins
		normal: 2, // 20-60 mins
		slow: 1, // 1-2 hrs
		minimum: 1,
		timestamp: Date.now() - 60 * 30 * 1000 - 1,
	},
	override: false,
};

export const feesSlice = createSlice({
	name: 'fees',
	initialState: initialFeesState,
	reducers: {
		updateOnchainFees: (state, action: PayloadAction<IOnchainFees>) => {
			state.onchain = Object.assign(state.onchain, action.payload);
		},
		updateOverrideFees: (state, action: PayloadAction<boolean>) => {
			state.override = action.payload;
		},
		resetFeesState: () => initialFeesState,
	},
});

const { actions, reducer } = feesSlice;

export const { updateOnchainFees, updateOverrideFees, resetFeesState } =
	actions;

export default reducer;
