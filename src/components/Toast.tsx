import React, { ReactElement } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ToastConfig, ToastConfigParams } from 'react-native-toast-message';

import colors from '../styles/colors';
import { Text01M, Text13S } from '../styles/components';
import HorizontalGradient from '../components/HorizontalGradient';
import BlurView from '../components/BlurView';

const Toast = ({
	type,
	text1,
	text2,
}: ToastConfigParams<any>): ReactElement => {
	const dimensions = useWindowDimensions();

	let titleColor = 'white';
	let gradientColor = colors.black;

	if (type === 'success') {
		titleColor = 'green';
		gradientColor = '#1d2f1c';
	}

	if (type === 'info') {
		titleColor = 'blue';
		gradientColor = '#00294e';
	}

	if (type === 'error') {
		titleColor = 'brand';
		gradientColor = '#411a00';
	}

	return (
		<BlurView style={[{ width: dimensions.width - 16 * 2 }, styles.container]}>
			<HorizontalGradient style={styles.gradient} color={gradientColor} />
			<Text01M color={titleColor}>{text1}</Text01M>
			<Text13S style={styles.description} color="gray1">
				{text2}
			</Text13S>
		</BlurView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		padding: 16,
		position: 'relative',
		overflow: 'hidden',
	},
	gradient: {
		...StyleSheet.absoluteFillObject,
	},
	description: {
		marginTop: 3,
	},
});

export const toastConfig: ToastConfig = {
	success: (props) => <Toast {...props} />,
	info: (props) => <Toast {...props} />,
	error: (props) => <Toast {...props} />,
};