import React, { ReactElement } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Trans, useTranslation } from 'react-i18next';

import { Display, Text01S } from '../styles/text';
import SafeAreaInset from '../components/SafeAreaInset';
import GlowingBackground from '../components/GlowingBackground';
import Button from '../components/Button';
import { useAppDispatch } from '../hooks/redux';
import { sleep } from '../utils/helpers';
import { showBottomSheet } from '../store/utils/ui';
import { acceptBetaRisk } from '../store/slices/user';
import type { RootStackScreenProps } from '../navigation/types';

const imageSrc = require('../assets/illustrations/exclamation-mark.png');

const BetaRisk = ({
	navigation,
}: RootStackScreenProps<'BetaRisk'>): ReactElement => {
	const { t } = useTranslation('other');
	const dispatch = useAppDispatch();

	const handlePress = async (): Promise<void> => {
		dispatch(acceptBetaRisk());
		navigation.goBack();
		await sleep(200);
		showBottomSheet('receiveNavigation');
	};

	return (
		<GlowingBackground topLeft="yellow">
			<SafeAreaInset type="top" />
			<View style={styles.content}>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={imageSrc} />
				</View>
				<View style={styles.textContent}>
					<Display>
						<Trans
							t={t}
							i18nKey="caution_header"
							components={{
								yellow: <Display color="yellow" />,
							}}
						/>
					</Display>
					<Text01S color="gray1" style={styles.text}>
						{t('caution_text')}
					</Text01S>
				</View>

				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						text={t('understood')}
						size="large"
						onPress={handlePress}
						testID="UnderstoodButton"
					/>
				</View>
			</View>
			<SafeAreaInset type="bottom" minPadding={16} />
		</GlowingBackground>
	);
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		marginHorizontal: 32,
	},
	imageContainer: {
		flex: 3.2,
		alignItems: 'center',
		paddingVertical: 50,
	},
	image: {
		flex: 1,
		resizeMode: 'contain',
	},
	textContent: {
		flex: 3,
		paddingHorizontal: 4,
	},
	text: {
		marginTop: 4,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 'auto',
	},
	button: {
		flex: 1,
	},
});

export default BetaRisk;
