import { Action, ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import db from '../services/db';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const SET_SELECTED_CHANNEL = 'SET_SELECTED_CHANNEL';

// @FIXME
interface State {
  title: string;
}

export const receiveChannels: ActionCreator<Action> = (channels: Channel[]) => ({
  type: RECEIVE_CHANNELS,
  channels,
});

export const handleReceiveChannels = () => {
  return async (dispatch: ThunkDispatch<State, void, Action>) => {
    const channels = await db.channels.toArray();
    dispatch(receiveChannels(channels));
  };
};

export function setSelectedChannel(channelId: number) {
  return {
    type: SET_SELECTED_CHANNEL,
    selectedChannel: channelId,
  };
}
