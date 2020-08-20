import * as Yup from 'yup';

export const validationSchema = Yup.object({
  status:
    Yup.string()
      .required("Status is a required field"),
  reason:
    Yup.string()
      .max(200)
      .matches(/[a-zA-Z]+/, 'Invalid reason!')
      .required("Reason is a required field")
})