import React, { ReactElement, useState } from 'react';
import {
	createStackNavigator,
	StackNavigationOptions,
	StackNavigationProp,
	TransitionPresets,
} from '@react-navigation/stack';

import WalletsScreen from '../../screens/Wallets';
import ActivitySavings from '../../screens/Activity/ActivitySavings';
import ActivitySpending from '../../screens/Activity/ActivitySpending';
import ActivityFiltered from '../../screens/Activity/ActivityFiltered';
import BackupPrompt from '../../screens/Settings/Backup/BackupPrompt';
import AppUpdatePrompt from '../bottom-sheet/AppUpdatePrompt';
import HighBalanceWarning from '../bottom-sheet/HighBalanceWarning';
import TabBar from '../../components/TabBar';
import type { RootStackScreenProps } from '../types';
import { __E2E__ } from '../../constants/env';

export type WalletStackParamList = {
	Wallets: { onFocus: (focused: boolean) => void };
	ActivitySavings: undefined;
	ActivitySpending: undefined;
	ActivityFiltered: undefined;
};

export type WalletNavigationProp = StackNavigationProp<WalletStackParamList>;

const Stack = createStackNavigator<WalletStackParamList>();
const screenOptions: StackNavigationOptions = {
	...TransitionPresets.SlideFromRightIOS,
	headerShown: false,
	animationEnabled: !__E2E__,
};

const WalletsStack = ({
	navigation,
}: RootStackScreenProps<'Wallet'>): ReactElement => {
	const [isWalletsScreenFocused, setIsFocused] = useState(false);

	return (
		<>
			<Stack.Navigator screenOptions={screenOptions}>
				<Stack.Screen name="Wallets">
					{(props): ReactElement => (
						<WalletsScreen {...props} onFocus={setIsFocused} />
					)}
				</Stack.Screen>
				<Stack.Screen name="ActivitySavings" component={ActivitySavings} />
				<Stack.Screen name="ActivitySpending" component={ActivitySpending} />
				<Stack.Screen name="ActivityFiltered" component={ActivityFiltered} />
			</Stack.Navigator>

			<TabBar navigation={navigation} />

			{/* Put these here so they appear above the TabBar (zIndex) */}
			{/* Should only ever show when user is on the main wallet screen */}
			<BackupPrompt enabled={isWalletsScreenFocused} />
			<HighBalanceWarning enabled={isWalletsScreenFocused} />
			<AppUpdatePrompt enabled={isWalletsScreenFocused} />
		</>
	);
};

export default WalletsStack;
