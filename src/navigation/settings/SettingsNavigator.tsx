import React, { ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsMenu from '../../screens/Settings';
import ManageSeedPhrase from '../../screens/Settings/ManageSeedPhrase';
import CurrenciesSettings from '../../screens/Settings/Currencies';
import ElectrumConfig from '../../screens/Settings/ElectrumConfig';
import CoinSelectPreference from '../../screens/Settings/CoinSelectPreference';
import AddressTypePreference from '../../screens/Settings/AddressTypePreference';
import DevSettings from '../../screens/Settings/DevSettings';
import BackupData from '../../screens/Settings/Backup/BackupData';
import LightningNodeInfo from '../../screens/Settings/Lightning/LightningNodeInfo';
import TempSettings from '../../screens/Settings/TempSettings';
import BitcoinUnitSettings from '../../screens/Settings/BitcoinUnit';
import TransactionSpeedSettings from '../../screens/Settings/TransactionSpeed';
import AuthCheck from '../../components/AuthCheck';
import GeneralSettings from '../../screens/Settings/General';
import SecuritySettings from '../../screens/Settings/Security';
import BackupMenu from '../../screens/Settings/BackupMenu';
import NetworksSettings from '../../screens/Settings/Networks';
import AdvancedSettings from '../../screens/Settings/Advanced';
import AboutSettings from '../../screens/Settings/About';
import EasterEgg from '../../screens/Settings/EasterEgg';
import BitcoinNetworkSelection from '../../screens/Settings/Bitcoin/BitcoinNetworkSelection';
import Channels from '../../screens/Settings/Lightning/Channels';
import ChannelDetails from '../../screens/Settings/Lightning/ChannelDetails';
import CloseConnection from '../../screens/Settings/Lightning/CloseChannel';
import AddConnection from '../../screens/Settings/Lightning/AddConnection';
import AddConnectionResult from '../../screens/Settings/Lightning/AddConnectionResult';
import ExportToPhone from '../../screens/Settings/Backup/ExportToPhone';

const Stack = createNativeStackNavigator();

const navOptions = {
	headerShown: false,
	gestureEnabled: true,
	detachInactiveScreens: true,
};

const SettingsNavigator = (): ReactElement => {
	return (
		<Stack.Navigator screenOptions={navOptions} initialRouteName="SettingsMenu">
			<Stack.Group screenOptions={navOptions}>
				<Stack.Screen name="SettingsMenu" component={SettingsMenu} />

				<Stack.Screen name="GeneralSettings" component={GeneralSettings} />
				<Stack.Screen name="SecuritySettings" component={SecuritySettings} />
				<Stack.Screen name="BackupMenu" component={BackupMenu} />
				<Stack.Screen name="NetworksSettings" component={NetworksSettings} />
				<Stack.Screen name="AdvancedSettings" component={AdvancedSettings} />
				<Stack.Screen name="AboutSettings" component={AboutSettings} />
				<Stack.Screen name="EasterEgg" component={EasterEgg} />

				<Stack.Screen
					name="CurrenciesSettings"
					component={CurrenciesSettings}
				/>
				<Stack.Screen
					name="BitcoinUnitSettings"
					component={BitcoinUnitSettings}
				/>
				<Stack.Screen
					name="TransactionSpeedSettings"
					component={TransactionSpeedSettings}
				/>
				<Stack.Screen name="ElectrumConfig" component={ElectrumConfig} />
				<Stack.Screen name="TempSettings" component={TempSettings} />

				<Stack.Screen
					name="CoinSelectPreference"
					component={CoinSelectPreference}
				/>
				<Stack.Screen
					name="AddressTypePreference"
					component={AddressTypePreference}
				/>
				<Stack.Screen name="DevSettings" component={DevSettings} />
				<Stack.Screen name="BackupData" component={BackupData} />
				<Stack.Screen name="ExportToPhone" component={ExportToPhone} />
				<Stack.Screen
					name="BitcoinNetworkSelection"
					component={BitcoinNetworkSelection}
				/>
				<Stack.Screen name="LightningNodeInfo" component={LightningNodeInfo} />
				<Stack.Screen name="ManageSeedPhrase" component={ManageSeedPhrase} />
				<Stack.Screen name="AuthCheck" component={AuthCheck} />
				<Stack.Screen name="Channels" component={Channels} />
				<Stack.Screen name="ChannelDetails" component={ChannelDetails} />
				<Stack.Screen name="CloseConnection" component={CloseConnection} />
				<Stack.Screen name="LightningAddConnection" component={AddConnection} />
				<Stack.Screen
					name="LightningAddConnectionResult"
					component={AddConnectionResult}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default SettingsNavigator;
