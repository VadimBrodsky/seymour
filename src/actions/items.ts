import { Action, ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import db from '../services/db';

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

// @FIXME
interface State {
  title: string;
}

// @ts-ignore
export function receiveItems(items) {
  return {
    type: RECEIVE_ITEMS,
    items,
  };
}

export const handleReceiveItems = (channelId: string) => {
  return async (dispatch: ThunkDispatch<State, void, Action>) => {
    const items = await db.items.where({ channelId }).toArray();
    dispatch(receiveItems(items));
  };
};
