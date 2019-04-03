import { RECEIVE_ITEMS, MARK_READ, UPDATE_ERROR, State, Actions } from '../actions/items';

export default function items(state: State = { loaded: [] }, action: Actions): State {
  switch (action.type) {
    case RECEIVE_ITEMS:
      return {
        ...state,
        loaded: action.items,
      };
    case MARK_READ:
      return {
        ...state,
        loaded: state.loaded.map((i) => {
          return i.id !== action.item.id ? i : { ...i, read: 1 as 1 };
        }),
      };
    case UPDATE_ERROR:
      return {
        ...state,
        updateError: action.error,
      };
    default:
      return state;
  }
}
