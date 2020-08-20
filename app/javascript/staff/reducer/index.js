import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loadingReducer from './loading';
import timeSheet from './timeSheet';
import currentUser from './currentUser';
import dayOffs from './dayOffs';
import overtimes from './overtimes';
import dateRange from './dateRange';
import CheckinCheckoutReducer from './checkinCheckout';

const myReducer = combineReducers({
  loadingReducer: loadingReducer,
  form: formReducer,
  timeSheet: timeSheet,
  currentUser: currentUser,
  dayOffs: dayOffs,
  overtimes: overtimes,
  dateRange: dateRange,
  CheckinCheckout: CheckinCheckoutReducer
});

export default myReducer;
