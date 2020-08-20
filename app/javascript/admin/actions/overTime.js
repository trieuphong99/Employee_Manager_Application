import * as ActionTypes from "../const/account";
import axios from "axios";
import { showLoading, hideLoading } from "./loading";
import { history } from "../../commons/helpers/history/history";
import { toastSuccess, toastError } from "../../commons/helpers/toastHelpers";

export const getListAccOverTime = (startDate, endDate, user_id, current_page, sort_field, sort_type) => {
  const params = {
    from_date: startDate,
    to_date: endDate,
    user_id: user_id,
    current_page: String(current_page),
    sort_field: sort_field,
    sort_type: sort_type
  };
  return dispatch => {
    dispatch(showLoading());
    return axios
      .get("/admin/user_overtimes", { params: params })
      .then(res => {
        dispatch({ type: ActionTypes.LIST_ACC_OVERTIME, data: res.data });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };
};

export const setIsAllowedOverTime = (id, status) => {
  const body = {
    confirmation_status: String(status)
  };
  return dispatch => {
    dispatch(showLoading());
    return axios
      .patch(`/admin/user_overtimes/${id}`, body)
      .then(res => {
        dispatch({ type: ActionTypes.SET_ALLOWED_OVERTIME, confirmation_status: res.data });
        toastSuccess("Successful!");
      })
      .catch(function(error) {
        toastError(`${error.response.data}`);
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };
};
