import * as ActionTypes from '../const/account';
import axios from 'axios';
import {showLoading, hideLoading} from './loading';
import {toastSuccess, toastError} from '../../commons/helpers/toastHelpers';
import { history } from '../../commons/helpers/history/history';

export const getListAccCompensation = (startDate, endDate, user_id, current_page, sort_type, sort_field) => {
  const params = {
    from_date: startDate,
    to_date: endDate,
    user_id: user_id,
    current_page: String(current_page),
    sort_type: sort_type,
    sort_field: sort_field
  }
  return dispatch => {
    dispatch(showLoading());
    return axios.get('/admin/user_compensations', {params: params})
      .then(res => {
        dispatch({type: ActionTypes.LIST_ACC_COMPENSATION, data: res.data})
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch(hideLoading())
      })
  }
}

export const setIsAllowedCompensation = (id, status) => {
  const body = {
    confirmation_status: String(status)
  }
  return (dispatch) => {
    dispatch(showLoading())
    return axios.patch(`/admin/user_compensations/${id}`, body)
      .then(res => {
        dispatch({type: ActionTypes.SET_ALLOWED_COMPENSATION, confirmation_status: res.data})
        toastSuccess('Successful!');
      })
      .catch(er => {
        toastError(`${er.response.data}`);
      })
      .finally(() => {
        dispatch(hideLoading())
      })
  }
}