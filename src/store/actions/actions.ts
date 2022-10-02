const actions = {
	// Root
	WIPE_APP: 'WIPE_APP',

	// UI
	RESET_UI_STORE: 'RESET_UI_STORE',
	UPDATE_PROFILE_LINK: 'UPDATE_PROFILE_LINK',

	// User
	UPDATE_USER: 'UPDATE_USER',
	TOGGLE_VIEW: 'TOGGLE_VIEW',
	CLOSE_VIEWS: 'CLOSE_VIEWS',
	USER_IGNORE_BACKUP: 'USER_IGNORE_BACKUP',
	USER_IGNORE_HIGH_BALANCE: 'USER_IGNORE_HIGH_BALANCE',
	USER_VERIFY_BACKUP: 'USER_VERIFY_BACKUP',
	RESET_USER_STORE: 'RESET_USER_STORE',

	// Wallet
	UPDATE_WALLET: 'UPDATE_WALLET',
	UPDATE_HEADER: 'UPDATE_HEADER',
	UPDATE_WALLET_BALANCE: 'UPDATE_WALLET_BALANCE',
	CREATE_WALLET: 'CREATE_WALLET',
	RESET_WALLET_STORE: 'RESET_WALLET_STORE',
	RESET_SELECTED_WALLET: 'RESET_SELECTED_WALLET',
	RESET_EXCHANGE_RATES: 'RESET_EXCHANGE_RATES',
	RESET_OUTPUTS: 'RESET_OUTPUTS',
	SETUP_ON_CHAIN_TRANSACTION: 'SETUP_ON_CHAIN_TRANSACTION',
	UPDATE_ON_CHAIN_TRANSACTION: 'UPDATE_ON_CHAIN_TRANSACTION',
	DELETE_ON_CHAIN_TRANSACTION: 'DELETE_ON_CHAIN_TRANSACTION',
	RESET_ON_CHAIN_TRANSACTION: 'RESET_ON_CHAIN_TRANSACTION',
	ADD_BOOSTED_TRANSACTION: 'ADD_BOOSTED_TRANSACTION',
	UPDATE_ADDRESS_INDEX: 'UPDATE_ADDRESS_INDEX',
	UPDATE_SELECTED_ADDRESS_TYPE: 'UPDATE_SELECTED_ADDRESS_TYPE',
	ADD_ADDRESSES: 'ADD_ADDRESSES',
	UPDATE_UTXOS: 'UPDATE_UTXOS',
	UPDATE_TRANSACTIONS: 'UPDATE_TRANSACTIONS',

	// Receive
	UPDATE_INVOICE: 'UPDATE_INVOICE',
	DELETE_INVOICE_TAG: 'DELETE_INVOICE_TAG',
	RESET_INVOICE: 'RESET_INVOICE',

	// Lightning
	UPDATE_LIGHTNING: 'UPDATE_LIGHTNING',
	UPDATE_LIGHTNING_NODE_ID: 'UPDATE_LIGHTNING_NODE_ID',
	UPDATE_LIGHTNING_CHANNELS: 'UPDATE_LIGHTNING_CHANNELS',
	UPDATE_LIGHTNING_NODE_VERSION: 'UPDATE_LIGHTNING_NODE_VERSION',
	RESET_LIGHTNING_STORE: 'RESET_LIGHTNING_STORE',

	// Activity
	UPDATE_ACTIVITY_ENTRIES: 'UPDATE_ACTIVITY_ENTRIES',
	REPLACE_ACTIVITY_ITEM: 'REPLACE_ACTIVITY_ITEM',
	RESET_ACTIVITY_STORE: 'RESET_ACTIVITY_STORE',
	BACKUP_UPDATE: 'BACKUP_UPDATE',
	RESET_BACKUP_STORE: 'RESET_BACKUP_STORE',

	// Blocktank
	UPDATE_BLOCKTANK_SERVICE_LIST: 'UPDATE_BLOCKTANK_SERVICE_LIST',
	UPDATE_BLOCKTANK_ORDER: 'UPDATE_BLOCKTANK_ORDER',
	UPDATE_BLOCKTANK_INFO: 'UPDATE_BLOCKTANK_INFO',
	RESET_BLOCKTANK_STORE: 'RESET_BLOCKTANK_STORE',

	// Todos
	ADD_TODO: 'ADD_TODO',
	REMOVE_TODO: 'REMOVE_TODO',
	DISMISS_TODO: 'DISMISS_TODO',
	RESET_TODO: 'RESET_TODO',
	UPDATE_FEES: 'UPDATE_FEES',

	// Fees
	UPDATE_ONCHAIN_FEE_ESTIMATES: 'UPDATE_ONCHAIN_FEE_ESTIMATES',
	RESET_FEES_STORE: 'RESET_FEES_STORE',

	// Metadata
	UPDATE_META_TX_TAGS: 'UPDATE_META_TX_TAGS',
	ADD_META_TX_TAG: 'ADD_META_TX_TAG',
	DELETE_META_TX_TAG: 'DELETE_META_TX_TAG',
	ADD_META_TX_SLASH_TAGS_URL: 'ADD_META_TX_SLASH_TAGS_URL',
	DELETE_META_TX_SLASH_TAGS_URL: 'DELETE_META_TX_SLASH_TAGS_URL',
	UPDATE_META_INC_TX_TAGS: 'UPDATE_META_INC_TX_TAGS',
	ADD_META_INC_TX_TAG: 'ADD_META_INC_TX_TAG',
	DELETE_META_INC_TX_TAG: 'DELETE_META_INC_TX_TAG',
	MOVE_META_INC_TX_TAG: 'MOVE_META_INC_TX_TAG',
	RESET_META_STORE: 'RESET_META_STORE',
	ADD_TAG: 'ADD_TAG',

	// Contacts
	SET_ONBOARDING_PROFILE_STEP: 'SET_ONBOARDING_PROFILE_STEP',
	SET_VISITED_CONTACTS: 'SET_VISITED_CONTACTS',
	SET_LAST_SEEDER_REQUEST: 'SET_LAST_SEEDER_REQUEST',
	RESET_SLASHTAGS_STORE: 'RESET_SLASHTAGS_STORE',

	// Settings
	UPDATE_SETTINGS: 'UPDATE_SETTINGS',
	UPDATE_ELECTRUM_PEERS: 'UPDATE_ELECTRUM_PEERS',
	RESET_SETTINGS_STORE: 'RESET_SETTINGS_STORE',
};
export default actions;
