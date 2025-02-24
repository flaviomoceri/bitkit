import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	SharedValue,
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { Pressable } from '../styles/components';

const DOT_SIZE = 7;

const Dot = ({
	animValue,
	index,
	length,
	onPress,
}: {
	index: number;
	length: number;
	animValue: SharedValue<number>;
	onPress: () => void;
}): ReactElement => {
	const width = DOT_SIZE;

	const animStyle = useAnimatedStyle(() => {
		let inputRange = [index - 1, index, index + 1];
		let outputRange = [-width, 0, width];

		if (index === 0 && animValue?.value > length - 1) {
			inputRange = [length - 1, length, length + 1];
			outputRange = [-width, 0, width];
		}

		return {
			transform: [
				{
					translateX: interpolate(animValue?.value, inputRange, outputRange),
				},
			],
		};
	}, [animValue, index, length]);

	return (
		<Pressable style={styles.dotRoot} color="gray2" onPress={onPress}>
			<Animated.View style={[styles.dot, animStyle]} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	dotRoot: {
		width: DOT_SIZE,
		height: DOT_SIZE,
		borderRadius: 5,
		overflow: 'hidden',
		marginRight: 7,
	},
	dot: {
		borderRadius: 5,
		backgroundColor: 'white',
		flex: 1,
	},
});

export default Dot;
