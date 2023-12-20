import { RootState } from '..';
import { TReceiveState } from '../slices/receive';

export const receiveSelector = (state: RootState): TReceiveState => {
	return state.receive;
};
