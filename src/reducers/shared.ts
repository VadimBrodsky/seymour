import { SHARED_ACTION } from '../actions/shared';

export default function sharedReducer(state: any, action: any) {
  switch (action.type) {
    case SHARED_ACTION:
      return { ...state };
    default:
      return state;
  }
}
