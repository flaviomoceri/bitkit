import React, { ReactElement, memo, useState } from 'react';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	GestureResponderEvent,
	StyleProp,
	ViewStyle,
	LayoutChangeEvent,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import colors from '../styles/colors';
import { CaptionB } from '../styles/text';
import { TActivityFilter } from '../utils/activity';

const tabsGap = 4;

export type TTab = {
	id: string;
	filter: TActivityFilter;
};

const Tab = ({
	text,
	active = false,
	testID,
	onLayout,
	onPress,
}: {
	text: string;
	active?: boolean;
	testID?: string;
	onLayout: (event: LayoutChangeEvent) => void;
	onPress: (event: GestureResponderEvent) => void;
}): ReactElement => {
	return (
		<TouchableOpacity
			style={styles.tab}
			activeOpacity={0.7}
			testID={testID}
			onLayout={onLayout}
			onPress={onPress}>
			<CaptionB color={active ? 'white' : 'secondary'}>{text}</CaptionB>
		</TouchableOpacity>
	);
};

const Tabs = ({
	tabs,
	activeTab,
	style,
	onPress,
}: {
	tabs: TTab[];
	activeTab: number;
	style?: StyleProp<ViewStyle>;
	onPress: (index: number) => void;
}): ReactElement => {
	const { t } = useTranslation('wallet');
	const [tabWidth, setTabWidth] = useState(0);

	const animatedTabStyle = useAnimatedStyle(() => {
		return { left: withTiming((tabWidth + tabsGap) * activeTab) };
	}, [tabWidth, activeTab]);

	const onLayout = (event: LayoutChangeEvent): void => {
		setTabWidth(event.nativeEvent.layout.width);
	};

	return (
		<View style={[styles.root, style]} testID="Tabs">
			<Animated.View
				style={[styles.activeTab, animatedTabStyle, { width: tabWidth }]}
			/>
			{tabs.map((tab, index) => (
				<Tab
					key={tab.id}
					text={t('activity_tabs.' + tab.id)}
					active={activeTab === index}
					testID={`Tab-${tab.id}`}
					onLayout={onLayout}
					onPress={(): void => onPress(index)}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		gap: tabsGap,
	},
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2,
		borderColor: colors.white64,
		paddingVertical: 10,
	},
	activeTab: {
		backgroundColor: colors.brand,
		height: 2,
		position: 'absolute',
		top: '95%',
		zIndex: 1,
	},
});

export default memo(Tabs);
