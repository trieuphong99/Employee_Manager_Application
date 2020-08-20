import * as types from '../const/date';
import moment from 'moment';

let initialState = {
  startDate: moment().subtract(1, 'months').startOf("month"),
  endDate: moment().add(1, 'months').endOf('month')
};

const dateRangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PICK_DATE:
      const { startDate, endDate } = action.data
      return {
        startDate, endDate
      };
    default:
      return state;
  }
}
export default dateRangeReducer;