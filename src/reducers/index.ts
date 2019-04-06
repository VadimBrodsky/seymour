import { combineReducers } from 'redux';
import channels from './channels';
import items from './items';
import shared from './shared'
import { Actions as ChannelActions } from '../actions/channels';
import { Actions as ItemActions } from '../actions/items';

const combinedReducers = combineReducers({
  channels,
  items,
});

export default (state: AppState, action: RootActions) =>
  shared(combinedReducers(state, action), action);

export type AppState = ReturnType<typeof combinedReducers>;
export type RootActions = ChannelActions | ItemActions;
