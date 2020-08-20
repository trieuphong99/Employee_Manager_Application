import actionTypes from "../../commons/const/actionTypes";
import axios from "axios";
import { showLoading } from "./loading";
import { hideLoading } from "./loading";
import { toastError, toastSuccess } from "../../commons/helpers/toastHelpers";
import moment from 'moment';
import Time from '../../commons/const/Time';
// import fakeData from '../../../../db'
// import MockAdapter from 'axios-mock-adapter'
// var mock = new MockAdapter(axios);

// mock.onPost('/check_in').reply(200);
// mock.onPost('/check_out').reply(200);
// mock.onPost('/staff/report_late_early').reply(200);
// mock.onGet('/timesheets').reply(200, fakeData.currentusertimesheet);
// mock.onPost('/staff/offsets').reply(200);
// mock.onGet('admin/users/14').reply(200, fakeData.users[3]);
// mock.onPost('/users/14/change_password').reply(200);
// mock.onGet('/dayoffs').reply(200, fakeData.currentuserdayoff)
// mock.onGet('/overtimes').reply(200, fakeData.currentuserovertime)

export const getStaffTimeSheet = data => {
  const params = {
    from_date: data.startTime,
    to_date: data.endTime,
    current_page: String(data.currentPage),
    sort_type: data.sortType,
    sort_field: data.sortField,
    filter_type: data.type
  };
  return dispatch => {
    dispatch(showLoading());
    axios
      .get("/timesheets", { params: params })
      .then(function(res) {
        dispatch(setTimeSheet(res.data));
      })
      .catch(function(error) {
        console.log(error.data);
        toastError(error);
      })
      .finally(function() {
        dispatch(hideLoading());
      });
  };
};

export const offSet = data => {
  const body = {
    date: moment(data.date).format(Time.crossDMY),
    for_date: moment(data.for_date).format(Time.crossDMY)
  };
  return dispatch => {
    dispatch(showLoading());
    axios
      .post("/compensations", body)
      .then(function(res) {
        toastSuccess("Successful!");
      })
      .catch(function(error) {
        toastError(error.response.data);
      })
      .finally(function() {
        dispatch(hideLoading());
        data.reload();
      });
  };
};

export const editOffSet = data => {
  const body = {
    date: moment(data.date).format(Time.crossDMY),
    for_date: moment(data.for_date).format(Time.crossDMY)
  };
  return dispatch => {
    dispatch(showLoading());
    axios
      .put(`/compensations/${data.id}`, body)
      .then(function(res) {
        toastSuccess("Successful!");
      })
      .catch(function(error) {
        toastError(error.response.data);
      })
      .finally(function() {
        dispatch(hideLoading());
        data.reload();
      });
  };
};

export const deleteOffSet = data => {
  return dispatch => {
    dispatch(showLoading());
    axios
      .delete(`/compensations/${data.id}`)
      .then(function(res) {
        toastSuccess("Successful!");
      })
      .catch(function(error) {
        toastError(error.response.data);
      })
      .finally(function() {
        dispatch(hideLoading());
        data.reload();
      });
  };
};

export const setTimeSheet = data => {
  return { type: actionTypes.setTimeSheet, data: data };
};

export const editReasonCheckinCheckout = (reason_in, reason_out) => {
  const body = {
    reason_in: reason_in,
    reason_out: reason_out
  }
  return dispatch => {
    dispatch(showLoading())
    axios.patch('/timesheets/edit_reason', body)
      .then(res => {
        dispatch({type: actionTypes.EDIT_REASON_CHECKIN_CHECKOUT, data: res.data})
        toastSuccess('Successful!')
      })
      .catch(er => {
        toastError(`${er.response.data}`)
      })
      .finally(() => {
        dispatch(hideLoading())
      })
  }
}

export const requestEditTimeCheckinCheckout = (date, startTime, endTime, reasonIn, reasonOut, reason) => {
  const body = {
    date: date,
    start_at: startTime,
    end_at: endTime,
    reason_in: reasonIn,
    reason_out: reasonOut,
    reason: reason
  }
  return dispatch => {
    dispatch(showLoading())
    axios.post('/timesheet_requests', body)
      .then(res => {
        dispatch({type: actionTypes.ADD_REQUEST_STAFF, data: res.data})
        toastSuccess('Successful!')
      })
      .catch(er => {
        toastError(`${er.response.data}`)
      })
      .finally(() => {
        dispatch(hideLoading())
      })
  }
}

export const getDetailTimesheetStaff = (id) => {
  return dispatch => {
    dispatch(showLoading());
    axios.get(`/timesheets/${id}`)
      .then(res => {
        dispatch({type: actionTypes.GET_DETAIL_TIMESHEET_STAFF, data: res.data})
      })
      .catch(er => {
        toastError(`${er.response.data}`)
      })
      .finally(() => {
        dispatch(hideLoading())
      })
  }
}

export const getListRequestEditStaff = (fromDate, toDate, currentPage, sortType, sortField) => {
  const params = {
    from_date: fromDate,
    to_date: toDate,
    current_page: String(currentPage),
    sort_type: sortType,
    sort_field: sortField
  }
  return dispatch => {
    dispatch(showLoading());
    axios.get('/timesheet_requests', {params: params})
    .then(res => {
      dispatch({type: actionTypes.GET_LIST_REQUEST_STAFF, data: res.data})
    })
    .catch(er => {
      toastError(`${er}`)
    })
    .finally(() => {
      dispatch(hideLoading())
    })
  }
  
}

export const editRequestStaff = (id, date, startTime, endTime, reasonIn, reasonOut, reason) => {
  const body = {
    date: date,
    start_at: startTime,
    end_at: endTime,
    reason_in: reasonIn,
    reason_out: reasonOut,
    reason: reason
  }
  return dispatch => {
    dispatch(showLoading())
    axios.put(`/timesheet_requests/${id}`, body)
      .then(res => {
        dispatch({type: actionTypes.EDIT_REQUEST_STAFF, data: res.data})
        toastSuccess('Successful!')
      })
      .catch(er => {
        toastError(`${er.response.data}`)
      })
      .finally(() => {
        dispatch(hideLoading())
      })
  }
}