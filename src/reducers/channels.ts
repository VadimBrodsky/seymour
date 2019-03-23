import { RECEIVE_CHANNELS, SET_SELECTED_CHANNEL } from '../actions/channels';

// @ts-ignore
export default function channels(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return {
        ...state,
        loaded: action.channels,
      };
    case SET_SELECTED_CHANNEL:
      return {
        ...state,
        selectedChannel: action.selectedChannel,
      }
    default:
      return state;
  }
}
