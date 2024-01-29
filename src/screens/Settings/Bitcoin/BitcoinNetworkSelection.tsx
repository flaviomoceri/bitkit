import React, { memo, ReactElement, useMemo } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { useTranslation } from 'react-i18next';

import { EItemType, IListData } from '../../../components/List';
import SettingsView from '../SettingsView';
import { selectedNetworkSelector } from '../../../store/reselect/wallet';
import { networkLabels } from '../../../utils/networks';
import { switchNetwork } from '../../../utils/wallet';
import { SettingsScreenProps } from '../../../navigation/types';

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
