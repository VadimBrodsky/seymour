import { Action, ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Channel from '../models/channel';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const SET_SELECTED_CHANNEL = 'SET_SELECTED_CHANNEL';

interface State {
  title: string;
}

export const receiveChannels: ActionCreator<Action> = (channels: Channel[]) => ({
  type: RECEIVE_CHANNELS,
  channels,
});

export const handleReceiveChannels = () => {
  return (dispatch: ThunkDispatch<State, void, Action>) => {
    Channel.getAll().then((channels) => {
      dispatch(receiveChannels(channels));
    });
  };
};

export function setSelectedChannel(channelId: number) {
  return {
    type: SET_SELECTED_CHANNEL,
    selectedChannel: channelId,
  };
}
