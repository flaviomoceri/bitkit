import React, { memo, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { navigate } from '../navigation/root/RootNavigator';
import Store from '../store/types';
import {
	PlusIcon,
	Subtitle,
	Text01M,
	TouchableOpacity,
	View,
} from '../styles/components';
import BitfinexWidget from './BitfinexWidget';
import AuthWidget from './AuthWidget';
import FeedWidget from './FeedWidget';

export const Widgets = (): ReactElement => {
	const widgets = useSelector((state: Store) => state.widgets?.widgets || {});

	return (
		<>
			<Subtitle style={styles.title}>Widgets</Subtitle>
			<View>
				<BitfinexWidget />
				{Object.entries(widgets).map(([url, widget]) =>
					widget.feed ? (
						<FeedWidget key={url} url={url} widget={widget} />
					) : (
						<AuthWidget key={url} url={url} widget={widget} />
					),
				)}
				<TouchableOpacity
					onPress={(): void => {
						navigate('Scanner', {});
					}}
					style={styles.add}>
					<View color="green16" style={styles.iconCircle}>
						<PlusIcon height={13} color="green" />
					</View>
					<Text01M>Add Widget</Text01M>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		marginTop: 32,
		marginBottom: 8,
	},
	add: {
		height: 88,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: 'rgba(255, 255, 255, 0.1)',
		borderBottomWidth: 1,
	},
	iconCircle: {
		borderRadius: 20,
		width: 32,
		height: 32,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 16,
	},
});

export default memo(Widgets);
