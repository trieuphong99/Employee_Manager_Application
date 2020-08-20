import axios from 'axios';
import * as accountContans from '../const/account';
import { showLoading, hideLoading } from './loading';
import { toastError, toastSuccess } from '../../commons/helpers/toastHelpers/index';
import { history } from '../../commons/helpers/history/history'
import _ from 'lodash'

// ---------------API LIST ACCOUNT----------------

export const fetchListAccount = data => {
  return {
    type: accountContans.FETCH_ACCOUNT,
    data
  };
};

//Request list account
export const fetchListAccountRequest = data => {
  const params = {
    current_page: data.currentPage,
    sort_type: data.sortType,
    sort_field: data.sortField
  }
  return dispatch => {
    dispatch(showLoading());
    axios.get('/admin/users', { params })
      .then(res => {
        dispatch(fetchListAccount(res.data));
      })
      .catch(error => {
        toastError(error);
      })
      .finally(
        dispatch(hideLoading())
      )
  };
};

export const getAllUser =  (all_user) => {
  const params = {
    all_user: all_user
  }
  return dispatch => {
    dispatch(showLoading());
    axios.get('/admin/users', {params: params})
      .then(res => {
        dispatch({type: accountContans.GET_ALL_USER, data: res.data});
      })
      .catch(er => {
        toastError(er);
      })
      .finally(() => {
        dispatch(hideLoading());
      })
  }
}

//Request search account
export const searchAccountRequest = (text) => {
  return dispatch => {
    dispatch(showLoading());
    axios.get('/admin/users', {
      params: {
        name: text
      }
    })
      .then(res => {
        dispatch(fetchListAccount(res.data));
      })
      .catch(error => {
        toastError(error);
      })
      .finally(
        dispatch(hideLoading())
      )
  };
};

//------------------HANDLE ERRORS----------------
const handleErrors = (resErrors, setErrors, setSubmitting) => {
  const errors = {}
  _.map(resErrors, error => {
    if (_.startsWith(error, 'Email')) errors['email'] = error
    if (_.startsWith(error, 'Id card')) errors['id_card'] = error
    if (_.startsWith(error, 'Profile phone number')) errors['phone_number'] = error
    if (_.startsWith(error, 'Role admin')) errors['roles'] = error
  })
  setSubmitting(true)
  setErrors(errors)
}

// ---------------API ADD ACCOUNT----------------

export const addAccount = data => {
  return {
    type: accountContans.ADD_ACCOUNT,
    data
  };
};


//Request add account
export const addNewAccountRequest = (data, setErrors, setSubmitting, toggle) => {
  const body = {
    email: data.email,
    joining_date: data.joining_date,
    id_card: data.id_card,
    official_date: data.official_date,
    contract_type: data.contract_type,
    position: data.position,
    password: data.password,
    status: data.status,
    profile_attributes: {
      name: data.name,
      phone_number: data.phone_number,
      address: data.address,
      sex: data.sex,
      date_of_birth: data.date_of_birth
    },
    input_roles: _.map(data.roles, e => e.value)
  };
  return dispatch => {
    return axios.post('/admin/users', body)
      .then(res => {
        dispatch(addAccount(res.data));
        toastSuccess('Successful!');
        setSubmitting(false)
        toggle()
      })
      .catch(error => {
        const errors = error.response.data
        handleErrors(errors, setErrors, setSubmitting)
      })
      .finally(
        dispatch(hideLoading())
      )
  };
};

// ---------------API UPDATE ACCOUNT----------------

export const setAccountEditting = (account) => {
  return {
    type: accountContans.SET_ACCOUNT_EDITTING,
    account,
  };
};

export const updateAccount = data => {
  return {
    type: accountContans.UPDATE_ACCOUNT,
    data
  }
};

//Request update account
export const updateAccountRequest = (id, data, setErrors, setSubmitting, toggle) => {
  const body = {
    email: data.email,
    joining_date: data.joining_date,
    id_card: data.id_card,
    official_date: data.official_date,
    contract_type: data.contract_type,
    position: data.position,
    password: data.password,
    status: data.status,
    profile_attributes: {
      name: data.name,
      phone_number: data.phone_number,
      address: data.address,
      sex: data.sex,
      date_of_birth: data.date_of_birth
    },
    input_roles:  _.map(data.roles, e => e.value)
  };
  return dispatch => {
    dispatch(showLoading());
    axios.put(`/admin/users/${id}`, body)
      .then(res => {
        dispatch(updateAccount(res.data));
        toastSuccess('Successful!');
        setSubmitting(false)
        toggle()
      })
      .catch(error => {
        const errors = error.response.data
        handleErrors(errors, setErrors, setSubmitting)
      })
      .finally(
        dispatch(hideLoading())
      )
  };
};

// ---------------API DELETE ACCOUNT----------------

export const deleteAccount = data => {
  return {
    type: accountContans.DELETE_ACCOUNT,
    data
  };
};

// delete account
export const deleteAccountRequest = (id) => {
  return dispatch => {
    dispatch(showLoading());
    axios.delete(`/admin/users/${id}`)
      .then(res => {
        dispatch(deleteAccount(res.data));
        toastSuccess('Successful!');
        history.push('/');
      })
      .catch(error => {
        toastError(error);
      })
      .finally(
        dispatch(hideLoading())
      )
  };
};

// ---------------API DETAIL ACCOUNT----------------

export const fetchAccountItem = data => {
  return {
    type: accountContans.DETAIL_ACCOUNT,
    data
  };
};

// get detailaccount
export const fetchAccountItemRequest = id => {
  return dispatch => {
    dispatch(showLoading());
    axios.get(`/admin/users/${id}`)
      .then(res => {
        dispatch(fetchAccountItem(res.data));
      })
      .catch(error => {
        toastError(error);
      })
      .finally(
        dispatch(hideLoading())
      )
  };
};
