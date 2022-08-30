import React, { ReactElement, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomSheetWrapper from '../../components/BottomSheetWrapper';
import ChoosePIN from '../../screens/Settings/PIN/ChoosePIN';
import Result from '../../screens/Settings/PIN/Result';
import AskForBiometrics from '../../screens/Settings/PIN/AskForBiometrics';
import { NavigationContainer } from '../../styles/components';
import Store from '../../store/types';

const Stack = createNativeStackNavigator();
const navOptions = {
	headerShown: false,
	gestureEnabled: true,
	detachInactiveScreens: true,
};
const PINNavigation = (): ReactElement => {
	const isOpen = useSelector(
		(store: Store) => store.user.viewController?.PINNavigation?.isOpen,
	);
	const snapPoints = useMemo(() => [600], []);

	return (
		<BottomSheetWrapper view="PINNavigation" snapPoints={snapPoints}>
			<NavigationContainer key={isOpen}>
				<Stack.Navigator screenOptions={navOptions}>
					<Stack.Group screenOptions={navOptions}>
						<Stack.Screen name="ChoosePIN" component={ChoosePIN} />
						<Stack.Screen
							name="AskForBiometrics"
							component={AskForBiometrics}
						/>
						<Stack.Screen name="Result" component={Result} />
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
		</BottomSheetWrapper>
	);
};

export default memo(PINNavigation);
