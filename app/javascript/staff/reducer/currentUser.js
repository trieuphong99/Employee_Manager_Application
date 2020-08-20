import actionTypes from '../../commons/const/actionTypes';

var initialState = {}
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setCurrentUser:
      return action.data

    default:
      return state;
  }
}

export default myReducer;