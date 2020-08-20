import * as ActionTypes from '../const/account';
import _ from 'lodash';

let initialState = {
  data : [],
  confirmation_status: ""
};

const overTimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LIST_ACC_OVERTIME:
      return {
        ...state,
        data: action.data
      };
    case ActionTypes.SET_ALLOWED_OVERTIME:
      const item = state.data;
      const status = action.confirmation_status.confirmation_status;
      const index = _.findIndex(item.data, i => i.id === action.confirmation_status.id);
      const dataUpdate = [
        ..._.slice(item.data, 0, index),
        {...item.data[index], confirmation_status: status},
        ..._.slice(item.data, index + 1)
      ];
      const listOT = {...item, data: dataUpdate};
      return {
        ...state,
        data: listOT
      };
    default:
      return state;
  }
}
export default overTimeReducer;