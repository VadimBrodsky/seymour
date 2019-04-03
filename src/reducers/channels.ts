import {
  CLEAR_LOADED_CHANNEL,
  LOAD_CHANNEL,
  LOAD_CHANNEL_ERROR,
  RECEIVE_CHANNELS,
  SUBSCRIBE_CHANNEL,
  UPDATE_READ_COUNT,
  UPDATE_READ_COUNT_ERROR,
  State,
  Actions,
} from '../actions/channels';

export default function channels(state: State = { loaded: [] }, action: Actions): State {
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return {
        ...state,
        loaded: action.channels,
      };
    case LOAD_CHANNEL:
      return {
        ...state,
        newChannel: action.channel,
        newChannelError: '',
      };
    case CLEAR_LOADED_CHANNEL:
      return {
        ...state,
        newChannel: undefined,
        newChannelError: '',
      };
    case LOAD_CHANNEL_ERROR:
      return {
        ...state,
        newChannelError: action.message,
      };
    case SUBSCRIBE_CHANNEL:
      return {
        ...state,
        loaded: [...state.loaded, action.channel],
        newChannel: undefined,
      };
    case UPDATE_READ_COUNT:
      return {
        ...state,
        loaded: state.loaded.map(
          (channel) =>
            channel.id !== action.channelId
              ? channel
              : {
                  ...channel,
                  readCount: channel.readCount + 1,
                  unreadCount: channel.unreadCount - 1,
                },
        ),
      };
    default:
      return state;
  }
}
