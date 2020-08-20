import axios from 'axios'
import { showLoading } from './loading'
import { hideLoading } from './loading'
import { toastError, toastSuccess } from '../../commons/helpers/toastHelpers';

export const changePasswordUser = (data) => {
  var body = {
    current_password: data.currentPassword,
    new_password: data.newPassword,
    password_confirmation: data.passwordConfirmation
  }
  return (dispatch) => {
    dispatch(showLoading())
    axios.post(`/change_password`, body)
      .then(function (res) {
        toastSuccess('Successful!')
      })
      .catch(function (error) {
        toastError(`${error.response.data}`)
      })
      .finally(function () {
        dispatch(hideLoading())
      });
  }
}
