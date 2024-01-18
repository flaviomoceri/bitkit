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
import { promiseTimeout } from '../../../utils/helpers';
import { ldk } from '@synonymdev/react-native-ldk';

const BitcoinNetworkSelection = ({
	navigation,
}: SettingsScreenProps<'BitcoinNetworkSelection'>): ReactElement => {
	const { t } = useTranslation('settings');
	const selectedNetwork = useAppSelector(selectedNetworkSelector);
	const [loading, setLoading] = React.useState(false);

	const settingsListData: IListData[] = useMemo(
		() => [
			{
				data: Object.values(networkLabels).map((network) => {
					return {
						title: network.label,
						value: network.id === selectedNetwork,
						type: EItemType.button,
						loading,
						onPress: async (): Promise<void> => {
							setLoading(true);
							await promiseTimeout(2000, ldk.stop());
							// Wipe existing activity
							dispatch(resetActivityState());
							// Switch to new network.
							updateWallet({ selectedNetwork: network.id });
							await switchNetwork(network.id);
							setLoading(false);
							navigation.goBack();
						},
					};
				}),
			},
		],
		[loading, navigation, selectedNetwork],
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
