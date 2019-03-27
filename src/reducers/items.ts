import { RECEIVE_ITEMS, State, Actions } from '../actions/items';

export default function items(state: State = { loaded: [] }, action: Actions) {
  switch (action.type) {
    case RECEIVE_ITEMS:
      return {
        ...state,
        loaded: action.items,
      };
    default:
      return state;
  }
}
