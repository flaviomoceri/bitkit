import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { TFeesState } from '../slices/fees';
import { IOnchainFees } from 'beignet';

const feesState = (state: RootState): TFeesState => state.fees;

export const onChainFeesSelector = createSelector(
	[feesState],
	(fees): IOnchainFees => fees.onchain,
);

export const overrideFeeSelector = createSelector(
	[feesState],
	(fees): boolean => fees.override,
);
