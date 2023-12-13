import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const widgetsState = (state: RootState): TWidgetsState => state.widgets;

/**
 * Returns all widgets.
 */
export const widgetsSelector = createSelector(
	[widgetsState],
	(widgets): IWidgets => widgets.widgets,
);

/**
 * Return specified widget by url.
 */
export const widgetSelector = createSelector(
	[widgetsState, (_widgets, url: string): string => url],
	(widgets, url): IWidget | undefined => widgets.widgets[url],
);

export const widgetsOrderSelector = createSelector(
	[widgetsState],
	(widgets) => widgets.sortOrder,
);

export const onboardedWidgetsSelector = createSelector(
	[widgetsState],
	(widgets): boolean => widgets.onboardedWidgets,
);
