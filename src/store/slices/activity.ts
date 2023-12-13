import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { mergeActivityItems } from '../../utils/activity';
import {
	EActivityType,
	IActivityItem,
	TOnchainActivityItem,
} from '../types/activity';

export type TActivity = { items: IActivityItem[] };

export const initialActivityState: TActivity = { items: [] };

export const activitySlice = createSlice({
	name: 'activity',
	initialState: initialActivityState,
	reducers: {
		addActivityItem: (state, action: PayloadAction<IActivityItem>) => {
			state.items.unshift(action.payload);
		},
		addActivityItems: (state, action: PayloadAction<IActivityItem[]>) => {
			state.items.unshift(...action.payload);
		},
		updateActivityItems: (state, action: PayloadAction<IActivityItem[]>) => {
			state.items = mergeActivityItems(state.items, action.payload);
		},
		updateOnchainActivityItem: (
			state,
			action: PayloadAction<{
				id: string;
				data: Partial<TOnchainActivityItem>;
			}>,
		) => {
			state.items = state.items.map((item) => {
				const isOnchain = item.activityType === EActivityType.onchain;
				if (isOnchain && item.id === action.payload.id) {
					return { ...item, ...action.payload.data };
				} else {
					return item;
				}
			});
		},
		resetActivityState: () => initialActivityState,
	},
});

const { actions, reducer } = activitySlice;

export const {
	addActivityItem,
	addActivityItems,
	updateOnchainActivityItem,
	updateActivityItems,
	resetActivityState,
} = actions;

export default reducer;
