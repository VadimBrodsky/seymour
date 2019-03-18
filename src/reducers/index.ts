import { combineReducers } from 'redux';
import channels from './channels';
import items from './items';

export default combineReducers({
  channels,
  items,
});
