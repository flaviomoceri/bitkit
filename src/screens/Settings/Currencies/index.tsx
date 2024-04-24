import React, { memo, ReactElement, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useTranslation } from 'react-i18next';

import { EItemType, IListData } from '../../../components/List';
import SettingsView from '../SettingsView';
import { mostUsedExchangeTickers } from '../../../utils/exchange-rate';
import { updateSettings } from '../../../store/slices/settings';
import { exchangeRatesSelector } from '../../../store/reselect/wallet';
import { selectedCurrencySelector } from '../../../store/reselect/settings';
import type { SettingsScreenProps } from '../../../navigation/types';

const CurrenciesSettings = ({
	navigation,
}: SettingsScreenProps<'CurrenciesSettings'>): ReactElement => {
	const { t } = useTranslation('settings');
	const dispatch = useAppDispatch();
	const exchangeRates = useAppSelector(exchangeRatesSelector);
	const selectedCurrency = useAppSelector(selectedCurrencySelector);

	const currencyListData: IListData[] = useMemo(() => {
		const onSetCurrency = (currency: string): void => {
			dispatch(updateSettings({ selectedCurrency: currency }));
		};

		return [
			{
				title: t('general.currency_most_used'),
				data: Object.values(mostUsedExchangeTickers).map((ticker) => {
					return {
						title: `${ticker.quote} (${ticker.currencySymbol})`,
						value: selectedCurrency === ticker.quote,
						type: EItemType.button,
						onPress: (): void => {
							navigation.goBack();
							onSetCurrency(ticker.quote);
						},
					};
				}),
			},
			{
				title: t('general.currency_other'),
				data: Object.keys(exchangeRates)
					.sort()
					.map((ticker) => ({
						title: ticker,
						value: selectedCurrency === ticker,
						type: EItemType.button,
						onPress: (): void => {
							navigation.goBack();
							onSetCurrency(ticker);
						},
					})),
			},
		];
	}, [selectedCurrency, exchangeRates, navigation, t, dispatch]);

	return (
		<SettingsView
			title={t('general.currency_local_title')}
			listData={currencyListData}
			showSearch={true}
			footerText={t('general.currency_footer')}
		/>
	);
};

export default memo(CurrenciesSettings);
