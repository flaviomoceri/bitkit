import { ok, err, Result } from '@synonymdev/result';

import { dispatch, getFeesStore } from '../helpers';
import { updateOnchainFees } from '../slices/fees';
import { getFeeEstimates } from '../../utils/wallet/transactions';
import { EAvailableNetwork } from '../../utils/networks';
import { getSelectedNetwork } from '../../utils/wallet';
import { IOnchainFees } from 'beignet';

export const REFRESH_INTERVAL = 60 * 30; // in seconds, 30 minutes

export const updateOnchainFeeEstimates = async ({
	selectedNetwork = getSelectedNetwork(),
	forceUpdate = false,
	feeEstimates,
}: {
	selectedNetwork: EAvailableNetwork;
	forceUpdate?: boolean;
	feeEstimates?: IOnchainFees;
}): Promise<Result<string>> => {
	const feesStore = getFeesStore();
	const timestamp = feesStore.onchain.timestamp;
	const difference = Math.floor((Date.now() - timestamp) / 1000);

	if (feesStore.override) {
		return ok('On-chain fee estimates are overridden.');
	}

	if (!forceUpdate && difference < REFRESH_INTERVAL) {
		return ok('On-chain fee estimates are up to date.');
	}

	if (!feeEstimates) {
		const feeEstimatesRes = await getFeeEstimates(selectedNetwork);
		if (feeEstimatesRes.isErr()) {
			return err(feeEstimatesRes.error);
		}
		feeEstimates = feeEstimatesRes.value;
	}

	dispatch(updateOnchainFees(feeEstimates));

	return ok('Successfully updated on-chain fee estimates.');
};
