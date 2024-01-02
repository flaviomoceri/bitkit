import React, { memo, ReactElement, useMemo } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { useTranslation } from 'react-i18next';

import { EItemType, IListData } from '../../../components/List';
import SettingsView from '../SettingsView';
import { updateWallet } from '../../../store/actions/wallet';
import { dispatch } from '../../../store/helpers';
import { resetActivityState } from '../../../store/slices/activity';
import { selectedNetworkSelector } from '../../../store/reselect/wallet';
import { networkLabels } from '../../../utils/networks';
import { switchNetwork } from '../../../utils/wallet';
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
							//await ldk.stop();
							// Wipe existing activity
							dispatch(resetActivityState());
							// Switch to new network.
							updateWallet({ selectedNetwork: network.id });
							await switchNetwork(network.id);
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
