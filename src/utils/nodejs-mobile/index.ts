import nodejs from 'nodejs-mobile-react-native';
import { err, ok, Result } from '@synonymdev/result';
import { v4 as uuidv4 } from 'uuid';

import { EAvailableNetwork } from '../networks';
import { ENodeJsMethod, TNodeJsMethodsData } from './types';
import { DefaultNodeJsMethodsShape } from './shapes';
import { TWalletName } from '../../store/types/wallet';
import {
	getMnemonicPhrase,
	getBip39Passphrase,
	getSelectedNetwork,
	getSelectedWallet,
} from '../wallet';

let isSetup = false;
const methods = {
	[ENodeJsMethod.setup]: {},
	[ENodeJsMethod.generateMnemonic]: {},
	[ENodeJsMethod.getPrivateKey]: {},
	[ENodeJsMethod.getScriptHash]: {},
	[ENodeJsMethod.getAddress]: {},
};
const listeners = {};

/**
 * Sets up listeners for nodejs-mobile methods.
 * @param {string} [id]
 * @param {ENodeJsMethod} method
 * @param {(data: any) => void} resolve
 * @returns {void}
 */
const setupListener = ({
	id = uuidv4(),
	method,
	resolve,
}: {
	id?: string;
	method: ENodeJsMethod;
	resolve: (data: string) => void;
}): void => {
	try {
		methods[method][id] = (msg): void => {
			const parsedMessage = JSON.parse(msg);
			if (parsedMessage.id === id) {
				resolve(msg);
				if (id in listeners) {
					listeners[id].remove('message', methods[method][id]);
				}
			}
		};
		//Ensure the listener is setup and established.
		listeners[id] = nodejs.channel.addListener('message', methods[method][id]);
	} catch (e) {
		console.log(e);
		return resolve(JSON.stringify({ id, error: true, value: e }));
	}
};

/**
 * Used to invoke the methods provided in ENodeJsMethod
 * @param {TNodeJsMethodsData} data
 * @returns {Promise<{id: string; method: ENodeJsMethod; error: boolean; value: string }>}
 */
export const invokeNodeJsMethod = async <T = string>(
	data: TNodeJsMethodsData,
): Promise<{
	id: string;
	method: ENodeJsMethod;
	error: boolean;
	value: T;
}> => {
	const { id, method } = data;
	if (method !== 'setup' && !isSetup) {
		await setupNodejsMobile();
	}

	return new Promise((resolve) => {
		try {
			const parseAndResolve = (res: string): void => {
				const parsedData = JSON.parse(res);
				resolve(parsedData);
			};
			setupListener({ id, method, resolve: parseAndResolve });
			nodejs.channel.send(JSON.stringify(data));
		} catch (e) {
			console.log(e);
			resolve({ id, method, error: true, value: e });
		}
	});
};

/**
 * Sets up nodejs-mobile to sign for the given wallet and network.
 * @param {TWalletName} [selectedWallet]
 * @param {EAvailableNetwork} [selectedNetwork]
 * @param {string} [mnemonic]
 * @returns {Promise<{Result<{string}>}>}
 */
export const setupNodejsMobile = async ({
	selectedWallet,
	selectedNetwork,
	mnemonic,
}: {
	selectedWallet?: TWalletName;
	selectedNetwork?: EAvailableNetwork;
	mnemonic?: string;
} = {}): Promise<Result<string>> => {
	if (!selectedWallet) {
		selectedWallet = getSelectedWallet();
	}
	if (!selectedNetwork) {
		selectedNetwork = getSelectedNetwork();
	}
	if (!mnemonic) {
		const mnemonicResponse = await getMnemonicPhrase(selectedWallet);
		if (mnemonicResponse.isErr()) {
			return err(mnemonicResponse.error.message);
		}
		mnemonic = mnemonicResponse.value;
	}
	let setupShape = DefaultNodeJsMethodsShape.setup();
	setupShape.data.selectedNetwork = selectedNetwork;
	setupShape.data.mnemonic = mnemonic;
	setupShape.data.bip39Passphrase = await getBip39Passphrase();
	await invokeNodeJsMethod(setupShape);
	isSetup = true;
	return ok('');
};
