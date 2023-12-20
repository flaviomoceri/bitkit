import { Slashtag } from '@synonymdev/slashtags-sdk';
import b4a from 'b4a';

import { __SLASHTAGS_SEEDER_BASE_URL__ } from '../../constants/env';
import { cacheProfile, setLastSeederRequest } from '../slices/slashtags';
import { dispatch, getSlashtagsStore } from '../helpers';
import { seedDrives } from '../../utils/slashtags';
import { BasicProfile } from '../types/slashtags';

/**
 * Sends all relevant hypercores to the seeder once a week
 */
export const updateSeederMaybe = async (slashtag: Slashtag): Promise<void> => {
	const key = b4a.toString(slashtag.key, 'hex');
	const response = await fetch(
		__SLASHTAGS_SEEDER_BASE_URL__ + '/seeding/hypercore/' + key,
		{ method: 'GET' },
	);
	const status = await response.json();

	const lastSent = getSlashtagsStore().seeder?.lastSent || 0;

	const now = Number(new Date());
	// throttle sending to seeder to once a day
	const passed = (now - lastSent) / 86400000;

	if (passed < 1 && status.statusCode !== 404) {
		return;
	}

	const sent = await seedDrives(slashtag).catch(noop);

	if (sent) {
		console.debug('Sent hypercores to seeder');
		dispatch(setLastSeederRequest(now));
	}
};

export const cacheProfileChecked = (
	url: string,
	fork: number,
	version: number,
	profile: BasicProfile,
): void => {
	if (!profile || fork === null || fork === undefined || !version) {
		return;
	}

	const cached = getSlashtagsStore().profiles?.[url];

	// If there is a cache mess, cache!
	if (!cached || (fork >= cached.fork && version > cached.version)) {
		dispatch(cacheProfile({ url, fork, version, profile }));
	}
};

function noop(): void {}
