import actionTypes from '../const/actionTypes';

let initialState = {
  data: []
}

const CheckinCheckoutReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.EDIT_REASON_CHECKIN_CHECKOUT:
      return action.data;
    default:
      return state;
  }
}
export default CheckinCheckoutReducer;