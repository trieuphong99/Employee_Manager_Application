import * as Yup from 'yup';
import moment from 'moment';

const isSameOrBefore = (startTime, endTime) => {
  return moment(startTime, 'HH:mm').isSameOrBefore(moment(endTime, 'HH:mm'));
}
export const validationSchema = Yup.object().shape({
  start_at: Yup.string().required("Start at is a required field")
    .test(
      'not empty',
      'Start time cant be empty',
      function (value) {
        return !!value;
      }
    )
    .test(
      "start_time_test",
      "Start time must be before end time",
      function (value) {
        const { end_at } = this.parent;
        return isSameOrBefore(value, end_at);
      }
    ),
  end_at:
    Yup.string()
      .required("End time is a required field"),
  reason:
    Yup.string()
      .max(200)
      .matches(/[a-zA-Z]+/, 'Invalid reason!')
      .required("Reason is a required field")
})