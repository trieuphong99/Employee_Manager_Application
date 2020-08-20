import actionTypes from '../../commons/const/actionTypes';
import _ from 'lodash';
import { SliceData } from '../../commons/function/sliceData';

var initialState = {
  data: [],
  listRequest: [],
  request_approving: '',
  detail: {}
};
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setTimeSheet:
      return {
        ...state,
        data: action.data
      };
    case actionTypes.SET_UPDATE_TIMESHEETS:
      const item = action.data;
      const index = _.findIndex(state.data.data, o => o.id === item.id);
      const dataUpdate = SliceData(state.data.data, index, item)
      const listTimesheets = {...state.data, data: dataUpdate}
      return {
        ...state,
        data: listTimesheets
      }
    case actionTypes.GET_LIST_REQUEST_EDIT:
      return {
        ...state,
        listRequest: action.data
      }
    case actionTypes.SET_CONFIRMATION_STATUS_EDIT:
      const dataConfirm  = action.data;
      const indexUpdateRequest = _.findIndex(state.listRequest.data, o => o.id === dataConfirm.request.id);
      const dataUpdateRequest = SliceData(state.listRequest.data, indexUpdateRequest, dataConfirm.request)
      const listRequestUpdate = {...state.listRequest, data: dataUpdateRequest}
      const indexUpdateTimesheet = _.findIndex(state.data.data, o => o.id === dataConfirm.origin.id)
      if(indexUpdateTimesheet !== -1){
        let dataUpdateTimesheet = SliceData(state.data.data, indexUpdateTimesheet, dataConfirm.origin)
        let listTimesheetUpdate = {...state.data, data: dataUpdateTimesheet}
        return {
          ...state,
          data: listTimesheetUpdate,
          listRequest: listRequestUpdate
        }
      }
      else {
        return {
          ...state,
          listRequest: listRequestUpdate
        }
      }      
    case actionTypes.GET_DETAIL_TIMESHEET_ADMIN:
      return {
        ...state,
        detail: action.data
      }
    default:
      return state;
  }
}

export default myReducer;