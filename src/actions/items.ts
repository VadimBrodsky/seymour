import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import db from '../services/db';

// Actions
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

// Action Creators
export function receiveItems(items: State['loaded']) {
  return {
    type: RECEIVE_ITEMS,
    items,
  };
}

// Thunks
export const handleReceiveItems = (channelId: number) => {
  return async (dispatch: ThunkDispatch<State, void, Action>) => {
    const items = await db.items.where({ channelId }).toArray();
    // @ts-ignore
    dispatch(receiveItems(items));
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
    read: boolean;
    fetchDate: number;
  }[];
}

export type Actions = ReturnType<typeof receiveItems>;
