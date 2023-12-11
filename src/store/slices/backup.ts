import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { updateActivityItems } from './activity';
import { addPaidBlocktankOrder, updateBlocktankOrder } from './blocktank';
import { updateSettings } from './settings';
import { addContact, addContacts, deleteContact } from './slashtags';
import { setFeedWidget } from './widgets';
import { initialBackupState } from '../shapes/backup';
import { TBackupState } from '../types/backup';
import {
	addLastUsedTag,
	addMetaTxSlashtagsUrl,
	addMetaTxTag,
	deleteLastUsedTag,
	deleteMetaTxSlashtagsUrl,
	deleteMetaTxTag,
	deletePendingInvoice,
	moveMetaIncTxTag,
	updateMetaTxTags,
	updatePendingInvoice,
} from './metadata';
import { EActivityType } from '../types/activity';

export const backupSlice = createSlice({
	name: 'backup',
	initialState: initialBackupState,
	reducers: {
		updateBackup: (state, action: PayloadAction<Partial<TBackupState>>) => {
			state = Object.assign(state, action.payload);
		},
		startBackupSeederCheck: (state) => {
			state.hyperProfileCheckRequested =
				state.hyperProfileCheckRequested ?? new Date().getTime();
			state.hyperContactsCheckRequested =
				state.hyperContactsCheckRequested ?? new Date().getTime();
		},
		endBackupSeederCheck: (
			state,
			action: PayloadAction<{
				profile: boolean;
				contacts: boolean;
			}>,
		) => {
			state.hyperProfileCheckRequested = action.payload.profile
				? undefined
				: state.hyperProfileCheckRequested;
			state.hyperContactsCheckRequested = action.payload.contacts
				? undefined
				: state.hyperContactsCheckRequested;
			state.hyperProfileSeedCheckSuccess = action.payload.profile
				? new Date().getTime()
				: state.hyperProfileSeedCheckSuccess;
			state.hyperContactsCheckSuccess = action.payload.contacts
				? new Date().getTime()
				: state.hyperContactsCheckSuccess;
		},
		resetBackupState: () => initialBackupState,
	},
	extraReducers: (builder) => {
		const blocktankReducer = (state): void => {
			state.remoteBlocktankBackupSynced = false;
			state.remoteBlocktankBackupSyncRequired =
				state.remoteBlocktankBackupSyncRequired ?? new Date().getTime();
		};
		const metadataReducer = (state): void => {
			state.remoteMetadataBackupSynced = false;
			state.remoteMetadataBackupSyncRequired =
				state.remoteMetadataBackupSyncRequired ?? new Date().getTime();
		};
		const settingsReducer = (state): void => {
			state.remoteSettingsBackupSynced = false;
			state.remoteSettingsBackupSyncRequired =
				state.remoteSettingsBackupSyncRequired ?? new Date().getTime();
		};
		const slashtagsReducer = (state): void => {
			state.remoteSlashtagsBackupSynced = false;
			state.remoteSlashtagsBackupSyncRequired =
				state.remoteSlashtagsBackupSyncRequired ?? new Date().getTime();
		};
		const widgetsReducer = (state): void => {
			state.remoteWidgetsBackupSynced = false;
			state.remoteWidgetsBackupSyncRequired =
				state.remoteWidgetsBackupSyncRequired ?? new Date().getTime();
		};

		builder
			.addCase(addPaidBlocktankOrder, blocktankReducer)
			.addCase(updateBlocktankOrder, blocktankReducer)
			.addCase(updateMetaTxTags, metadataReducer)
			.addCase(addMetaTxTag, metadataReducer)
			.addCase(deleteMetaTxTag, metadataReducer)
			.addCase(updatePendingInvoice, metadataReducer)
			.addCase(deletePendingInvoice, metadataReducer)
			.addCase(moveMetaIncTxTag, metadataReducer)
			.addCase(addMetaTxSlashtagsUrl, metadataReducer)
			.addCase(deleteMetaTxSlashtagsUrl, metadataReducer)
			.addCase(addLastUsedTag, metadataReducer)
			.addCase(deleteLastUsedTag, metadataReducer)
			.addCase(updateSettings, settingsReducer)
			.addCase(addContact, slashtagsReducer)
			.addCase(addContacts, slashtagsReducer)
			.addCase(deleteContact, slashtagsReducer)
			.addCase(setFeedWidget, widgetsReducer)
			.addCase(updateActivityItems, (state, action) => {
				// we only listen for LN activity here
				const hasLnActivity = action.payload.some(
					(item) => item.activityType === EActivityType.lightning,
				);
				if (hasLnActivity) {
					state.remoteLdkActivityBackupSynced = false;
					state.remoteLdkActivityBackupSyncRequired =
						state.remoteLdkActivityBackupSyncRequired ?? new Date().getTime();
				}
			});
	},
});

const { actions, reducer } = backupSlice;

export const {
	updateBackup,
	startBackupSeederCheck,
	endBackupSeederCheck,
	resetBackupState,
} = actions;

export default reducer;
