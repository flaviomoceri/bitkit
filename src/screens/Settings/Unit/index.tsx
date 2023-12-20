import React, { memo, ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { EItemType, IListData } from '../../../components/List';
import SettingsView from '../SettingsView';
import { updateSettings } from '../../../store/slices/settings';
import {
	UnitBitcoinIcon,
	UnitSatoshiIcon,
	UnitFiatIcon,
} from '../../../styles/icons';
import {
	primaryUnitSelector,
	selectedCurrencySelector,
} from '../../../store/reselect/settings';
import { EUnit } from '../../../store/types/wallet';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useCurrency } from '../../../hooks/displayValues';
import type { SettingsScreenProps } from '../../../navigation/types';

const UnitSettings = ({
	navigation,
}: SettingsScreenProps<'UnitSettings'>): ReactElement => {
	const { fiatSymbol } = useCurrency();
	const { t } = useTranslation('settings');
	const dispatch = useAppDispatch();
	const selectedUnit = useAppSelector(primaryUnitSelector);
	const selectedCurrency = useAppSelector(selectedCurrencySelector);

	const currencyListData: IListData[] = useMemo(() => {
		const units = [
			{
				label: t('general.unit_bitcoin'),
				unit: EUnit.BTC,
				labelExample: '(0.00001000)',
				Icon: UnitBitcoinIcon,
			},
			{
				label: t('general.unit_satoshis'),
				unit: EUnit.satoshi,
				labelExample: '(1 000)',
				Icon: UnitSatoshiIcon,
			},
			{
				label: selectedCurrency,
				unit: EUnit.fiat,
				labelExample: `(${fiatSymbol}1,000)`,
				Icon: UnitFiatIcon,
			},
		];

		return [
			{
				title: t('general.unit_display'),
				data: units.map((unit) => ({
					title: `${unit.label} ${unit.labelExample}`,
					value: unit.unit === selectedUnit,
					type: EItemType.button,
					Icon: unit.Icon,
					onPress: (): void => {
						navigation.goBack();
						dispatch(updateSettings({ unit: unit.unit }));
					},
					testID: unit.label,
				})),
			},
		];
	}, [selectedUnit, selectedCurrency, fiatSymbol, navigation, t, dispatch]);

	return (
		<SettingsView
			title={t('general.unit_title')}
			listData={currencyListData}
			showBackNavigation={true}
		/>
	);
};

export default memo(UnitSettings);
