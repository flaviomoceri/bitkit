// NOTE: 'receive' slice is not persisted to storage

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICJitEntry } from '@synonymdev/blocktank-lsp-http-client';
import { v4 as uuidv4 } from 'uuid';

export type TReceiveState = {
	id: string; // uuid used to identify the invoice 'session'
	amount: number;
	numberPadText: string;
	message: string;
	tags: string[];
	jitOrder: ICJitEntry | null;
};

export const initialReceiveState: TReceiveState = {
	id: '',
	amount: 0,
	numberPadText: '',
	message: '',
	tags: [],
	jitOrder: null,
};

export const receiveSlice = createSlice({
	name: 'receive',
	initialState: initialReceiveState,
	reducers: {
		updateInvoice: (state, action: PayloadAction<Partial<TReceiveState>>) => {
			const tags = action.payload.tags ?? [];
			return {
				...state,
				...action.payload,
				tags: [...new Set([...state.tags, ...tags])],
			};
		},
		removeInvoiceTag: (state, action: PayloadAction<string>) => {
			state.tags = state.tags.filter((tag) => tag !== action.payload);
		},
		resetInvoice: () => ({ ...initialReceiveState, id: uuidv4() }),
	},
});

const { actions, reducer } = receiveSlice;

export const { updateInvoice, removeInvoiceTag, resetInvoice } = actions;

export default reducer;
