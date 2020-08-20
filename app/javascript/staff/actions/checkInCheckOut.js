import axios from 'axios'
import moment from 'moment'
import { toastError, toastSuccess } from '../../commons/helpers/toastHelpers'
import { history } from '../../commons/helpers/history/history';
import Time from '../../commons/const/Time';

export const checkIn = (data) => {
  const body = {
    date: moment().format(Time.DMY),
    start_at: moment().format(Time.FullDayFirst),
    reason_in: data.reason
  }
  return (dispatch) => {
    axios.post('/checkin', body)
      .then(function (res) {
        toastSuccess('Successful!')
      })
      .catch(function (error) {
        toastError(error.response.data)
      })
  }
}

export const checkOut = (data) => {
  const body = {
    is_leave_early: moment().diff(moment('17:00', Time.HM)) < 0,
    end_at: moment().format(Time.FullDayFirst),
    reason_out: data.reason
  }
  return (dispatch) => {
    axios.patch('/checkout', body)
      .then(function (res) {
        toastSuccess('Successful!')
        history.push('/timesheets')
      })
      .catch(function (error) {
        toastError(error.response.data)
      })
  }
}