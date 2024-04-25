import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { Pressable } from '../styles/components';
import { BodyMB } from '../styles/text';

const RectangleButton = ({
	icon,
	text,
	actions,
	disabled,
	testID,
	onPress,
}: {
	icon: ReactElement;
	text: string;
	actions?: ReactElement;
	disabled?: boolean;
	testID?: string;
	onPress: () => void;
}): ReactElement => (
	<Pressable
		style={styles.button}
		color="white06"
		disabled={disabled}
		testID={testID}
		onPress={onPress}>
		<View style={styles.buttonIcon}>{icon}</View>
		<BodyMB color="white">{text}</BodyMB>
		<View style={styles.buttonActions}>{actions}</View>
	</Pressable>
);

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		padding: 24,
		marginBottom: 8,
		height: 80,
	},
	buttonIcon: {
		marginRight: 16,
	},
	buttonActions: {
		marginLeft: 'auto',
	},
});

export default RectangleButton;
