export const isBitcoinNetwork = (
	network: string,
): network is EAvailableNetwork => {
	return ['bitcoin', 'bitcoinTestnet', 'bitcoinRegtest'].includes(network);
};

export enum EAvailableNetwork {
	bitcoin = 'bitcoin',
	bitcoinTestnet = 'bitcoinTestnet',
	bitcoinRegtest = 'bitcoinRegtest',
}

export interface INetwork {
	messagePrefix: string;
	bech32: string;
	bip32: {
		public: number;
		private: number;
	};
	pubKeyHash: number;
	scriptHash: number;
	wif: number;
}

export type INetworks = {
	[key in EAvailableNetwork]: INetwork;
};

/*
Source: https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/src/networks.js
List of address prefixes: https://en.bitcoin.it/wiki/List_of_address_prefixes
 */
export const networks: INetworks = {
	bitcoin: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'bc',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4,
		},
		pubKeyHash: 0x00,
		scriptHash: 0x05,
		wif: 0x80,
	},
	bitcoinTestnet: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'tb',
		bip32: {
			public: 0x043587cf,
			private: 0x04358394,
		},
		pubKeyHash: 0x6f,
		scriptHash: 0xc4,
		wif: 0xef,
	},
	bitcoinRegtest: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'bcrt',
		bip32: {
			public: 0x043587cf,
			private: 0x04358394,
		},
		pubKeyHash: 0x6f,
		scriptHash: 0xc4,
		wif: 0xef,
	},
};

export const networkLabels = {
	[EAvailableNetwork.bitcoin]: {
		id: EAvailableNetwork.bitcoin,
		label: 'Bitcoin Mainnet',
		shortLabel: 'Mainnet',
	},
	[EAvailableNetwork.bitcoinTestnet]: {
		id: EAvailableNetwork.bitcoinTestnet,
		label: 'Bitcoin Testnet',
		shortLabel: 'Testnet',
	},
	[EAvailableNetwork.bitcoinRegtest]: {
		id: EAvailableNetwork.bitcoinRegtest,
		label: 'Bitcoin Regtest',
		shortLabel: 'Regtest',
	},
};

//Returns an array of all available networks from the networks object.
export const availableNetworks = (): EAvailableNetwork[] =>
	Object.values(EAvailableNetwork);
