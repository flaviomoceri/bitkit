import React, { ReactElement } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Display } from '../../styles/text';
import OnboardingScreen from '../../components/OnboardingScreen';
import { useAppSelector } from '../../hooks/redux';
import { showToast } from '../../utils/notifications';
import { accountVersionSelector } from '../../store/reselect/lightning';
import type { LightningScreenProps } from '../../navigation/types';

const imageSrc = require('../../assets/illustrations/lightning.png');

const Introduction = ({
	navigation,
}: LightningScreenProps<'Introduction'>): ReactElement => {
	const { t } = useTranslation('lightning');
	const accountVersion = useAppSelector(accountVersionSelector);

	const onContinue = (): void => {
		if (accountVersion < 2) {
			showToast({
				type: 'warning',
				title: t('migrating_ldk_title'),
				description: t('migrating_ldk_description'),
			});
			return;
		}

		navigation.navigate('Funding');
	};

	return (
		<OnboardingScreen
			displayBackButton={false}
			title={
				<Trans
					t={t}
					i18nKey="introduction.title"
					components={{ accent: <Display color="purple" /> }}
				/>
			}
			description={t('introduction.text')}
			image={imageSrc}
			buttonText={t('introduction.button')}
			testID="LnIntroduction"
			onClosePress={(): void => {
				navigation.navigate('Wallet');
			}}
			onButtonPress={onContinue}
		/>
	);
};

export default Introduction;
