import SDK from '@synonymdev/slashtags-sdk';
import RAM from 'random-access-memory';
import { stringToBytes } from '@synonymdev/react-native-lnurl/dist/utils/helpers';

import '../src/utils/i18n';
import {
	EBackupCategories,
	fetchBackup,
	uploadBackup,
} from '../src/utils/backup/backpack';
import { bytesToString } from '../src/utils/converters';
import store from '../src/store';
import {
	addMetaTxTag,
	updatePendingInvoice,
	addMetaTxSlashtagsUrl,
	resetMetadataState,
} from '../src/store/slices/metadata';
import {
	performBlocktankRestore,
	performLdkActivityRestore,
	performMetadataRestore,
	performRemoteBackup,
	performSettingsRestore,
	performWidgetsRestore,
} from '../src/store/actions/backup';
import {
	dispatch,
	getActivityStore,
	getBlocktankStore,
	getMetaDataStore,
	getSettingsStore,
	getWidgetsStore,
} from '../src/store/helpers';
import {
	updateSettings,
	resetSettingsState,
} from '../src/store/slices/settings';
import {
	resetWidgetsState,
	setFeedWidget,
	updateWidgets,
} from '../src/store/slices/widgets';
import {
	addActivityItem,
	resetActivityState,
} from '../src/store/slices/activity';
import { EActivityType } from '../src/store/types/activity';
import { EPaymentType } from '../src/store/types/wallet';
import {
	addPaidBlocktankOrder,
	resetBlocktankState,
} from '../src/store/slices/blocktank';
import { defaultOrderResponse } from '../src/store/shapes/blocktank';
import { updateBlocktankOrder } from '../src/store/slices/blocktank';
import { EAvailableNetwork } from '../src/utils/networks';

jest.setTimeout(30000);

describe('Remote backups', () => {
	let sdk, slashtag;
	beforeAll(async () => {
		sdk = new SDK({
			primaryKey: new Uint8Array(32), //For testing, so we don't fill up server with junk after each test
			storage: RAM,
			relay: 'wss://dht-relay.synonym.to',
		});
		await sdk.ready();
		slashtag = sdk.slashtag();
	});

	afterAll(async () => {
		await sdk.close();
	});

	it('Backups up and restores a blob', async () => {
		const message = 'Back me up plz';
		const category = EBackupCategories.jest;

		const uploadRes = await uploadBackup(
			slashtag,
			stringToBytes(message),
			category,
			EAvailableNetwork.bitcoinRegtest,
		);

		if (uploadRes.isErr()) {
			throw uploadRes.error;
		}

		const timestamp = uploadRes.value;

		const fetchRes = await fetchBackup(
			slashtag,
			timestamp,
			category,
			EAvailableNetwork.bitcoinRegtest,
		);

		if (fetchRes.isErr()) {
			throw fetchRes.error;
		}
		const jsonString = bytesToString(fetchRes.value.content);
		expect(jsonString).toEqual(message);
	});

	it('Backups and restores metadata', async () => {
		dispatch(addMetaTxTag({ txId: 'txid1', tag: 'tag' }));
		dispatch(
			updatePendingInvoice({
				id: 'id123',
				tags: ['futuretag'],
				address: 'address',
				payReq: 'lightningInvoice',
			}),
		);
		dispatch(addMetaTxSlashtagsUrl({ txId: 'txid2', url: 'slashtag' }));

		const backup = getMetaDataStore();

		const uploadRes = await performRemoteBackup({
			slashtag,
			isSyncedKey: 'remoteMetadataBackupSynced',
			syncRequiredKey: 'remoteMetadataBackupSyncRequired',
			syncCompletedKey: 'remoteMetadataBackupLastSync',
			backupCategory: EBackupCategories.metadata,
			backup,
		});

		if (uploadRes.isErr()) {
			throw uploadRes.error;
		}

		dispatch(resetMetadataState());
		expect(store.getState().metadata.tags).toMatchObject({});

		const restoreRes = await performMetadataRestore({
			slashtag,
		});

		if (restoreRes.isErr()) {
			throw restoreRes.error;
		}

		expect(restoreRes.value.backupExists).toEqual(true);
		expect(store.getState().metadata).toEqual(backup);
		expect(store.getState().backup.remoteMetadataBackupSynced).toEqual(true);
	});

	it('Backups and restores settings', async () => {
		dispatch(
			updateSettings({
				selectedCurrency: 'GBP',
				enableOfflinePayments: false,
			}),
		);

		const backup = getSettingsStore();

		const uploadRes = await performRemoteBackup({
			slashtag,
			isSyncedKey: 'remoteSettingsBackupSynced',
			syncRequiredKey: 'remoteSettingsBackupSyncRequired',
			syncCompletedKey: 'remoteSettingsBackupLastSync',
			backupCategory: EBackupCategories.settings,
			backup,
		});

		if (uploadRes.isErr()) {
			throw uploadRes.error;
		}

		dispatch(resetSettingsState());
		expect(store.getState().settings.selectedCurrency).toEqual('USD');

		const restoreRes = await performSettingsRestore({
			slashtag,
		});

		if (restoreRes.isErr()) {
			throw restoreRes.error;
		}

		expect(restoreRes.value.backupExists).toEqual(true);
		expect(store.getState().settings).toEqual(backup);
		expect(store.getState().backup.remoteSettingsBackupSynced).toEqual(true);
	});

	it('Backups and restores widgets', async () => {
		dispatch(
			setFeedWidget({
				url: 'url',
				type: 'type',
				fields: [
					{
						name: 'name',
						main: 'main',
						files: {},
					},
				],
			}),
		);
		dispatch(updateWidgets({ onboardedWidgets: true }));

		const backup = getWidgetsStore();

		const uploadRes = await performRemoteBackup({
			slashtag,
			isSyncedKey: 'remoteWidgetsBackupSynced',
			syncRequiredKey: 'remoteWidgetsBackupSyncRequired',
			syncCompletedKey: 'remoteWidgetsBackupLastSync',
			backupCategory: EBackupCategories.widgets,
			backup,
		});

		if (uploadRes.isErr()) {
			throw uploadRes.error;
		}

		dispatch(resetWidgetsState());
		expect(store.getState().widgets.widgets).toMatchObject({});

		const restoreRes = await performWidgetsRestore({
			slashtag,
		});

		if (restoreRes.isErr()) {
			throw restoreRes.error;
		}

		expect(restoreRes.value.backupExists).toEqual(true);
		expect(store.getState().widgets).toEqual(backup);
		expect(store.getState().backup.remoteWidgetsBackupSynced).toEqual(true);
	});

	it('Backups and restores LDK Activity', async () => {
		dispatch(
			addActivityItem({
				id: 'id',
				activityType: EActivityType.lightning,
				txType: EPaymentType.received,
				message: '',
				address: 'invoice',
				confirmed: true,
				value: 1,
				timestamp: new Date().getTime(),
			}),
		);

		const backup = getActivityStore().items.filter(
			(a) => a.activityType === EActivityType.lightning,
		);

		const uploadRes = await performRemoteBackup({
			slashtag,
			isSyncedKey: 'remoteLdkActivityBackupSynced',
			syncRequiredKey: 'remoteLdkActivityBackupSyncRequired',
			syncCompletedKey: 'remoteLdkActivityBackupLastSync',
			backupCategory: EBackupCategories.ldkActivity,
			backup,
		});

		if (uploadRes.isErr()) {
			throw uploadRes.error;
		}

		dispatch(resetActivityState());
		expect(store.getState().activity.items.length).toEqual(0);

		const restoreRes = await performLdkActivityRestore({
			slashtag,
		});

		if (restoreRes.isErr()) {
			throw restoreRes.error;
		}

		expect(restoreRes.value.backupExists).toEqual(true);
		expect(store.getState().activity.items).toEqual(backup);
		expect(store.getState().backup.remoteLdkActivityBackupSynced).toEqual(true);
	});

	it('Backups and restores Blocktank orders', async () => {
		dispatch(addPaidBlocktankOrder({ orderId: 'id', txid: 'txid' }));
		dispatch(updateBlocktankOrder(defaultOrderResponse));

		const { orders, paidOrders } = getBlocktankStore();
		const backup = { orders, paidOrders };

		const uploadRes = await performRemoteBackup({
			slashtag,
			isSyncedKey: 'remoteBlocktankBackupSynced',
			syncRequiredKey: 'remoteBlocktankBackupSyncRequired',
			syncCompletedKey: 'remoteBlocktankBackupLastSync',
			backupCategory: EBackupCategories.blocktank,
			backup,
		});

		if (uploadRes.isErr()) {
			throw uploadRes.error;
		}

		dispatch(resetBlocktankState());
		expect(store.getState().blocktank.orders.length).toEqual(0);
		expect(store.getState().blocktank.paidOrders).toMatchObject({});

		const restoreRes = await performBlocktankRestore({
			slashtag,
		});

		if (restoreRes.isErr()) {
			throw restoreRes.error;
		}

		expect(restoreRes.value.backupExists).toEqual(true);
		expect(store.getState().blocktank.orders).toEqual(backup.orders);
		expect(store.getState().blocktank.paidOrders).toEqual(backup.paidOrders);
		expect(store.getState().backup.remoteBlocktankBackupSynced).toEqual(true);
	});
});
