export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';

export function receiveChannels(channels) {
  return {
    type: RECEIVE_CHANNELS,
    channels,
  };
}

export const SET_SELECTED_CHANNEL = 'SET_SELECTED_CHANNEL';

export function setSelectedChannel(channelId: number) {
  return {
    type: SET_SELECTED_CHANNEL,
    selectedChannel: channelId,
  }
}
