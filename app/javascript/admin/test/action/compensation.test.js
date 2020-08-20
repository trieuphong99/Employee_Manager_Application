import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import * as types from '../../const/loading';
import * as actionTypes from '../../const/account';
import { getListAccCompensation, setIsAllowedCompensation } from "../../actions/compensation";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({data: {}});

describe("action compensation", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("successfully list data", () => {
    const data = [
      {total_page: expect.any(Number),
      data: [
        {
          id: expect.any(Number),
          date: expect.any(String),
          for_date: expect.any(String),
          start_at: expect.any(String),
          end_at: expect.any(String),
          confirmation_status:expect.any(String),
          name: expect.any(String),
          code: expect.any(String),
          email: expect.any(String),
        }
      ]}
    ];
    const startDate = "12/02/2020";
    const endDate = "13/03/2020";
    const current_page = '1';
    const sort_field = "confirmation_status";
    const sort_type = "ASC";
    const expectActions = [
      {type: types.SHOW_LOADING},
      {type: actionTypes.LIST_ACC_COMPENSATION, data: data},
      {type: types.HIDE_LOADING}
    ];
    store.dispatch(getListAccCompensation(startDate, endDate, current_page, sort_field, sort_type)).then(() => {
      expect(store.getActions()).toEqual(expectActions);
    })
  });
  it("set allowed confirmation_status", () => {
    const id = expect.any(Number);
    const status = expect.any(String);
    const data = [
      {confirmation_status: expect.any(String)}
    ];
    const expectActions = [
      {type: types.SHOW_LOADING},
      {type: actionTypes.SET_ALLOWED_COMPENSATION, data: data},
      {type: types.HIDE_LOADING}
    ];
    store.dispatch(setIsAllowedCompensation(id, status)).then(() => {
      expect(store.getActions()).toEqual(expectActions);
    })
  })
})