import React, { ReactElement, memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Text01B } from '../../styles/text';
import InfoScreen from '../../components/InfoScreen';
import type { LightningScreenProps } from '../../navigation/types';

const imageSrc = require('../../assets/illustrations/switch.png');

const LNURLChannelSuccess = ({
	navigation,
}: LightningScreenProps<'LNURLChannelSuccess'>): ReactElement => {
	const { t } = useTranslation('other');

	const handleAwesome = (): void => {
		navigation.popToTop();
		navigation.goBack();
	};

	return (
		<InfoScreen
			accentColor="purple"
			navTitle={t('lnurl_channel_header')}
			displayBackButton={false}
			title={t('lnurl_channel_connecting')}
			description={
				<Trans
					t={t}
					i18nKey="lnurl_channel_connecting_text"
					components={{ highlight: <Text01B color="white" /> }}
				/>
			}
			image={imageSrc}
			buttonText={t('lightning:awesome')}
			testID="LNURLChannelSuccess"
			onButtonPress={handleAwesome}
		/>
	);
};

export default memo(LNURLChannelSuccess);
