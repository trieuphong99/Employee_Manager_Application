import actionTypes from '../const/actionTypes';
import axios from 'axios'
import { hideLoading, showLoading } from './loading'
import { toastError, toastSuccess } from '../../commons/helpers/toastHelpers'

const handleErrors = (resErrors, setErrors, setSubmitting) => {
  const errors = {}
  errors['from_date'] = resErrors[0]
  setSubmitting(true)
  setErrors(errors)
}

// --------------GET DAYOFF LIST---------------
export const setDayOffs = (data) => {
  return {
    type: actionTypes.GET_DAYOFF,
    data
  }
}

export const getStaffDayOff = (data) => {
  const params = {
    from_date: data.startTime,
    to_date: data.endTime,
    current_page: String(data.currentPage),
    is_paid: data.is_paid,
    sort_type: data.sortType,
    sort_field: data.sortField,
    filter_type: data.type
  }
  return (dispatch) => {
    dispatch(showLoading())
    axios.get('/dayoffs', { params })
      .then(function (res) {
        dispatch(setDayOffs(res.data))
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {
        dispatch(hideLoading())
      });
  }
}

// ---------------ADD DAYOFF---------------
const setAddDayOffs = data => {
  return {
    type: actionTypes.ADD_DAYOFF,
    data
  }
}
export const addDayOffs = (data, setErrors, setSubmitting, toggle) => {
  const body = {
    from_date: data.from_date,
    to_date: data.to_date,
    request_date: data.request_date,
    reason: data.reason,
    status: data.status,
    is_paid: data.is_paid
  }
  return dispatch => {
    dispatch(showLoading())
    axios.post('/dayoffs', body)
      .then(function (res) {
        dispatch(setAddDayOffs(res.data))
        toastSuccess("Successful!")
        toggle()
      })
      .catch(function (error) {
        const errors = error.response.data
        handleErrors(errors, setErrors, setSubmitting)
      })
      .finally(function () {
        dispatch(hideLoading())
      });
  }
}
//------------------UPDATE DAYOFFS-----------------
const setUpdateDayOffs = data => {
  return {
    type: actionTypes.UPDATE_DAYOFF,
    data
  }
}
export const updateDayOffs = (id, data, setErrors, setSubmitting, toggle) => {
  const body = {
    from_date: data.from_date,
    to_date: data.to_date,
    request_date: data.request_date,
    reason: data.reason,
    status: data.status,
    is_paid: data.is_paid
  }
  return dispatch => {
    dispatch(showLoading())
    axios.put(`/dayoffs/${id}`, body)
      .then(function (res) {
        dispatch(setUpdateDayOffs(res.data))
        toastSuccess("Successful!")
        toggle()
      })
      .catch(function (error) {
        const errors = error.response.data
        handleErrors(errors, setErrors, setSubmitting)
      })
      .finally(function () {
        dispatch(hideLoading())
      });
  }
}