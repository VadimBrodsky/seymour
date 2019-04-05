import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import db from '../services/db';
import fetcher from '../services/fetcher';
import rssParser, { RSSChannel } from '../services/rss-parser';
import { syncFeedsWorker } from '../services/feed-sync.worker';
import { AppState } from '../reducers/index';

// Actions
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const LOAD_CHANNEL = 'LOAD_CHANNEL';
export const CLEAR_LOADED_CHANNEL = 'CLEAR_LOADED_CHANNEL';
export const LOAD_CHANNEL_ERROR = 'SUBSCRIBTION_ERROR';
export const SUBSCRIBE_CHANNEL = 'SUBSCRIBE_CHANNEL';
export const UPDATE_READ_COUNT = 'UPDATE_READ_COUNT';
export const UPDATE_READ_COUNT_ERROR = 'UPDATE_READ_COUNT_ERROR';

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

export const updateReadCount = (channelId: State['loaded'][0]['id']) => ({
  type: UPDATE_READ_COUNT,
  channelId,
});

export const updateReadCountError = (error: string) => ({
  type: UPDATE_READ_COUNT_ERROR,
  error,
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
    const channelObject = {
      title: channel.title,
      feedUrl: url,
      slug: channel.slug,
      description: channel.description,
      link: channel.link,
      lastBuildDate: channel.lastBuildDate,
      lastFetched: Date.now(),
      readCount: 0,
      unreadCount: 0,
    };

    console.log({ channelObject });

    const id = await db.channels.add(channelObject);

    dispatch(subscribeToChannel({ ...channelObject, id }));
    syncFeedsWorker(id);
  };
};

export const handleUpdateReadCount = (channelId: State['loaded'][0]['id']) => {
  return async (dispatch: any) => {
    try {
      const channel = await db.channels.get(channelId);

      if (!channel) {
        throw new Error(`Could not find channel with id ${channelId}`);
      }

      const updatedChannels = db.channels.update(channelId, {
        readCount: channel.readCount + 1,
        unreadCount: channel.unreadCount - 1,
      });

      // optimisticly update the UI
      dispatch(updateReadCount(channelId));

      if (await !updatedChannels) {
        throw new Error(`Could not update channel with id ${channelId}`);
      }
    } catch (e) {
      dispatch(updateReadCountError(e.message));
    }
  };
};

// Selectors
export const selectCurrentChannel = (state: AppState, feedId: string) => {
  let channel;

  if (state.channels.loaded.length > 0) {
    const fallbackId = state.channels.loaded[0];
    const foundChannel = state.channels.loaded.find(
      (channel: State['loaded'][0]) => channel.slug === feedId,
    );

    channel = foundChannel ? foundChannel : fallbackId;
  }

  return channel;
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
    readCount: number;
    unreadCount: number;
  }[];
  newChannel?: RSSChannel;
  newChannelError?: string;
  updateChannelError?: string;
}

export type Actions =
  | { type: typeof LOAD_CHANNEL; channel: RSSChannel }
  | { type: typeof SUBSCRIBE_CHANNEL; channel: State['loaded'][0] }
  | { type: typeof CLEAR_LOADED_CHANNEL }
  | { type: typeof LOAD_CHANNEL_ERROR; message: string }
  | { type: typeof RECEIVE_CHANNELS; channels: State['loaded'] }
  | { type: typeof UPDATE_READ_COUNT; channelId: State['loaded'][0]['id'] }
  | { type: typeof UPDATE_READ_COUNT_ERROR; error: string };
