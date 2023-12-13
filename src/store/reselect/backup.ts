import { RootState } from '..';
import { IBackup } from '../types/backup';

export const backupSelector = (state: RootState): IBackup => state.backup;
