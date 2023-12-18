import { RootState } from '..';
import { TBackupState } from '../types/backup';

export const backupSelector = (state: RootState): TBackupState => state.backup;
