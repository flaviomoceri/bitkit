import React, { memo, ReactElement, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import SettingsView from './../SettingsView';
import Dialog from '../../../components/Dialog';
import Button from '../../../components/Button';
import { EItemType, IListData } from '../../../components/List';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { resetHiddenTodos } from '../../../store/actions/todos';
import { updateSettings } from '../../../store/slices/settings';
import { showSuggestionsSelector } from '../../../store/reselect/settings';
import { SettingsScreenProps } from '../../../navigation/types';

const SuggestionsSettings = ({
	navigation,
}: SettingsScreenProps<'SuggestionsSettings'>): ReactElement => {
	const { t } = useTranslation('settings');
	const dispatch = useAppDispatch();
	const showSuggestions = useAppSelector(showSuggestionsSelector);
	const [showDialog, setShowDialog] = useState(false);

	const settingsListData: IListData[] = useMemo(
		() => [
			{
				title: t('general.suggestions'),
				data: [
					{
						title: t('general.suggestions_display'),
						enabled: showSuggestions,
						type: EItemType.switch,
						onPress: (): void => {
							dispatch(updateSettings({ showSuggestions: !showSuggestions }));
						},
						testID: 'DisplaySuggestions',
					},
				],
			},
		],
		[showSuggestions, t, dispatch],
	);

	return (
		<>
			<SettingsView
				title={t('general.suggestions')}
				listData={settingsListData}
				showBackNavigation={true}
				childrenPosition="bottom">
				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						text={t('general.suggestions_reset')}
						size="large"
						testID="ResetSuggestions"
						onPress={(): void => setShowDialog(true)}
					/>
				</View>
			</SettingsView>

			<Dialog
				visible={showDialog}
				title={t('general.reset_title')}
				description={t('general.reset_desc')}
				confirmText={t('general.reset_confirm')}
				onCancel={(): void => {
					setShowDialog(false);
				}}
				onConfirm={(): void => {
					resetHiddenTodos();
					setShowDialog(false);
					navigation.navigate('Wallet');
				}}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		paddingHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 'auto',
	},
	button: {
		flex: 1,
	},
});

export default memo(SuggestionsSettings);
