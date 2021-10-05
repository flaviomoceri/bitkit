import React, {
	memo,
	ReactElement,
	useCallback,
	useEffect,
	useMemo,
} from 'react';
import { StyleSheet } from 'react-native';
import {
	Text02M,
	TextInput,
	TouchableOpacity,
	View,
} from '../styles/components';
import { updateOnChainTransaction } from '../store/actions/wallet';
import AdjustValue from './AdjustValue';
import { useSelector } from 'react-redux';
import Store from '../store/types';
import {
	EOutput,
	IOnChainTransactionData,
	IOutput,
} from '../store/types/wallet';
import {
	adjustFee,
	getTotalFee,
	getTransactionOutputValue,
	sendMax,
	updateAmount,
	updateMessage,
} from '../utils/wallet/transactions';
import { useBalance, useTransactionDetails } from '../hooks/transaction';
import Card from './Card';
import { pasteIcon } from '../assets/icons/wallet';
import { SvgXml } from 'react-native-svg';
import colors from '../styles/colors';

const SendForm = ({
	index = 0,
	displayMessage = true,
	displayFee = true,
}): ReactElement => {
	const selectedWallet = useSelector(
		(store: Store) => store.wallet.selectedWallet,
	);
	const selectedNetwork = useSelector(
		(store: Store) => store.wallet.selectedNetwork,
	);
	const transaction = useTransactionDetails();
	const max = useMemo(() => transaction.max, [transaction?.max]);

	const balance = useBalance();

	useEffect(() => {
		if (!transaction?.outputs?.length) {
			updateOnChainTransaction({
				selectedWallet,
				selectedNetwork,
				transaction: {
					outputs: [EOutput],
				},
			}).then();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Handles balance changes from UTXO updates.
	useEffect(() => {
		if (transaction?.rbf) {
			return;
		}
		const fee = transaction?.fee ?? 256;

		if (value) {
			const newValue =
				balance > 0 && value + getFee > balance ? balance - fee : 0;
			if (newValue + getFee > balance && max) {
				// Disable max.
				updateOnChainTransaction({
					selectedNetwork,
					selectedWallet,
					transaction: { max: false },
				});
			}
			updateAmount({
				amount: newValue.toString(),
				selectedNetwork,
				selectedWallet,
				index,
			});
		}

		if (max) {
			const totalTransactionValue = getOutputsValue();
			const totalNewAmount = totalTransactionValue + fee;

			if (totalNewAmount <= balance) {
				const _transaction: IOnChainTransactionData = {
					fee,
					outputs: [{ address, value: balance - fee, index }],
				};
				updateOnChainTransaction({
					selectedWallet,
					selectedNetwork,
					transaction: _transaction,
				}).then();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [balance]);

	/**
	 * Returns the current output by index.
	 */
	const getOutput = useMemo((): IOutput | undefined => {
		try {
			return transaction.outputs?.[index];
		} catch {
			return { address: '', value: 0 };
		}
	}, [index, transaction?.outputs]);

	/**
	 * Returns the selected satsPerByte for the given transaction.
	 */
	const satsPerByte = useMemo((): number => {
		try {
			return transaction?.satsPerByte || 1;
		} catch (e) {
			return 1;
		}
	}, [transaction?.satsPerByte]);

	/**
	 * Returns the current address to send funds to.
	 */
	const address = useMemo((): string => {
		try {
			return getOutput?.address || '';
		} catch (e) {
			console.log(e);
			return '';
		}
	}, [getOutput?.address]);

	/**
	 * Returns the value of the current output.
	 */
	const value = useMemo((): number => {
		try {
			return getOutput?.value || 0;
		} catch (e) {
			return 0;
		}
	}, [getOutput?.value]);

	/**
	 * Returns the total value of all outputs for the given transaction
	 */
	const getOutputsValue = useCallback((): number => {
		try {
			return getTransactionOutputValue({
				selectedWallet,
				selectedNetwork,
			});
		} catch {
			return 0;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transaction.outputs, selectedNetwork, selectedWallet]);

	/**
	 * Returns a message, if any, of the current transaction.
	 */
	const message = useMemo(() => {
		return transaction.message || '';
	}, [transaction.message]);

	/**
	 * Returns the total calculated fee given the current satsPerByte selected and message.
	 */
	const getFee = useMemo((): number => {
		const totalFee = getTotalFee({
			satsPerByte,
			message,
			selectedWallet,
			selectedNetwork,
		});
		return totalFee || 256;
	}, [message, satsPerByte, selectedWallet, selectedNetwork]);

	const increaseFee = useCallback(() => {
		adjustFee({ selectedWallet, selectedNetwork, adjustBy: 1 });
	}, [selectedNetwork, selectedWallet]);
	const decreaseFee = useCallback(() => {
		adjustFee({ selectedWallet, selectedNetwork, adjustBy: -1 });
	}, [selectedNetwork, selectedWallet]);

	return (
		<View color="transparent" style={styles.container}>
			<Card style={styles.card} color={'gray336'}>
				<>
					<View style={styles.col1}>
						<View color="transparent" style={styles.titleContainer}>
							<Text02M>To</Text02M>
							<TextInput
								style={styles.textInput}
								multiline={true}
								textAlignVertical={'center'}
								underlineColorAndroid="transparent"
								placeholder="Address"
								placeholderTextColor={colors.gray2}
								autoCapitalize="none"
								autoCompleteType="off"
								autoCorrect={false}
								onChangeText={(txt): void => {
									updateOnChainTransaction({
										selectedWallet,
										selectedNetwork,
										transaction: {
											outputs: [{ address: txt, value, index }],
										},
									}).then();
								}}
								value={address}
								onSubmitEditing={(): void => {}}
							/>
						</View>
					</View>

					<View color="transparent" style={styles.col2}>
						<SvgXml xml={pasteIcon()} width={20} height={20} />
					</View>
				</>
			</Card>

			<Card style={styles.card} color={'gray336'}>
				<>
					<View style={styles.col1}>
						<View color="transparent" style={styles.titleContainer}>
							<Text02M>Amount</Text02M>
							<TextInput
								style={styles.textInput}
								multiline={true}
								textAlignVertical={'center'}
								underlineColorAndroid="transparent"
								placeholderTextColor={colors.gray2}
								editable={!max}
								placeholder="Amount (sats)"
								keyboardType="number-pad"
								autoCapitalize="none"
								autoCompleteType="off"
								autoCorrect={false}
								onChangeText={(txt): void => {
									updateAmount({
										amount: txt,
										selectedWallet,
										selectedNetwork,
										index,
									});
								}}
								value={Number(value) ? value.toString() : ''}
								onSubmitEditing={(): void => {}}
							/>
						</View>
					</View>

					<View color="transparent" style={styles.col2}>
						<TouchableOpacity
							style={styles.button}
							color={max ? 'surface' : 'onSurface'}
							text="Max"
							disabled={balance <= 0}
							onPress={sendMax}>
							<Text02M>Max</Text02M>
						</TouchableOpacity>
					</View>
				</>
			</Card>

			{!!displayMessage && (
				<Card style={styles.card} color={'gray336'}>
					<>
						<View style={styles.col1}>
							<View color="transparent" style={styles.titleContainer}>
								<Text02M>Add Note</Text02M>
								<TextInput
									style={styles.textInput}
									textAlignVertical={'center'}
									placeholderTextColor={colors.gray2}
									editable={!max}
									multiline
									underlineColorAndroid="transparent"
									placeholder="Message (OP_RETURN)"
									autoCapitalize="none"
									autoCompleteType="off"
									autoCorrect={false}
									onChangeText={(txt): void => {
										updateMessage({
											message: txt,
											selectedWallet,
											selectedNetwork,
											index,
										});
									}}
									value={message}
									onSubmitEditing={(): void => {}}
								/>
							</View>
						</View>
					</>
				</Card>
			)}

			{!!displayFee && (
				<AdjustValue
					value={`${satsPerByte} sats/byte`}
					decreaseValue={decreaseFee}
					increaseValue={increaseFee}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0,
	},
	textInput: {
		backgroundColor: 'transparent',
	},
	card: {
		height: 58,
		marginBottom: 8,
		borderRadius: 20,
		paddingHorizontal: 16,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	col1: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'transparent',
	},
	col2: {
		alignContent: 'flex-end',
		right: 4,
		backgroundColor: 'transparent',
	},
	titleContainer: {
		flex: 1,
		marginHorizontal: 12,
	},
	button: {
		paddingVertical: 2,
		paddingHorizontal: 5,
		borderRadius: 20,
		right: -7,
	},
});

export default memo(SendForm);
