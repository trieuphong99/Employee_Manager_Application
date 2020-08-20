import actionTypes from '../../commons/const/actionTypes';
import _ from 'lodash';
import { SliceData } from '../../commons/function/sliceData';

var initialState = {
  data: [],
  detail: {},
  listRequest: []
};
var myReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case actionTypes.setTimeSheet:
      return {
        ...state,
        data: action.data
      };
    case actionTypes.EDIT_REASON_CHECKIN_CHECKOUT:
      const item = action.data;
      const index = _.findIndex(state.data.data, o => o.id === item.id);
      const dataUpdate = SliceData(state.data.data, index, item);
      const listTimesheets = {...state.data, data: dataUpdate}
      return {
        ...state,
        data: listTimesheets
      }
    case actionTypes.GET_DETAIL_TIMESHEET_STAFF:
      return {
        ...state,
        detail: action.data
      }
    case actionTypes.GET_LIST_REQUEST_STAFF:
      return {
        ...state,
        listRequest: action.data
      }
    case actionTypes.ADD_REQUEST_STAFF:
      let newItem = action.data;
      let newData = SliceData(state.listRequest.data, 0, newItem);
      let newList = {...state.listRequest, data: newData}
      return {
        ...state,
        listRequest: newList
      }
    case actionTypes.EDIT_REQUEST_STAFF:
      let itemEdit = action.data;
      let indexRequest = _.findIndex(state.listRequest.data, o => o.id === itemEdit.id);
      let dataRequestUpdate = SliceData(state.listRequest.data, indexRequest, itemEdit);
      let listRequestUpdate = {...state.listRequest, data: dataRequestUpdate}
      return {
        ...state,
        listRequest: listRequestUpdate
      }
    default:
      return state;
  }
}

export default myReducer;