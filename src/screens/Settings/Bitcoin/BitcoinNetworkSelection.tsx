import React, { memo, ReactElement, useMemo } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { ldk } from '@synonymdev/react-native-ldk';

import { EItemType, IListData } from '../../../components/List';
import SettingsView from '../SettingsView';
import {
	updateAddressIndexes,
	updateWallet,
} from '../../../store/actions/wallet';
import { dispatch } from '../../../store/helpers';
import { updateActivityList } from '../../../store/utils/activity';
import { resetActivityState } from '../../../store/slices/activity';
import { updateOnchainFeeEstimates } from '../../../store/utils/fees';
import { selectedNetworkSelector } from '../../../store/reselect/wallet';
import { connectToElectrum } from '../../../utils/wallet/electrum';
import { startWalletServices } from '../../../utils/startup';
import { setupLdk } from '../../../utils/lightning';
import { networkLabels } from '../../../utils/networks';
import {
	getCurrentWallet,
	getSelectedAddressType,
} from '../../../utils/wallet';
import { SettingsScreenProps } from '../../../navigation/types';

const BitcoinNetworkSelection = ({
	navigation,
}: SettingsScreenProps<'BitcoinNetworkSelection'>): ReactElement => {
	const { t } = useTranslation('settings');
	const selectedNetwork = useAppSelector(selectedNetworkSelector);

	const settingsListData: IListData[] = useMemo(
		() => [
			{
				data: Object.values(networkLabels).map((network) => {
					return {
						title: network.label,
						value: network.id === selectedNetwork,
						type: EItemType.button,
						onPress: async (): Promise<void> => {
							navigation.goBack();
							await ldk.stop();
							// Wipe existing activity
							dispatch(resetActivityState());
							// Switch to new network.
							updateWallet({ selectedNetwork: network.id });
							// Grab the selectedWallet.
							const { selectedWallet } = getCurrentWallet({
								selectedNetwork: network.id,
							});
							const addressType = getSelectedAddressType({
								selectedNetwork: network.id,
								selectedWallet,
							});
							// Connect to a Electrum Server on the network
							await connectToElectrum({ selectedNetwork: network.id });
							// Generate addresses if none exist for the newly selected wallet and network.
							await updateAddressIndexes({
								selectedWallet,
								selectedNetwork: network.id,
								addressType,
							});
							// Switching networks requires us to reset LDK.
							await setupLdk({ selectedWallet, selectedNetwork });
							// Start wallet services with the newly selected network.
							await startWalletServices({ selectedNetwork: network.id });
							await updateOnchainFeeEstimates({
								selectedNetwork: network.id,
								forceUpdate: true,
							});
							updateActivityList();
						},
					};
				}),
			},
		],
		[navigation, selectedNetwork],
	);

	return (
		<SettingsView
			title={t('adv.bitcoin_network')}
			listData={settingsListData}
			showBackNavigation={true}
		/>
	);
};

export default memo(BitcoinNetworkSelection);
