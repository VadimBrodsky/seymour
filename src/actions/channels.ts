import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import db from '../services/db';

// Actions
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';

// Action Creators
export const receiveChannels = (channels: State['loaded']) => ({
  type: RECEIVE_CHANNELS,
  channels,
});

// Thunks
export const handleReceiveChannels = () => {
  return async (dispatch: ThunkDispatch<State, void, Action>) => {
    const channels = await db.channels.toArray();
    // @ts-ignore
    dispatch(receiveChannels(channels));
  };
};

// Types
export interface State {
  loaded: {
    id: number;
    title: string;
    slug: string;
    description: string;
    link: string;
    lastBuildDate: number;
    lastFetched: number;
  }[];
}

export type Actions = ReturnType<typeof receiveChannels>;
