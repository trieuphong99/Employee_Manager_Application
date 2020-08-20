import actionTypes from '../const/actionTypes';
import _ from 'lodash';

var initialState = {
  total_page: 1,
  data: []
}

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.GET_OVERTIMES:
      return action.data;

    case actionTypes.ADD_OVERTIMES:
      return {
        ...state,
        data: [
          action.data,
          ..._.slice(state.data, 0, state.data.length-1),
        ]
      }

    case actionTypes.UPDATE_OVERTIMES:
      const item = action.data
      const index = _.findIndex(state.data, o => item.id === o.id)
      return {
        ...state,
        data: [
          ..._.slice(state.data, 0, index),
          item,
          ..._.slice(state.data, index + 1)
        ]
      }
    default:
      return state;
  }
}

export default myReducer;