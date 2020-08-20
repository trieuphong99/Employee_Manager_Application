import React from 'react';
import './ChangePassword.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/password';
import ChangePasswordForm from './redux-form/form';

function ChangePassword(props) {
  const letChangePassword = (data) => {
    props.changePasswordUser(data)
    props.getBack()
  }
  return (
    <ChangePasswordForm onSubmit={letChangePassword} />
  );
}

const mapStatetoProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changePasswordUser: (data) => { dispatch(actions.changePasswordUser(data)) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ChangePassword);