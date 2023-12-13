import { UnknownAction, combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storage } from '../mmkv-storage';
import actions from '../actions/actions';
import activity from '../slices/activity';
import backup from './backup';
import blocktank from './blocktank';
import checks from './checks';
import fees from './fees';
import metadata from './metadata';
import lightning from './lightning';
import receive from './receive';
import settings from './settings';
import slashtags from './slashtags';
import todos from './todos';
import ui from '../slices/ui';
import user from '../slices/user';
import wallet from './wallet';
import widgets from './widgets';

const appReducer = combineReducers({
	activity,
	backup,
	blocktank,
	checks,
	fees,
	lightning,
	metadata,
	receive,
	settings,
	slashtags,
	todos,
	ui,
	user,
	wallet,
	widgets,
});

const rootReducer = (
	state: ReturnType<typeof appReducer> | undefined,
	action: UnknownAction,
): ReturnType<typeof appReducer> => {
	if (action.type === actions.WIPE_APP) {
		console.log('Wiping app data...');
		// Clear mmkv persisted storage
		storage.clearAll();
		// Clear web relay client storage
		AsyncStorage.clear().catch(() => {});

		// Reset all stores
		return appReducer(undefined, action);
	}

	return appReducer(state, action);
};

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
