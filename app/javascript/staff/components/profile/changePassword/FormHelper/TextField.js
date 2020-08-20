import React from 'react'
// import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

//TextField là 1 React Component và được viết theo arrow function

const renderTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="form-group row">
    <label className="col-sm-3 col-form-label">{label}(*)</label>
    <div className="col-sm-9 pl-0">
      <input {...input} type={type} className="form-control input-password" placeholder={label} />
      {touched &&
        ((error && <span className="error">{error}</span>) ||
          (warning && <span className="warning">{warning}</span>))}
    </div>
  </div>
)

renderTextField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object
}

export default renderTextField