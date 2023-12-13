import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IFees, IOnchainFees } from '../types/fees';

const feesState = (state: RootState): IFees => state.fees;

export const onChainFeesSelector = createSelector(
	[feesState],
	(fees): IOnchainFees => fees.onchain,
);

export const overrideFeeSelector = createSelector(
	[feesState],
	(fees): boolean => fees.override,
);
