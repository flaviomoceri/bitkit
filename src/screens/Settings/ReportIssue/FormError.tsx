import React, { memo, ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Text01S } from '../../../styles/text';
import { View as ThemedView } from '../../../styles/components';
import NavigationHeader from '../../../components/NavigationHeader';
import SafeAreaInset from '../../../components/SafeAreaInset';
import type { SettingsScreenProps } from '../../../navigation/types';
import Button from '../../../components/Button';
import GlowImage from '../../../components/GlowImage';

const imageSrc = require('../../../assets/illustrations/cross.png');

const FormError = ({
	navigation,
}: SettingsScreenProps<'FormError'>): ReactElement => {
	const { t } = useTranslation('settings');

	const onOk = (): void => {
		navigation.navigate('SupportSettings');
	};

	return (
		<ThemedView style={styles.fullHeight}>
			<SafeAreaInset type="top" />
			<NavigationHeader
				title={t('support.title_unsuccess')}
				onClosePress={(): void => {
					navigation.navigate('Wallet');
				}}
			/>
			<View style={styles.content}>
				<Text01S style={styles.text} color="gray1">
					{t('support.text_unsuccess')}
				</Text01S>

				<GlowImage image={imageSrc} imageSize={192} glowColor={'red'} />

				<View style={styles.buttonContainer}>
					<Button
						style={styles.button}
						text={t('support.text_unsuccess_button')}
						size="large"
						testID="SuccessButton"
						onPress={onOk}
					/>
				</View>
				<SafeAreaInset type="bottom" minPadding={16} />
			</View>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	fullHeight: {
		flex: 1,
	},
	content: {
		flexGrow: 1,
		paddingHorizontal: 16,
	},
	text: {
		paddingBottom: 32,
	},
	buttonContainer: {
		marginTop: 'auto',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	button: {
		flex: 1,
	},
});

export default memo(FormError);
