import {
	IBtInfo,
	IBtOrder,
	ICJitEntry,
	ICreateOrderOptions,
} from '@synonymdev/blocktank-lsp-http-client';

export interface IBlocktank {
	orders: IBtOrder[];
	paidOrders: TPaidBlocktankOrders;
	info: IBtInfo;
	cJitEntries: ICJitEntry[];
}

export type TPaidBlocktankOrders = {
	[orderId: string]: string;
};

export interface ICreateOrderRequest {
	lspBalance: number;
	channelExpiryWeeks?: number;
	options?: Partial<ICreateOrderOptions>;
}
