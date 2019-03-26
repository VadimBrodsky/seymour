import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import db, { Channel } from '../services/db';

// Actions
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';

// Action Creators
export const receiveChannels = (channels: Channel[]) => ({
  type: RECEIVE_CHANNELS,
  channels,
});

// Thunks
export const handleReceiveChannels = () => {
  async (dispatch: ThunkDispatch<State, void, Action>) => {
    const channels = await db.channels.toArray();
    dispatch(receiveChannels(channels));
  };
};

// Types
export interface State {
  loaded: Channel[];
}

export type Actions = ReturnType<typeof receiveChannels>;
