import reducer from '../../reducer/dayOff';
import * as types from '../../const/account';

describe('day off reducer', () => {
  it('the initial state of get list data day off', () => {
    expect(reducer(undefined, [])).toEqual({
      data : [],
      confirmation_status: ""
    });
  });
  it('fetch list data', () => {
    const data = [
      {
        total_page: expect.any(Number),
        data: [
          {
            id: expect.any(Number),
            request_date: expect.any(String),
            from_date: expect.any(String),
            to_date: expect.any(String),
            status: expect.any(String),
            reason:expect.any(String),
            confirmation_status:expect.any(String),
            is_paid: expect.any(Boolean),
            account_id: expect.any(Number),
            name: expect.any(String),
            code: expect.any(String),
            email: expect.any(String),
          },
        ],
      },
    ];
    const expectActions = {
      type: types.LIST_ACC_DAYOFF,
      data: data,
      confirmation_status: ''
    }
    expect(reducer([], expectActions )).toEqual({data: data})
  });
  it('set allowed comfirmation status reducer', () => {
    const data = 
      {
        total_page: expect.any(Number),
        data: [
          {
            id: expect.any(Number),
            date: expect.any(String),
            start_at: expect.any(String),
            end_at: expect.any(String),
            reason: expect.any(String),
            confirmation_status: expect.any(String),
            name: expect.any(String),
            code: expect.any(String),
            email: expect.any(String),
          },
        ],
      };
    const received = {
      id: expect.any(Number),
      name: expect.any(String),
      confirmation_status: expect.any(String)
    }
    expect(reducer(data, received)).toEqual(data)
  })
})