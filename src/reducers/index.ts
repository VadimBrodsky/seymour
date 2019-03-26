import { combineReducers } from 'redux';
import channels from './channels';
import items from './items';
import { Actions as ChannelActions } from '../actions/channels';
import { Actions as ItemActions } from '../actions/items';

const rootState = combineReducers({
  channels,
  items,
});

export default rootState;

export type AppState = ReturnType<typeof rootState>;
export type RootActions = ChannelActions | ItemActions;
