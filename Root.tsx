import React from "react";
import {
	View,
	StyleSheet
} from "react-native";
import App from "./src/App";
import store from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { enableScreens } from "react-native-screens";

enableScreens(true);

const Provider = require("react-redux").Provider;
const { persistStore } = require("redux-persist");
const persistor = persistStore(store);

const Root = () => {
	return (
		<Provider store={store}>
			<PersistGate
				loading={<View style={styles.container} />}
				persistor={persistor}
			>
				<App />
			</PersistGate>
		</Provider>
	);
};

export default Root;

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});