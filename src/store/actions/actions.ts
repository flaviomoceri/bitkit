const actions = {
	// Root
	WIPE_APP: 'WIPE_APP',

	// Wallet
	UPDATE_WALLET: 'UPDATE_WALLET',
	UPDATE_WALLET_DATA: 'UPDATE_WALLET_DATA',
	UPDATE_HEADER: 'UPDATE_HEADER',
	UPDATE_WALLET_BALANCE: 'UPDATE_WALLET_BALANCE',
	CREATE_WALLET: 'CREATE_WALLET',
	RESET_WALLET_STORE: 'RESET_WALLET_STORE',
	RESET_SELECTED_WALLET: 'RESET_SELECTED_WALLET',
	RESET_EXCHANGE_RATES: 'RESET_EXCHANGE_RATES',
	SETUP_ON_CHAIN_TRANSACTION: 'SETUP_ON_CHAIN_TRANSACTION',
	DELETE_ON_CHAIN_TRANSACTION: 'DELETE_ON_CHAIN_TRANSACTION',
	UPDATE_SEND_TRANSACTION: 'UPDATE_SEND_TRANSACTION',
	RESET_SEND_TRANSACTION: 'RESET_SEND_TRANSACTION',
	ADD_BOOSTED_TRANSACTION: 'ADD_BOOSTED_TRANSACTION',
	UPDATE_ADDRESS_INDEX: 'UPDATE_ADDRESS_INDEX',
	UPDATE_SELECTED_ADDRESS_TYPE: 'UPDATE_SELECTED_ADDRESS_TYPE',
	ADD_ADDRESSES: 'ADD_ADDRESSES',
	RESET_ADDRESSES: 'RESET_ADDRESSES',
	UPDATE_UTXOS: 'UPDATE_UTXOS',
	UPDATE_TRANSACTIONS: 'UPDATE_TRANSACTIONS',
	RESET_TRANSACTIONS: 'RESET_TRANSACTIONS',
	ADD_UNCONFIRMED_TRANSACTIONS: 'ADD_UNCONFIRMED_TRANSACTIONS',
	UPDATE_UNCONFIRMED_TRANSACTIONS: 'UPDATE_UNCONFIRMED_TRANSACTIONS',
	REPLACE_IMPACTED_ADDRESSES: 'REPLACE_IMPACTED_ADDRESSES',
};

export default actions;
