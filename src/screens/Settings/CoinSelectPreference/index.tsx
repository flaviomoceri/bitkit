import React, { memo, ReactElement, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useTranslation } from 'react-i18next';

import { EItemType, IListData } from '../../../components/List';
import SettingsView from '../SettingsView';
import { updateSettings } from '../../../store/slices/settings';
import {
	coinSelectAutoSelector,
	coinSelectPreferenceSelector,
} from '../../../store/reselect/settings';

const CoinSelectSettings = (): ReactElement => {
	const { t } = useTranslation('settings');
	const dispatch = useAppDispatch();
	const selectedAutoPilot = useAppSelector(coinSelectAutoSelector);
	const coinSelectPreference = useAppSelector(coinSelectPreferenceSelector);

	const settingsListData: IListData[] = useMemo(
		() => [
			{
				title: t('adv.cs_method'),
				data: [
					{
						title: t('adv.cs_manual'),
						value: !selectedAutoPilot,
						type: EItemType.button,
						onPress: (): void => {
							dispatch(updateSettings({ coinSelectAuto: false }));
						},
					},
					{
						title: t('adv.cs_auto'),
						value: selectedAutoPilot,
						type: EItemType.button,
						onPress: (): void => {
							dispatch(updateSettings({ coinSelectAuto: true }));
						},
					},
				],
			},
			{
				title: selectedAutoPilot ? t('adv.cs_auto_mode') : '',
				data: [
					{
						title: t('adv.cs_consolidate'),
						value: coinSelectPreference === 'consolidate',
						type: EItemType.button,
						hide: !selectedAutoPilot,
						onPress: (): void => {
							dispatch(
								updateSettings({
									coinSelectAuto: true,
									coinSelectPreference: 'consolidate',
								}),
							);
						},
					},
					{
						title: t('adv.cs_max'),
						value: coinSelectPreference === 'large',
						type: EItemType.button,
						hide: !selectedAutoPilot,
						onPress: (): void => {
							dispatch(
								updateSettings({
									coinSelectAuto: true,
									coinSelectPreference: 'large',
								}),
							);
						},
					},
					{
						title: t('adv.cs_min'),
						value: coinSelectPreference === 'small',
						type: EItemType.button,
						hide: !selectedAutoPilot,
						onPress: (): void => {
							dispatch(
								updateSettings({
									coinSelectAuto: true,
									coinSelectPreference: 'small',
								}),
							);
						},
					},
				],
			},
		],
		[selectedAutoPilot, coinSelectPreference, t, dispatch],
	);

	return (
		<SettingsView
			title={t('adv.coin_selection')}
			listData={settingsListData}
			showBackNavigation={true}
		/>
	);
};

export default memo(CoinSelectSettings);
