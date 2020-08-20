import React from 'react'

import PropTypes from 'prop-types'

const spanStyle = {
  display: "block",
  marginLeft: "15px",
  width: "100%",
  marginTop: "0.25rem",
  fontSize: "80%",
  color: "#dc3545",
}

const renderTextAreaField = ({
  input,
  type,
  meta: { touched, error, warning },
}) => (
    <div className="form-group">
      <textarea {...input} type={type} className="form-control" />
      {touched &&
        ((error && <span style={spanStyle} className="invalid-feedback">{error}</span>) ||
          (warning && <span className="warning">{warning}</span>))}
    </div>
  )

renderTextAreaField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
}

export default renderTextAreaField