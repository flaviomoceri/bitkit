import React, { ReactElement } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { TransferIcon } from '../styles/icons';
import { BodyMSB, CaptionB } from '../styles/text';
import Money from './Money';

const NetworkRow = ({
	title,
	balance,
	pendingBalance,
	icon,
	testID,
	onPress,
}: {
	title: string;
	balance: number;
	pendingBalance?: number;
	icon: ReactElement;
	testID?: string;
	onPress?: () => void;
}): ReactElement => {
	const { t } = useTranslation('wallet');

	return (
		<TouchableOpacity
			style={styles.root}
			activeOpacity={0.7}
			testID={testID}
			onPress={onPress}>
			<View style={styles.icon}>{icon}</View>
			<View style={styles.text}>
				<BodyMSB>{title}</BodyMSB>
				{pendingBalance !== 0 && (
					<View style={styles.subtitle}>
						<TransferIcon style={styles.subtitleIcon} color="white50" />
						<CaptionB color="white50">
							{t('details_transfer_subtitle')}
						</CaptionB>
					</View>
				)}
			</View>
			<View style={styles.amount}>
				<Money sats={balance} size="bodyMSB" enableHide={true} symbol={true} />
				{pendingBalance ? (
					<View style={styles.pendingBalance}>
						<Money
							style={styles.pendingBalanceAmount}
							sats={pendingBalance}
							size="captionB"
							color="white50"
							enableHide={true}
						/>
					</View>
				) : null}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	icon: {
		marginRight: 16,
	},
	text: {
		justifyContent: 'center',
	},
	subtitle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	subtitleIcon: {
		marginRight: 3,
	},
	amount: {
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginLeft: 'auto',
	},
	pendingBalance: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	pendingBalanceAmount: {
		marginLeft: 4,
	},
});

export default NetworkRow;
