import * as types from '../const/date';

export const pickDate = (startDate, endDate) => ({
  type: types.PICK_DATE,
  data: {
    startDate,
    endDate
  }
})