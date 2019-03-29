import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import db from '../services/db';
import fetcher from '../services/fetcher';
import rssParser from '../services/rss-parser';

// Actions
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const SUBSCRIBE_TO_CHANNEL = 'SUBSCRIBE_TO_CHANNEL';
export const SUBSCRIBTION_ERROR = 'SUBSCRIBTION_ERROR';

// Action Creators
export const receiveChannels = (channels: State['loaded']) => ({
  type: RECEIVE_CHANNELS,
  channels,
});

export const subscribeToChannel = (channel: State['loaded'][0]) => ({
  type: SUBSCRIBE_TO_CHANNEL,
  channel,
});

export const subscribtionError = (message: string) => ({
  type: SUBSCRIBTION_ERROR,
  message,
});

// Thunks
export const handleReceiveChannels = () => {
  return async (dispatch: ThunkDispatch<State, void, Action>) => {
    const channels = await db.channels.toArray();
    // @ts-ignore
    dispatch(receiveChannels(channels));
  };
};

export const handleSubscribeToChannel = (url: string) => {
  return async (dispatch: any) => {
    try {
      const data = await fetcher(url);
    } catch(e) {
      dispatch(subscribtionError(e.message));
    }
  }
}

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
