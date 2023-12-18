import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialTodosState } from '../shapes/todos';
import { TTodoType } from '../types/todos';

export const todosSlice = createSlice({
	name: 'todos',
	initialState: initialTodosState,
	reducers: {
		hideTodo: (state, action: PayloadAction<TTodoType>) => {
			state.hide[action.payload] = +new Date();
		},
		resetHiddenTodos: (state) => {
			state.hide = {};
		},
		channelsNotificationsShown: (state, action: PayloadAction<string[]>) => {
			// remove everything older than 1 day
			const newChannelsNotifications = Object.keys(
				state.newChannelsNotifications,
			).reduce((acc, key) => {
				if (
					state.newChannelsNotifications[key] <
					+new Date() - 24 * 60 * 60 * 1000
				) {
					return acc;
				}

				return {
					...acc,
					[key]: state.newChannelsNotifications[key],
				};
			}, {});

			// mark new notifications as shown
			action.payload.forEach((channelId: string) => {
				newChannelsNotifications[channelId] = +new Date();
			});

			state.newChannelsNotifications = newChannelsNotifications;
		},
		resetTodosState: () => initialTodosState,
	},
});

const { actions, reducer } = todosSlice;

export const {
	hideTodo,
	resetHiddenTodos,
	channelsNotificationsShown,
	resetTodosState,
} = actions;

export default reducer;
