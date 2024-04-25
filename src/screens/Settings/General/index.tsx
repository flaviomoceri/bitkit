import React, { memo, ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { EItemType, IListData, ItemData } from '../../../components/List';
import SettingsView from './../SettingsView';
import { useAppSelector } from '../../../hooks/redux';
import type { SettingsScreenProps } from '../../../navigation/types';
import { lastUsedTagsSelector } from '../../../store/reselect/metadata';
import { EUnit } from '../../../store/types/wallet';
import {
	unitSelector,
	selectedCurrencySelector,
	transactionSpeedSelector,
} from '../../../store/reselect/settings';

const GeneralSettings = ({
	navigation,
}: SettingsScreenProps<'GeneralSettings'>): ReactElement => {
	const { t } = useTranslation('settings');
	const lastUsedTags = useAppSelector(lastUsedTagsSelector);
	const selectedTransactionSpeed = useAppSelector(transactionSpeedSelector);
	const selectedCurrency = useAppSelector(selectedCurrencySelector);
	const selectedUnit = useAppSelector(unitSelector);

	const listData: IListData[] = useMemo(() => {
		const transactionSpeeds = {
			slow: t('fee.slow.value'),
			normal: t('fee.normal.value'),
			fast: t('fee.fast.value'),
			custom: t('fee.custom.value'),
		};

		const data: ItemData[] = [
			{
				title: t('general.currency_local'),
				value: selectedCurrency,
				type: EItemType.button,
				testID: 'CurrenciesSettings',
				onPress: (): void => navigation.navigate('CurrenciesSettings'),
			},
			{
				title: t('general.unit'),
				value:
					selectedUnit === EUnit.BTC
						? t('general.unit_bitcoin')
						: selectedCurrency,
				type: EItemType.button,
				testID: 'UnitSettings',
				onPress: (): void => navigation.navigate('UnitSettings'),
			},
			{
				title: t('general.speed'),
				value: transactionSpeeds[selectedTransactionSpeed],
				type: EItemType.button,
				testID: 'TransactionSpeedSettings',
				onPress: (): void => navigation.navigate('TransactionSpeedSettings'),
			},
			{
				title: t('widgets.nav_title'),
				type: EItemType.button,
				testID: 'WidgetsSettings',
				onPress: (): void => navigation.navigate('WidgetSettings'),
			},
		];

		if (lastUsedTags.length) {
			data.push({
				title: t('general.tags'),
				type: EItemType.button,
				testID: 'TagsSettings',
				onPress: (): void => navigation.navigate('TagsSettings'),
			});
		}
		return [{ data }];
	}, [
		lastUsedTags,
		selectedCurrency,
		selectedUnit,
		selectedTransactionSpeed,
		navigation,
		t,
	]);

	return <SettingsView title={t('general_title')} listData={listData} />;
};

export default memo(GeneralSettings);
