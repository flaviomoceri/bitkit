import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';
import { TWalletName } from '../types/wallet';
import { IChecksShape, TStorageWarning } from '../types/checks';
import { EAvailableNetwork } from '../../utils/networks';

export const checksState = (state: RootState): IChecksShape => state.checks;

/**
 * Returns the warnings for a given wallet.
 */
export const warningsSelector = createSelector(
	[
		checksState,
		(_checks, selectedWallet: TWalletName): TWalletName => selectedWallet,
		(_checks, _selectedWallet, selectedNetwork): EAvailableNetwork =>
			selectedNetwork,
	],
	(checks, selectedWallet, selectedNetwork): TStorageWarning[] =>
		checks[selectedWallet].warnings[selectedNetwork],
);
