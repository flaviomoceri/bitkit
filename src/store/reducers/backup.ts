import actions from '../actions/actions';
import { defaultBackupShape } from '../shapes/backup';
import { EActivityType } from '../types/activity';
import { IBackup } from '../types/backup';

const backup = (state: IBackup = defaultBackupShape, action): IBackup => {
	switch (action.type) {
		case actions.BACKUP_UPDATE:
			return {
				...state,
				...action.payload,
			};

		case 'settings/updateSettings': {
			const remoteSettingsBackupSyncRequired =
				state.remoteSettingsBackupSyncRequired ?? new Date().getTime();
			return {
				...state,
				remoteSettingsBackupSyncRequired,
				remoteSettingsBackupSynced: false,
			};
		}

		case 'widgets/setFeedWidget': {
			const remoteWidgetsBackupSyncRequired =
				state.remoteWidgetsBackupSyncRequired ?? new Date().getTime();
			return {
				...state,
				remoteWidgetsBackupSyncRequired,
				remoteWidgetsBackupSynced: false,
			};
		}

		case actions.UPDATE_META_TX_TAGS:
		case actions.ADD_META_TX_TAG:
		case actions.DELETE_META_TX_TAG:
		case actions.UPDATE_PENDING_INVOICE:
		case actions.DELETE_PENDING_INVOICE:
		case actions.MOVE_META_INC_TX_TAG:
		case actions.ADD_META_TX_SLASH_TAGS_URL:
		case actions.DELETE_META_TX_SLASH_TAGS_URL:
		case actions.ADD_TAG:
		case actions.DELETE_TAG: {
			const remoteMetadataBackupSyncRequired =
				state.remoteMetadataBackupSyncRequired ?? new Date().getTime();
			return {
				...state,
				remoteMetadataBackupSyncRequired,
				remoteMetadataBackupSynced: false,
			};
		}

		case 'activity/updateActivityItems': {
			// we only listen for LN activity here
			if (action.payload.activityType !== EActivityType.lightning) {
				return state;
			}
			const remoteLdkActivityBackupSyncRequired =
				state.remoteLdkActivityBackupSyncRequired ?? new Date().getTime();
			return {
				...state,
				remoteLdkActivityBackupSyncRequired,
				remoteLdkActivityBackupSynced: false,
			};
		}

		case 'blocktank/addPaidBlocktankOrder':
		case 'blocktank/updateBlocktankOrder': {
			const remoteBlocktankBackupSyncRequired =
				state.remoteBlocktankBackupSyncRequired ?? new Date().getTime();
			return {
				...state,
				remoteBlocktankBackupSyncRequired,
				remoteBlocktankBackupSynced: false,
			};
		}

		case actions.CONTACT_ADD:
		case actions.CONTACT_DELETE:
		case actions.CONTACTS_ADD: {
			const remoteSlashtagsBackupSyncRequired =
				state.remoteSlashtagsBackupSyncRequired ?? new Date().getTime();
			return {
				...state,
				remoteSlashtagsBackupSyncRequired,
				remoteSlashtagsBackupSynced: false,
			};
		}

		case actions.BACKUP_SEEDER_CHECK_START: {
			const hyperProfileCheckRequested =
				state.hyperProfileCheckRequested ?? new Date().getTime();
			const hyperContactsCheckRequested =
				state.hyperContactsCheckRequested ?? new Date().getTime();
			return {
				hyperProfileCheckRequested,
				hyperContactsCheckRequested,
				...state,
			};
		}

		case actions.BACKUP_SEEDER_CHECK_END: {
			const hyperProfileCheckRequested = action.payload.profile
				? undefined
				: state.hyperProfileCheckRequested;
			const hyperContactsCheckRequested = action.payload.contacts
				? undefined
				: state.hyperContactsCheckRequested;
			const hyperProfileSeedCheckSuccess = action.payload.profile
				? new Date().getTime()
				: state.hyperProfileSeedCheckSuccess;
			const hyperContactsCheckSuccess = action.payload.contacts
				? new Date().getTime()
				: state.hyperContactsCheckSuccess;

			return {
				...state,
				hyperProfileCheckRequested,
				hyperContactsCheckRequested,
				hyperProfileSeedCheckSuccess,
				hyperContactsCheckSuccess,
			};
		}

		case actions.RESET_BACKUP_STORE:
			return defaultBackupShape;

		default:
			return state;
	}
};

export default backup;
