import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import db from '../services/db';
import { RSSItem } from '../services/rss-parser';

// Actions
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const MARK_READ = 'MARK_READ';
export const UPDATE_ERROR = 'UPDATE_ERROR';

// Action Creators
export const receiveItems = (items: State['loaded']) => ({
  type: RECEIVE_ITEMS,
  items,
});

export const markRead = (item: State['loaded'][0]) => ({
  type: MARK_READ,
  item,
});

export const updateError = (error: string) => ({
  type: UPDATE_ERROR,
  error,
});

// Thunks
export const handleReceiveItems = (channelId: number) => {
  return async (dispatch: ThunkDispatch<State, void, Action>) => {
    const items = await db.items.where({ channelId }).toArray();
    // @ts-ignore
    dispatch(receiveItems(items));
  };
};

export const handleMarkRead = (item: State['loaded'][0]) => {
  return async (dispatch: ThunkDispatch<State, void, Action>) => {
    const updatedRecords = await db.items.update(item.id, { read: 1 });
    console.log(updatedRecords);

    if (updatedRecords) {
      dispatch(markRead(item));
    } else {
      dispatch(updateError(`Failed to mark as read, no item with id ${item.id}`));
    }
  };
};

// Types
export interface State {
  loaded: {
    id: number;
    channelId: number;
    content: string;
    description: string;
    guid: string;
    link: string;
    pubDate: number;
    slug: string;
    title: string;
    read: 0 | 1;
    fetchDate: number;
  }[];
  updateError?: string;
}

export type Actions =
  | { type: typeof RECEIVE_ITEMS; items: State['loaded'] }
  | { type: typeof MARK_READ; item: State['loaded'][0] }
  | { type: typeof UPDATE_ERROR; error: string };
