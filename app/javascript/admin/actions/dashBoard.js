import axios from 'axios';
import {showLoading, hideLoading} from './loading';
import * as actionTypes from '../const/account';

export const getDataDashBoard = () => {
  return dispatch => {
    dispatch(showLoading());
    return axios.get('/admin/dashboards')
      .then(res => {
        dispatch({type: actionTypes.GET_DATA_DASHBOARD, data: res.data})
      })
      .catch(er => {
        console.log(er);
      })
      .finally(() => {
        dispatch(hideLoading())
      })
  }
}
export const getDataPieChart = (startDate, endDate, selection) => {
  const params = {
    from_date: startDate,
    to_date: endDate,
    selection: String(selection)
  }
  return dispatch => {
    dispatch(showLoading());
    return axios.get('/admin/dashboards/pie_chart', {params: params})
      .then(res => {
        dispatch({type: actionTypes.GET_DATA_PIECHART, data: res.data})
      })
      .catch(er => {
        console.log(er);
      })
      .finally(() => {
        dispatch(hideLoading())
      })
  }
}
export const getDataBarChart = (num) => {
  const params = {
    number_of_week: String(num)
  }
  return dispatch => {
    dispatch(showLoading());
    return axios.get('/admin/dashboards/bar_chart', {params: params})
      .then(res => {
        dispatch({type: actionTypes.GET_DATA_BARCHART, data: res.data})
      })
      .catch(er => {
        console.log(er);
      })
      .finally(() => {
        dispatch(hideLoading())
      })
  }
}