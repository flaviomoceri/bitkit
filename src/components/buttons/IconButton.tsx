import React, { ReactElement, ReactNode, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TouchableHighlight } from '../../styles/components';
import { IThemeColors } from '../../styles/themes';

const IconButton = ({
	children,
	color = 'white16',
	disabled = false,
	style,
	testID,
	onPress,
}: {
	children: ReactNode;
	color?: keyof IThemeColors;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	onPress?: () => void;
}): ReactElement => {
	const buttonStyles = useMemo(
		() => ({
			...styles.container,
			opacity: disabled ? 0.6 : 1,
		}),
		[disabled],
	);

	return (
		<TouchableHighlight
			style={[buttonStyles, style]}
			color={color}
			disabled={disabled}
			onPress={onPress}
			testID={testID}>
			{children}
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 48,
		height: 48,
		borderRadius: 9999,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default IconButton;
