import React, { ReactElement } from 'react';
import { Pressable } from 'react-native';
import { BodyMSB } from '../../styles/text';

const ButtonTertiary = ({
	text,
	testID,
	onPress,
}: {
	text: string;
	testID?: string;
	onPress: () => void;
}): ReactElement => {
	return (
		<Pressable testID={testID} onPress={onPress}>
			{({ pressed }) => (
				<BodyMSB color={pressed ? 'white' : 'secondary'}>{text}</BodyMSB>
			)}
		</Pressable>
	);
};

export default ButtonTertiary;
