import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { TActivity } from '../slices/activity';
import { IActivityItem } from '../types/activity';

const activityState = (state: RootState): TActivity => state.activity;

export const activityItemsState = (state: RootState): IActivityItem[] => {
	return state.activity.items;
};

export const activityItemsSelector = createSelector(
	[activityState],
	(activity): IActivityItem[] => activity.items,
);

/**
 * Returns an individual activity item by the provided id.
 * @param {RootState} state
 * @param {string} activityId
 * @returns {string}
 */
export const activityItemSelector = createSelector(
	[
		activityItemsState,
		(_activityItems, activityId: string): string => activityId,
	],
	(activityItems, activityId): IActivityItem | undefined => {
		return activityItems.find((item) => item.id === activityId);
	},
);
