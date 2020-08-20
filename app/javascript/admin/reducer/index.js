import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loadingReducer from './loading';
import accountReducer from './account';
import timeSheet from './timeSheet';
import currentUser from './currentUser';
import dayOffReducer from './dayOff';
import overTimeReducer from './overTime';
import CompensationReducer from './compensation';
import dateRange from './dateRange';
import DashBoardReducer from './dashBoard';

const myReducer = combineReducers({
  loadingReducer: loadingReducer,
  form: formReducer,
  accountReducer: accountReducer,
  currentUser: currentUser,
  timeSheet: timeSheet,
  getListAccountsDayOff: dayOffReducer,
  getListAccOverTime: overTimeReducer,
  getListAccCompensation: CompensationReducer,
  dateRange: dateRange,
  getDataDashBoard: DashBoardReducer
});

export default myReducer;
