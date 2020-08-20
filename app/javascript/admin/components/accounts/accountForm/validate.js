import * as Yup from 'yup';
import moment from 'moment';

const commonValidationSchema = {
  email:
    Yup.string()
      .trim()
      .email("Email must be a valid email")
      .required("Email is a required field"),
  id_card:
    Yup.string()
      .trim()
      .min(9, "Id card must be at least 9 characters")
      .max(12, "Id card must be at most 12 characters")
      .matches(/^[0-9][^#&<>\~;$^%{}?a-zA-Z]{8,11}$/, "Id card cannot contain special characters")
      .required("Id card is a required field"),
  joining_date:
    Yup.string()
      .test(
        "joining_date",
        "Joining date must greater than or equal to current date",
        value => {
          return moment().diff(moment(value), 'day') <= 0;
        }
      )
      .required("Joining date is a required field"),
  official_date:
    Yup.date()
      .when(
        'joining_date',
        (joining_date, schema) => (joining_date && schema.min(joining_date, "Official date must be after joining date")),
      )
      .nullable(true),
  contract_type: Yup.string().nullable(true).required("Contract type is a required field"),
  position: Yup.string().required("Position is a required field"),
  status: Yup.string().required("Status is a required field"),
  roles: Yup.array().required("Roles is a required field"),
  name:
    Yup.string()
      .trim()
      .min(4, "Name must be at least 4 characters")
      .max(30, "Name must be at most 30 characters")
      .required("Name is a required field"),
  phone_number:
    Yup.string()
      .trim()
      .min(10, "Phone number must be at least 10 characters")
      .max(11, "Phone number must be at most 11 characters")
      .matches(/^[0-9][^#&<>\~;$^%{}?a-zA-Z]{9,10}$/, "Phone number cannot contain special characters")
      .required("Phone number is a required field"),
  address:
    Yup.string()
      .trim()
      .max(100, "Address must be at most 100 characters")
      .required("Address is a required field"),
  sex: Yup.string().required("Gender is a required field"),
  date_of_birth:
    Yup.string()
      .test(
        "date_of_birth",
        "Date of birth must less than current date",
        value => {
          return moment().diff(moment(value), 'day') > 0;
        }
      )
      .required("Date of birth is a required field"),
}

export const validationSchema = item => {
  const specifiedValidationSchema = item ? {
    code:
      Yup.string()
        .matches(/^B[0-9]{6}$/, "Starts with letter B and ends with 6 digits")
        .required("Code is a required field"),
    joining_date:
      Yup.string()
        .required("Joining date is a required field"),
  } : {
      password:
        Yup.string()
          .matches(/^[a-zA-Z0-9]{6,15}$/, "Password cannot contain special characters")
          .min(6, "Password must be at least 6 characters")
          .max(15, "Password must be at most 15 characters")
          .required("Password is a required field"),
    }

  return Yup.object().shape({
    ...commonValidationSchema,
    ...specifiedValidationSchema
  })
}

export const initialValues = item => {
  return item ? {
    ...item,
    status: item.status ? "Active" : "Deactive",
    roles: _.map(item.roles, e => ({
      label: e.name,
      value: _.toLower(e.name)
    })
    ),
    name: item.profile.name,
    phone_number: item.profile.phone_number,
    address: item.profile.address,
    sex: item.profile.sex,
    date_of_birth: item.profile.date_of_birth
  } : {
      email: '',
      id_card: '',
      joining_date: '',
      contract_type: '',
      position: '',
      status: '',
      roles: [],
      name: '',
      phone_number: '',
      address: '',
      sex: '',
      date_of_birth: '',
      password: ''
    }
}
