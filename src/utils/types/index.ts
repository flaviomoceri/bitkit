import { EAvailableNetwork } from '../networks';
import {
	IAddresses,
	IKeyDerivationPath,
	TKeyDerivationAccountType,
	TWalletName,
} from '../../store/types/wallet';
import { EAddressType } from 'beignet';

export interface IResponse<T> {
	error: boolean;
	data: T;
}

export interface IGetAddress {
	path: string;
	type: EAddressType;
	selectedNetwork?: EAvailableNetwork;
}

export interface IGetAddressResponse {
	address: string;
	path: string;
	publicKey: string;
}

export interface IGetInfoFromAddressPath {
	error: boolean;
	isChangeAddress?: boolean;
	addressIndex?: number;
	data?: string;
}

export interface IGenerateAddresses {
	selectedWallet?: TWalletName;
	addressAmount?: number;
	changeAddressAmount?: number;
	addressIndex?: number;
	changeAddressIndex?: number;
	selectedNetwork?: EAvailableNetwork;
	keyDerivationPath?: IKeyDerivationPath;
	accountType?: TKeyDerivationAccountType;
	addressType?: EAddressType;
	seed?: Buffer;
}

export interface IGenerateAddressesResponse {
	addresses: IAddresses;
	changeAddresses: IAddresses;
}
