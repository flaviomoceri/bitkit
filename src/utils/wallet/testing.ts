import { EPaymentType, IFormattedTransactions } from 'beignet';

/**
 * Used to generate a fake transaction for testing purposes.
 * @param {string} [id]
 * returns {IFormattedTransactions}
 */
export const getFakeTransaction = (
	id = 'fake-transaction',
): IFormattedTransactions => {
	return {
		[id]: {
			address: 'bcrt1qf6flhstpctsm3ctkqqana458mqfgm4m5zl6czf',
			height: 9345,
			scriptHash:
				'c9650cab4f7971240b84a9fa7682d2358ac8b54bf087c54ff30c90a6858920c3',
			totalInputValue: 0.0011232,
			matchedInputValue: 0,
			totalOutputValue: 0.1,
			matchedOutputValue: 0.1,
			fee: 0.0001232,
			satsPerByte: 50.285714285714285,
			type: EPaymentType.received,
			value: 0.1,
			txid: id,
			messages: [],
			timestamp: new Date().getTime(),
			vsize: 246,
			vin: [
				{
					scriptSig: {
						asm: '',
						hex: '',
					},
					sequence: 4294967294,
					txid: 'a412698a0115e0eb2b03735c361ffccbf457aa400ed26402f090ec48ec63c81f',
					txinwitness: [
						'304402206351c84718fbec4501b0984f6266f2ab7942eb28233b972f919ea905e7b2b6dc02204a375b8c918ed67304438082d673ff28a764b966cb35d84ba0b9654d3a1f25b701',
						'03b8d27f322e24167881553a35b756646651abe53c9ecd12a15356fd04d8cdc7f9',
					],
					vout: 1,
				},
				{
					scriptSig: {
						asm: '',
						hex: '',
					},
					sequence: 4294967294,
					txid: 'e0ba55e16b3dc66cbac10ef3ba0daa07790b2870ee438fffd5ea673ea9f71754',
					txinwitness: [
						'3043021f42cc7079fef092f09471cc5f5ddb9ffc345b514e987913fd30864e7d5a71b902205a0aa4cb9d5fc6c87242889668869c3b6689248c13facd4852cf603832e99ef201',
						'0351b482588fcc569a0a31aed832d7b8e5dc1f0055e80241766d6d0f258bfac363',
					],
					vout: 0,
				},
				{
					scriptSig: {
						asm: '',
						hex: '',
					},
					sequence: 4294967294,
					txid: '8279cc028d3224fbd568b978f694ae70262070a62ac2fc6a01ac5e36a5bde16a',
					txinwitness: [
						'3044022062bdfcd7819b1073d204bb7817e3b717455118b2b751fca3012d4bb0f9428e6202200ff9fb7abc5ab62be8f48f9557466531ca5f15e1c5f59d49040df9b828cc5e7b01',
						'035a8c67accdde5632e72fc122af5969c8ccd13cc491ef9386589a9ee4ef7b6746',
					],
					vout: 0,
				},
			],
		},
	};
};
