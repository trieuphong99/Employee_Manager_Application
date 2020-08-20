const validate = value => {
  const errors = {}
  // danh sách Field cần validate lấy theo thuộc tính name của từng Field muốn validate
  const { currentPassword, newPassword, passwordConfirmation } = value
  // validate cho currentPassword
  if (!currentPassword) {
    errors.currentPassword = 'Please enter your password' //in ra lỗi 
  } else if (currentPassword.trim().length < 6) {
    errors.currentPassword = 'Password must be at least 6 characters' //in ra lỗi 
  } else if (currentPassword.trim().length > 15) {
    errors.currentPassword = 'Password must be at most 15 characters' //in ra lỗi 
  }
  // validate cho newPassword
  if (!newPassword) {
    errors.newPassword = 'Please enter new password' //in ra lỗi 
  } else if (newPassword.trim().length < 6) {
    errors.newPassword = 'New password must be at least 6 characters' //in ra lỗi 
  } else if (newPassword.trim().length > 15) {
    errors.newPassword = 'New password must be at most 15 characters' //in ra lỗi 
  }
  // validate cho passwordConfirmation
  if (!passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter new password again' //in ra lỗi 
  } else if (passwordConfirmation.trim().length < 6) {
    errors.passwordConfirmation = 'New password must be at least 6 characters' //in ra lỗi 
  } else if (passwordConfirmation.trim().length > 15) {
    errors.passwordConfirmation = 'New password must be at most 15 characters' //in ra lỗi 
  }
  else if (passwordConfirmation !== newPassword) {
    errors.passwordConfirmation = 'Password confirmation does not match' //in ra lỗi 
  }
  return errors
}

export default validate