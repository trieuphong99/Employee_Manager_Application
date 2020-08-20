import actionTypes from '../const/actionTypes';
import axios from 'axios'
import { hideLoading, showLoading } from './loading'
import { toastError, toastSuccess } from '../../commons/helpers/toastHelpers'

const handleErrors = (resErrors, setErrors, setSubmitting) => {
  const errors = {}
  errors['date'] = resErrors
  setSubmitting(true)
  setErrors(errors)
}

// --------------GET OVERTIMES LIST---------------
export const setOvertimes = (data) => {
  return {
    type: actionTypes.GET_OVERTIMES,
    data
  }
}

export const getOvertimes = (data) => {
  const params = {
    from_date: data.startTime,
    to_date: data.endTime,
    current_page: String(data.currentPage),
    sort_type: data.sortType,
    sort_field: data.sortField,
    filter_type: data.type
  }
  return (dispatch) => {
    dispatch(showLoading())
    axios.get('/overtimes', { params })
      .then(function (res) {
        dispatch(setOvertimes(res.data))
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {
        dispatch(hideLoading())
      });
  }
}

// ---------------ADD OVERTIMES---------------
const setAddOvertimes = data => {
  return {
    type: actionTypes.ADD_OVERTIMES,
    data
  }
}
export const addOvertimes = (data, setErrors, setSubmitting, toggle) => {
  const body = {
    date: data.date,
    start_at: data.start_at,
    end_at: data.end_at,
    reason: data.reason
  }
  return dispatch => {
    dispatch(showLoading())
    axios.post('/overtimes', body)
      .then(function (res) {
        dispatch(setAddOvertimes(res.data))
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

// --------------- UPDATE OVERTIMES ----------------
const setUpdateOvertimes = data => {
  return {
    type: actionTypes.UPDATE_OVERTIMES,
    data
  }
}

export const updateOvertimes = (id, data, setErrors, setSubmitting, toggle) => {
  const body = {
    date: data.date,
    start_at: data.start_at,
    end_at: data.end_at,
    reason: data.reason
  }
  return dispatch => {
    axios.put(`/overtimes/${id}`, body)
      .then(function (res) {
        dispatch(setUpdateOvertimes(res.data))
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