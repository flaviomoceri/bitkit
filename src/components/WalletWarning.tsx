import React, { memo, ReactElement, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, TouchableOpacity } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { FadeOut } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import { AnimatedView } from '../styles/components';
import { CaptionB, BodyMSB } from '../styles/text';
import { XIcon } from '../styles/icons';
import useColors from '../hooks/colors';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { updateSettings } from '../store/slices/settings';

const WalletWarning = (): ReactElement => {
	const colors = useColors();
	const dispatch = useAppDispatch();
	const { t } = useTranslation('other');
	const [{ height, width }, setLayout] = useState({ width: 1, height: 1 });
	const hideBeta = useAppSelector((state) => state.settings.hideBeta);

	if (hideBeta) {
		return <></>;
	}

	const handleLayout = (event: LayoutChangeEvent): void => {
		setLayout({
			width: event.nativeEvent.layout.width,
			height: event.nativeEvent.layout.height,
		});
	};

	const handleHide = (): void => {
		dispatch(updateSettings({ hideBeta: true }));
	};

	return (
		<AnimatedView
			exiting={FadeOut}
			style={[styles.root, { borderColor: colors.brand }]}
			onLayout={handleLayout}>
			<Canvas style={styles.canvas}>
				<Rect x={0} y={0} width={width} height={height}>
					<LinearGradient
						start={vec(0, 0)}
						end={vec(0, height)}
						positions={[0, 1]}
						colors={['transparent', colors.brand16]}
					/>
				</Rect>
			</Canvas>
			<BodyMSB>{t('beta_software')}</BodyMSB>
			<CaptionB color="brand">{t('beta_warn')}</CaptionB>
			<TouchableOpacity style={styles.button} onPress={handleHide}>
				<XIcon color="brand" width={17} height={17} />
			</TouchableOpacity>
		</AnimatedView>
	);
};

const styles = StyleSheet.create({
	root: {
		height: 96,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	canvas: {
		...StyleSheet.absoluteFillObject,
	},
	button: {
		position: 'absolute',
		top: 0,
		right: 0,
		height: 50,
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default memo(WalletWarning);
