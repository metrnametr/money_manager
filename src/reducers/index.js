import { combineReducers } from 'redux';
import cashReducer from './cashReducer';
import dateReducer from './dateReducer';

export default combineReducers({
  cash: cashReducer,
  currentDate: dateReducer
});
