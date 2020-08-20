import * as types from '../../const/date';
import { pickDate } from '../../actions/dateRange';

describe('date range', () => {
  it('date range', () => {
    const startDate = '';
    const endDate = '';
    const expectAction = {
      type: types.PICK_DATE,
      data: {
        startDate: startDate,
        endDate: endDate
      }
    };
    expect(pickDate(startDate, endDate)).toEqual(expectAction)
  })
})