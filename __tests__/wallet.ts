import * as bip39 from 'bip39';

// Fix 'getDispatch is not a function'
import '../src/store/utils/ui';
import { slashtagsPrimaryKey } from '../src/utils/wallet';
import { mnemonic } from './utils/dummy-wallet';

describe('Wallet Methods', () => {
	it('Derive slashtags primay key from the Seed', async () => {
		const seed = await bip39.mnemonicToSeed(mnemonic);
		const slashtags = await slashtagsPrimaryKey(seed);
		expect(slashtags).toEqual(
			'be6d74439798f3217043a38de8c4da5a7e2b73714ace0811163105731ff0a066',
		);
	});
});
