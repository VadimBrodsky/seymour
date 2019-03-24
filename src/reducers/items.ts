import { RECEIVE_ITEMS } from '../actions/items';

// @ts-ignore
export default function items(state = {}, action) {
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
