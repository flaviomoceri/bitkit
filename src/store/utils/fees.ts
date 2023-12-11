import { ok, err, Result } from '@synonymdev/result';

import { dispatch, getFeesStore } from '../helpers';
import { updateOnchainFees } from '../slices/fees';
import { getFeeEstimates } from '../../utils/wallet/transactions';
import { EAvailableNetwork } from '../../utils/networks';

export const REFRESH_INTERVAL = 60 * 30; // in seconds, 30 minutes

export const updateOnchainFeeEstimates = async ({
	selectedNetwork,
	forceUpdate = false,
}: {
	selectedNetwork: EAvailableNetwork;
	forceUpdate?: boolean;
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

	const feeEstimates = await getFeeEstimates(selectedNetwork);
	if (feeEstimates.isErr()) {
		return err(feeEstimates.error);
	}

	dispatch(updateOnchainFees(feeEstimates.value));

	return ok('Successfully updated on-chain fee estimates.');
};
