import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderTextField from '../FormHelper/TextField'
import validate from './validate'

let ChangePasswordForm = (props) => {
  //handleSubmit : khi click vào nút submit
  //invalid      : khi không thỏa mãn validation (validation không hợp lệ)
  //submitting   : khi form đang submit (để tránh việc submit nhiều lần 1 lúc)
  const { handleSubmit, invalid, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="change-password">
        <div className="title-change-password">Change Password</div>
        <div className="content-change-password">
          <div className="content-change-password-right">
            <Field
              id='current-password'
              label='Current Password'
              type="password"
              className="current-password"
              placeholder="Current Password"
              name="currentPassword"
              component={renderTextField}
            />
            <Field
              id='new-password'
              label='New Password'
              type="password"
              className="new-password"
              placeholder="New Password"
              name="newPassword"
              component={renderTextField}
            />
            <Field
              id='password-confirmation'
              label='New Password Confirmation'
              type="password"
              className="password-confirmation"
              placeholder="New Password Confirmation"
              name="passwordConfirmation"
              component={renderTextField}
            />
          </div>
        </div>
        <div>
        <button
          //nếu như validation không hợp lệ hoặc khi form đang submit thì ngăn không cho submit
          disabled={invalid || submitting}
          className="btn btn-change-password"
          type="submit"
        >
          Save
        </button>
        </div>
      </div>
    </form>
  )
}

ChangePasswordForm = reduxForm({
  // a unique name for the form
  form: 'CHANGE_PASSWORD',
  validate: validate //tất cả code validate để trong validate.js mà import vào
})(ChangePasswordForm)

export default ChangePasswordForm
