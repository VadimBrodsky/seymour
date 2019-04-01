import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import db from '../services/db';
import fetcher from '../services/fetcher';
import rssParser, { RSSChannel } from '../services/rss-parser';
import { syncFeedsWorker } from '../services/feed-sync.worker';

// Actions
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const LOAD_CHANNEL = 'LOAD_CHANNEL';
export const CLEAR_LOADED_CHANNEL = 'CLEAR_LOADED_CHANNEL';
export const LOAD_CHANNEL_ERROR = 'SUBSCRIBTION_ERROR';
export const SUBSCRIBE_CHANNEL = 'SUBSCRIBE_CHANNEL';

// Action Creators
export const receiveChannels = (channels: State['loaded']): Actions => ({
  type: RECEIVE_CHANNELS,
  channels,
});

export const loadChannel = (channel: RSSChannel): Actions => ({
  type: LOAD_CHANNEL,
  channel,
});

export const clearLoadedChannel = (): Actions => ({
  type: CLEAR_LOADED_CHANNEL,
});

export const subscribtionError = (message: string) => ({
  type: LOAD_CHANNEL_ERROR,
  message,
});

export const subscribeToChannel = (channel: State['loaded'][0]): Actions => ({
  type: SUBSCRIBE_CHANNEL,
  channel,
});

// Thunks
export const handleReceiveChannels = () => {
  return async (dispatch: ThunkDispatch<State, void, Action>) => {
    const channels = await db.channels.toArray();
    // @ts-ignore
    dispatch(receiveChannels(channels));
  };
};

export const handleLoadChannel = (url: string) => {
  return async (dispatch: any) => {
    try {
      const data = await fetcher(url);
      dispatch(loadChannel(rssParser(data)));
    } catch (e) {
      dispatch(subscribtionError(e.message));
    }
  };
};

export const handleSubscribeToChannel = (channel: RSSChannel, url: string) => {
  return async (dispatch: any) => {
    const id = await db.channels.add({
      title: channel.title,
      feedUrl: url,
      slug: channel.slug,
      description: channel.description,
      link: channel.link,
      lastBuildDate: channel.lastBuildDate,
      lastFetched: Date.now(),
    });

    dispatch(subscribeToChannel({ ...channel, id }));
    syncFeedsWorker(id);
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
  newChannel?: RSSChannel;
  newChannelError?: string;
}

export type Actions =
  | { type: typeof LOAD_CHANNEL; channel: RSSChannel }
  | { type: typeof SUBSCRIBE_CHANNEL; channel: State['loaded'][0] }
  | { type: typeof CLEAR_LOADED_CHANNEL }
  | { type: typeof LOAD_CHANNEL_ERROR; message: string }
  | { type: typeof RECEIVE_CHANNELS; channels: State['loaded'] };
