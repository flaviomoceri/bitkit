import React, { ReactElement, memo, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import BottomSheetNavigationHeader from '../../../components/BottomSheetNavigationHeader';
import GradientView from '../../../components/GradientView';
import type { LNURLPayProps } from '../../../navigation/types';
import SafeAreaInset from '../../../components/SafeAreaInset';
import { closeSheet } from '../../../store/slices/ui';
import {
	selectedNetworkSelector,
	selectedWalletSelector,
} from '../../../store/reselect/wallet';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { handleLnurlPay } from '../../../utils/lnurl';
import { sleep } from '../../../utils/helpers';
import { processInputData } from '../../../utils/scanner';

const Confirm = ({ route }: LNURLPayProps<'Confirm'>): ReactElement => {
	const { t } = useTranslation('wallet');
	const { amount, pParams } = route.params;
	const dispatch = useAppDispatch();
	const selectedWallet = useAppSelector(selectedWalletSelector);
	const selectedNetwork = useAppSelector(selectedNetworkSelector);

	useEffect(() => {
		(async (): Promise<void> => {
			dispatch(closeSheet('sendNavigation'));
			await sleep(300);
			const invoice = await handleLnurlPay({
				params: pParams,
				amountSats: amount,
				selectedWallet,
				selectedNetwork,
			});

			if (invoice.isErr()) {
				dispatch(closeSheet('lnurlPay'));
				return;
			}

			dispatch(closeSheet('lnurlPay'));
			await sleep(300);
			processInputData({
				data: invoice.value,
				selectedWallet,
				selectedNetwork,
			});
		})();
	}, [amount, pParams, selectedNetwork, selectedWallet, dispatch]);

	return (
		<>
			<GradientView style={styles.container}>
				<BottomSheetNavigationHeader
					title={t('lnurl_p_title')}
					displayBackButton={false}
				/>
				<View style={styles.content}>
					<ActivityIndicator size="large" />
				</View>
				<SafeAreaInset type="bottom" minPadding={16} />
			</GradientView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
		alignContent: 'center',
		justifyContent: 'center',
	},
});

export default memo(Confirm);
