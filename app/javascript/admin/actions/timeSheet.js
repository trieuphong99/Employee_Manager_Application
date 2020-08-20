import actionTypes from '../../commons/const/actionTypes';
import axios from 'axios'
import { showLoading, hideLoading } from './loading'
import { toastSuccess, toastError } from '../../commons/helpers/toastHelpers';
// import fakeData from '../../../../db'
// import MockAdapter from 'axios-mock-adapter'
// var mock = new MockAdapter(axios);

// mock.onGet('/admin/user_timesheets').reply(200, fakeData.currentusertimesheet);
// mock.onGet('admin/users').reply(200, fakeData.users);
// mock.onGet('admin/users/14').reply(200, fakeData.users[3]);
// mock.onPost('/users/14/change_password').reply(200);
// mock.onGet('/admin/user_dayoffs').reply(200, fakeData.dayoff);
// mock.onPatch('/admin/uesr_dayoffs/14').reply(200, fakeData.dayoff[0]);
// mock.onGet('/admin/user_overtimes').reply(200, fakeData.overtime);
// mock.onPatch('admin/user_overtimes/14').reply(200, fakeData.overtime[0]);

export const getStaffTimeSheetByAdmin = (startDate, endDate, user_id, current_page, sort_type, sort_field, filter_type) => {
  const params = {
    from_date: startDate,
    to_date: endDate,
    user_id: user_id,
    current_page: String(current_page),
    sort_type: sort_type,
    sort_field: sort_field,
    filter_type: filter_type
  }
  return (dispatch) => {
    dispatch(showLoading())
    axios.get('/admin/user_timesheets', { params: params })
      .then(function (res) {
        dispatch(setTimeSheet(res.data))
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        dispatch(hideLoading())
      });
  }
}

export const setTimeSheet = (data) => { return { type: actionTypes.setTimeSheet, data: data } }

export const setUpdateTimeSheet = (id, start_at, end_at, reason_in, reason_out) => {
  const body = {
    start_at: String(start_at),
    end_at: String(end_at),
    reason_in: reason_in,
    reason_out: reason_out
  }
  return dispatch => {
    dispatch(showLoading())
    axios.patch(`/admin/user_timesheets/${id}`, body)
    .then(res => {
      dispatch({type: actionTypes.SET_UPDATE_TIMESHEETS, data: res.data})
      toastSuccess('Successful!');
    })
    .catch(er => {
      toastError(`${er.response.data}`)
    })
    .finally(() => {
      dispatch(hideLoading())
    })
  }
}
export const getListRequestEdit = (fromDate, toDate, currentPage, userID, sortType, sortField) => {
  const params = {
    from_date: fromDate,
    to_date: toDate,
    current_page: currentPage,
    user_id: userID,
    sort_type: sortType,
    sort_field: sortField
  }
  return dispatch => {
    dispatch(showLoading())
    axios.get('/admin/timesheet_requests', {params: params})
    .then(res => {
      dispatch({type: actionTypes.GET_LIST_REQUEST_EDIT, data: res.data})
    })
    .catch(er => {
      toastError(`${er.response.data}`)
    })
    .finally(() => {
      dispatch(hideLoading());
    })
  }
}

export const setIsAllowedEdit = (id, confirm) => {
  
  const body = {
    confirmation_status: String(confirm)
  }
  return dispatch => {
    dispatch(showLoading());
    return axios.patch(`/admin/timesheet_requests/${id}`, body )
      .then(res => {
        dispatch({type: actionTypes.SET_CONFIRMATION_STATUS_EDIT, data: res.data})
        toastSuccess('Successful!');
      })
      .catch(er => {
        toastError(`${er.response.data}`)
      })
      .finally(() => {
        dispatch(hideLoading());
      })
  }
}

export const getDetailTimesheet = (id) => {
  return dispatch => {
    dispatch(showLoading());
    axios.get(`/admin/user_timesheets/${id}`)
      .then(res => {
        dispatch({type: actionTypes.GET_DETAIL_TIMESHEET_ADMIN, data: res.data})
      })
      .catch(er => {
        toastError(`${er.response.data}`)
      })
      .finally(() => {
        dispatch(hideLoading())
      })
  }
}