const validate = value => {
  const errors = {}
  const { Reason } = value
  if (!Reason) {
    errors.Reason = 'Reason is a required field'
  }else if(!/^.*[a-zA-Z]+.*$/.test(Reason)) {
    errors.Reason = 'Reason can not contain special characters' 
  } else if (Reason.length < 5) {
    errors.Reason = 'The reason must be at least 5 characters'
  } else if (Reason.length > 200) {
    errors.Reason = 'The reason must be at most 200 characters'
  }
  return errors
}

export default validate