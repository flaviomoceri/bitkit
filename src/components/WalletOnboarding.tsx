import React, { memo, ReactElement, useMemo, useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

import { Display } from '../styles/text';
import { XIcon } from '../styles/icons';
import Arrow from '../assets/dotted-arrow.svg';
import { __E2E__ } from '../constants/env';

const WalletOnboarding = ({
	text,
	style,
	onHide,
}: {
	text: string | ReactElement;
	style?: StyleProp<ViewStyle>;
	onHide?: () => void;
}): ReactElement => {
	const insets = useSafeAreaInsets();
	const [showClose, setShowClose] = useState(!__E2E__);

	useEffect(() => {
		if (__E2E__) {
			// delay showing close button. this is handy for e2e testing
			setTimeout(() => setShowClose(true), 2000);
		}
	}, []);

	const rootStyles = useMemo(() => {
		return [styles.root, { marginBottom: 105 + insets.bottom }];
	}, [insets.bottom]);

	return (
		<View style={[rootStyles, style]} testID="WalletOnboarding">
			{showClose && onHide && (
				<TouchableOpacity
					style={styles.closeButton}
					testID="WalletOnboardingClose"
					onPress={onHide}>
					<XIcon color="white50" width={16} height={16} />
				</TouchableOpacity>
			)}
			<Display style={styles.text}>{text}</Display>
			<Arrow style={styles.arrow} />
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		// paddingHorizontal: 16,
		marginTop: 'auto',
	},
	closeButton: {
		height: 40,
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: -15,
		right: 5,
		zIndex: 1,
	},
	text: {
		width: '61%',
	},
	arrow: {
		marginBottom: 10,
	},
});

export default memo(WalletOnboarding);
