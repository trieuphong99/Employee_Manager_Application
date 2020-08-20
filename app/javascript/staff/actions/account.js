import axios from 'axios';
import actionTypes from '../../commons/const/actionTypes'

//Get CurrentUser
export const getInfoCurrentUser = () => {
  return (dispatch) => {
    axios.get(`users/${current_user_id}`) //hard code
      .then(function (res) {
        dispatch(setCurrentUser(res.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export const setCurrentUser = (data, status) => { return { type: actionTypes.setCurrentUser, data: data, status: status } }
