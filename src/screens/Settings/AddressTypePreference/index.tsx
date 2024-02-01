import React, { memo, ReactElement, useMemo } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { useTranslation } from 'react-i18next';

import { EItemType, IListData } from '../../../components/List';
import SettingsView from '../SettingsView';
import { refreshWallet } from '../../../utils/wallet';
import { updateSelectedAddressType } from '../../../store/actions/wallet';
import { addressTypeSelector } from '../../../store/reselect/wallet';
import { addressTypes } from '../../../store/shapes/wallet';
import type { SettingsScreenProps } from '../../../navigation/types';
import { enableDevOptionsSelector } from '../../../store/reselect/settings';
import { EAddressType } from 'beignet';

const AddressTypeSettings = ({
	navigation,
}: SettingsScreenProps<'AddressTypePreference'>): ReactElement => {
	const { t } = useTranslation('settings');
	const selectedAddressType = useAppSelector(addressTypeSelector);
	const isDeveloperMode = useAppSelector(enableDevOptionsSelector);

	const availableAddressTypes = useMemo(() => {
		if (isDeveloperMode) {
			return Object.values(addressTypes);
		}
		return Object.values(addressTypes).filter(
			(addressType) => addressType.type !== EAddressType.p2tr,
		);
	}, [isDeveloperMode]);

	const listData: IListData[] = useMemo(
		() => [
			{
				title: t('adv.address_type'),
				data: Object.values(availableAddressTypes).map((addressType) => ({
					type: EItemType.button,
					title: `${addressType.name} ${addressType.example}`,
					subtitle: addressType.description,
					value: addressType.type === selectedAddressType,
					useCheckmark: true,
					onPress: async (): Promise<void> => {
						navigation.goBack();
						await updateSelectedAddressType({ addressType: addressType.type });
						await refreshWallet({ lightning: false, onchain: true });
					},
					testID: addressType.type,
				})),
			},
		],
		[t, availableAddressTypes, selectedAddressType, navigation],
	);

	return (
		<SettingsView
			title={t('adv.address_type')}
			listData={listData}
			showBackNavigation={true}
		/>
	);
};

export default memo(AddressTypeSettings);
