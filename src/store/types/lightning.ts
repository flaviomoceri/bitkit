import {
	TBackupStateUpdate,
	TChannel as TLdkChannel,
	TClaimableBalance,
	TCreatePaymentReq,
	TInvoice,
} from '@synonymdev/react-native-ldk';
import { IWalletItem, TWalletName } from './wallet';
import { EAvailableNetwork } from '../../utils/networks';

export type IInvoice = {
	[key: string]: TInvoice;
};

export type TCreateLightningInvoice = TCreatePaymentReq & {
	selectedNetwork?: EAvailableNetwork;
	selectedWallet?: TWalletName;
};

export type TOpenChannelIds = string[];

export type TLdkAccountVersion = 1 | 2;

export enum EChannelStatus {
	open = 'open',
	pending = 'pending',
	closed = 'closed',
}

export type TChannel = TLdkChannel & {
	status: EChannelStatus;
};

export type TNode = {
	nodeId: IWalletItem<string>;
	channels: IWalletItem<{ [key: string]: TChannel }>;
	info: IWalletItem<{}>;
	peers: IWalletItem<string[]>;
	claimableBalances: IWalletItem<TClaimableBalance[]>;
	backup: IWalletItem<TBackupStateUpdate>;
};

export type TNodes = {
	[walletName: TWalletName]: TNode;
};

export type TPendingPayment = {
	payment_hash: string;
	amount: number;
};

export type TLightningState = {
	accountVersion: TLdkAccountVersion;
	version: TLightningNodeVersion;
	nodes: TNodes;
	pendingPayments: TPendingPayment[];
};

export type TLightningNodeVersion = {
	ldk: string;
	c_bindings: string;
};

export type TUseChannelBalance = {
	spendingTotal: number; // How many sats the user has reserved in the channel. (Outbound capacity + Punishment Reserve)
	spendingAvailable: number; // How much the user is able to spend from a channel. (Outbound capacity - Punishment Reserve)
	receivingTotal: number; // How many sats the counterparty has reserved in the channel. (Inbound capacity + Punishment Reserve)
	receivingAvailable: number; // How many sats the user is able to receive in a channel. (Inbound capacity - Punishment Reserve)
	capacity: number; // Total capacity of the channel. (spendingTotal + receivingTotal)
};

export type TChannels = {
	[id: string]: TChannel;
};
