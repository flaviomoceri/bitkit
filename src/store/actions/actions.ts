const actions = {
	UPDATE_USER: 'UPDATE_USER',
	TOGGLE_VIEW: 'TOGGLE_VIEW',
	RESET_USER_STORE: 'RESET_USER_STORE',
	UPDATE_WALLET: 'UPDATE_WALLET',
	UPDATE_WALLET_BALANCE: 'UPDATE_WALLET_BALANCE',
	CREATE_WALLET: 'CREATE_WALLET',
	RESET_WALLET_STORE: 'RESET_WALLET_STORE',
	RESET_SELECTED_WALLET: 'RESET_SELECTED_WALLET',
	RESET_OUTPUTS: 'RESET_OUTPUTS',
	SETUP_ON_CHAIN_TRANSACTION: 'SETUP_ON_CHAIN_TRANSACTION',
	UPDATE_ON_CHAIN_TRANSACTION: 'UPDATE_ON_CHAIN_TRANSACTION',
	RESET_ON_CHAIN_TRANSACTION: 'RESET_ON_CHAIN_TRANSACTION',
	DELETE_ON_CHAIN_TRANSACTION: 'DELETE_ON_CHAIN_TRANSACTION',
	ADD_BOOSTED_TRANSACTION: 'ADD_BOOSTED_TRANSACTION',
	DELETE_BOOSTED_TRANSACTION: 'DELETE_BOOSTED_TRANSACTION',
	UPDATE_ADDRESS_INDEX: 'UPDATE_ADDRESS_INDEX',
	UPDATE_SELECTED_ADDRESS_TYPE: 'UPDATE_SELECTED_ADDRESS_TYPE',
	ADD_ADDRESSES: 'ADD_ADDRESSES',
	UPDATE_UTXOS: 'UPDATE_UTXOS',
	UPDATE_TRANSACTIONS: 'UPDATE_TRANSACTIONS',
	UPDATE_SETTINGS: 'UPDATE_SETTINGS',
	UPDATE_ELECTRUM_PEERS: 'UPDATE_ELECTRUM_PEERS',
	RESET_SETTINGS_STORE: 'RESET_SETTINGS_STORE',
	UPDATE_OMNIBOLT: 'UPDATE_OMNIBOLT',
	UPDATE_OMNIBOLT_USERDATA: 'UPDATE_OMNIBOLT_USERDATA',
	UPDATE_OMNIBOLT_CONNECTDATA: 'UPDATE_OMNIBOLT_CONNECTDATA',
	UPDATE_OMNIBOLT_CHANNELS: 'UPDATE_OMNIBOLT_CHANNELS',
	UPDATE_OMNIBOLT_CHECKPOINT: 'UPDATE_OMNIBOLT_CHECKPOINT',
	CLEAR_OMNIBOLT_CHECKPOINT: 'CLEAR_OMNIBOLT_CHECKPOINT',
	ADD_OMNIBOLT_ADDRESS: 'ADD_OMNIBOLT_ADDRESS',
	UPDATE_OMNIBOLT_CHANNEL_ADDRESSES_KEY:
		'UPDATE_OMNIBOLT_CHANNEL_ADDRESSES_KEY',
	UPDATE_OMNIBOLT_CHANNEL_SIGNING_DATA: 'UPDATE_OMNIBOLT_CHANNEL_SIGNING_DATA',
	SAVE_OMNIBOLT_CHANNEL_SIGNING_DATA: 'SAVE_OMNIBOLT_CHANNEL_SIGNING_DATA',
	UPDATE_OMNIBOLT_PEERS: 'UPDATE_OMNIBOLT_PEERS',
	CREATE_OMNIBOLT_WALLET: 'CREATE_OMNIBOLT_WALLET',
	RESET_OMNIBOLT_STORE: 'RESET_OMNIBOLT_STORE',
	UPDATE_OMNIBOLT_ASSET_DATA: 'UPDATE_OMNIBOLT_ASSET_DATA',
	START_LIGHTNING: 'START_LIGHTNING',
	CREATE_LIGHTNING_WALLET: 'CREATE_LIGHTNING_WALLET',
	UNLOCK_LIGHTNING_WALLET: 'UNLOCK_LIGHTNING_WALLET',
	UPDATE_LIGHTNING_STATE: 'UPDATE_LIGHTNING_STATE',
	RESET_LIGHTNING_STORE: 'RESET_LIGHTNING_STORE',
	UPDATE_LIGHTNING_INFO: 'UPDATE_LIGHTNING_INFO',
	UPDATE_LIGHTNING_CHANNEL_BALANCE: 'UPDATE_LIGHTNING_CHANNEL_BALANCE',
	UPDATE_LIGHTNING_INVOICES: 'UPDATE_LIGHTNING_INVOICES',
	UPDATE_LIGHTNING_PAYMENTS: 'UPDATE_LIGHTNING_PAYMENTS',
	UPDATE_LIGHTNING_CACHED_NEUTRINO: 'UPDATE_LIGHTNING_CACHED_NEUTRINO',
	UPDATE_ACTIVITY_ENTRIES: 'UPDATE_ACTIVITY_ENTRIES',
	UPDATE_ACTIVITY_SEARCH_FILTER: 'UPDATE_ACTIVITY_SEARCH_FILTER',
	UPDATE_ACTIVITY_TYPES_FILTER: 'UPDATE_ACTIVITY_TYPES_FILTER',
	REPLACE_ACTIVITY_ITEM: 'REPLACE_ACTIVITY_ITEM',
	RESET_ACTIVITY_STORE: 'RESET_ACTIVITY_STORE',
	BACKUP_UPDATE: 'BACKUP_UPDATE',
	RESET_BACKUP_STORE: 'RESET_BACKUP_STORE',
	WIPE_WALLET: 'WIPE_WALLET',
	UPDATE_BLOCKTANK_SERVICE_LIST: 'UPDATE_BLOCKTANK_SERVICE_LIST',
	UPDATE_BLOCKTANK_ORDER: 'UPDATE_BLOCKTANK_ORDER',
	RESET_BLOCKTANK_STORE: 'RESET_BLOCKTANK_STORE',
	ADD_TODO: 'ADD_TODO',
	REMOVE_TODO: 'REMOVE_TODO',
	DISMISS_TODO: 'DISMISS_TODO',
};
export default actions;
