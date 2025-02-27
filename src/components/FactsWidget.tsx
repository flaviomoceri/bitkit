import React, { memo, ReactElement, useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Reader } from '@synonymdev/slashtags-widget-facts-feed';

import { Title } from '../styles/text';
import { showToast } from '../utils/notifications';
import { useSlashtags2 } from '../hooks/slashtags2';
import BaseFeedWidget from './BaseFeedWidget';
import { TFeedWidget } from '../store/types/widgets';

const FactsWidget = ({
	url,
	widget,
	isEditing = false,
	style,
	testID,
	onPressIn,
	onLongPress,
}: {
	url: string;
	widget: TFeedWidget;
	isEditing?: boolean;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	onPressIn?: () => void;
	onLongPress?: () => void;
}): ReactElement => {
	const { t } = useTranslation('slashtags');
	const { webRelayClient, webRelayUrl } = useSlashtags2();
	const [fact, setFact] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		const getData = async (): Promise<void> => {
			try {
				const reader = new Reader(
					webRelayClient,
					`${url}?relay=${webRelayUrl}`,
				);
				const result = await reader.getRandomFact();
				setFact(result);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
				showToast({
					type: 'error',
					title: t('widget_error_drive'),
					description: `An error occurred: ${error.message}`,
				});
			}
		};

		getData();
	}, [url, t, webRelayClient, webRelayUrl]);

	return (
		<BaseFeedWidget
			style={style}
			url={url}
			name={t('widget_facts')}
			showTitle={widget.extras?.showTitle}
			isLoading={isLoading}
			isEditing={isEditing}
			testID={testID}
			onPressIn={onPressIn}
			onLongPress={onLongPress}>
			<Title numberOfLines={2}>{fact}</Title>
		</BaseFeedWidget>
	);
};

export default memo(FactsWidget);
