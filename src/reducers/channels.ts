import { RECEIVE_CHANNELS, State, Actions } from '../actions/channels';

export default function channels(state: State = { loaded: [] }, action: Actions) {
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return {
        ...state,
        loaded: action.channels,
      };
    default:
      return state;
  }
}
