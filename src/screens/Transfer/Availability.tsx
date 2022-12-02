import React, { ReactElement, memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Display, Text01B, Text01S } from '../../styles/components';
import SafeAreaInsets from '../../components/SafeAreaInsets';
import GlowingBackground from '../../components/GlowingBackground';
import NavigationHeader from '../../components/NavigationHeader';
import GlowImage from '../../components/GlowImage';
import Button from '../../components/Button';
// import { closeChannel } from '../../utils/lightning';
// import { showErrorNotification } from '../../utils/notifications';
// import { addTodo } from '../../store/actions/todos';
import type { TransferScreenProps } from '../../navigation/types';

const imageSrc = require('../../assets/illustrations/exclamation-mark.png');

const Availability = ({
	navigation,
}: TransferScreenProps<'Availability'>): ReactElement => {
	const onCancel = (): void => {
		navigation.goBack();
	};

	const onContinue = async (): Promise<void> => {
		// TODO: close channel
		// // Attempt to close the channel.
		// const closeResponse = await closeChannel({
		// 	channelId: channel.channel_id,
		// 	counterPartyNodeId: channel.counterparty_node_id,
		// });

		// // If error, display error notification and return.
		// if (closeResponse.isErr()) {
		// 	showErrorNotification({
		// 		title: 'Channel Close Error',
		// 		message: closeResponse.error.message,
		// 	});
		// 	addTodo('transferClosingChannel');
		// 	return;
		// }

		navigation.navigate('Success', { type: 'savings' });
	};

	return (
		<GlowingBackground topLeft="purple">
			<SafeAreaInsets type="top" />
			<NavigationHeader title="Funds Availability" displayBackButton={false} />
			<View style={styles.root}>
				<Display color="purple">Availability of your Funds.</Display>
				<Text01S color="gray1" style={styles.text}>
					Transferring funds to your savings usually takes about an hour, but
					settlement may take an additional{' '}
					<Text01B color="purple">14 days</Text01B> under certain network
					conditions.
				</Text01S>

				<GlowImage image={imageSrc} glowColor="purple" />

				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						text="Cancel"
						size="large"
						variant="secondary"
						onPress={onCancel}
					/>
					<View style={styles.divider} />
					<Button
						style={styles.button}
						text="OK"
						size="large"
						onPress={onContinue}
					/>
				</View>
			</View>
			<SafeAreaInsets type="bottom" />
		</GlowingBackground>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		marginTop: 8,
		paddingHorizontal: 16,
	},
	text: {
		marginTop: 8,
		marginBottom: 16,
	},
	buttonContainer: {
		marginTop: 'auto',
		marginBottom: 16,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	button: {
		flex: 1,
	},
	divider: {
		width: 16,
	},
});

export default memo(Availability);