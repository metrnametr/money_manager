import { TOGGLE_CURRENT_DATE } from '../actions/types';
const moment = require('moment');

const initialState = {
  date: moment().locale('ru').format('dd, DD MMMM YYYY')
};

const actions = {
  [TOGGLE_CURRENT_DATE]: (state, { date }) => ({ ...state, date })
};

const dateReducer = (state = initialState, { type, payload }) => {
  return actions[type] ? actions[type](state, payload) : state;
};

export default dateReducer;
