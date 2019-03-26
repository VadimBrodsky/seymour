import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import db, { Item } from '../services/db';

// Actions
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

// Action Creators
export function receiveItems(items: Item[]) {
  return {
    type: RECEIVE_ITEMS,
    items,
  };
}

// Thunks
export const handleReceiveItems = (channelId: string) => {
  return async (dispatch: ThunkDispatch<State, void, Action>) => {
    const items = await db.items.where({ channelId }).toArray();
    dispatch(receiveItems(items));
  };
};

// Types
export interface State {
  loaded: Item[];
}

export type Actions = ReturnType<typeof receiveItems>

