import { getListAccOverTime, setIsAllowedOverTime } from "../../actions/overTime";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actionType from "../../const/account";
import * as type from "../../const/loading";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({data: {}})
describe("action overtime", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("successfully list data", () => {
    const data = [
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
      },
    ];
    const startDate = "12/02/2020";
    const endDate = "13/03/2020";
    const current_page = '1';
    const sort_field = "confirmation_status";
    const sort_type = "ASC";
    
    const expectAction1 = [
      {type: type.SHOW_LOADING},
      { type: actionType.LIST_ACC_OVERTIME, data: data },
      {type: type.HIDE_LOADING}
    ];
    store.dispatch(getListAccOverTime(startDate, endDate, current_page, sort_field, sort_type)).then(() => {
      expect(store.getActions()).toEqual(expectAction1);
    })
  });
  it('set allowed confirmation', () => {
    const id = expect.any(Number);
    const status = expect.any(String);
    const data = [
      {confirmation_status: expect.any(String)}
    ]
    const expectAction = [
      {type: type.SHOW_LOADING},
      {type: actionType.SET_ALLOWED_OVERTIME, confirmation_status : data},
      {type: type.HIDE_LOADING}
    ];
    store.dispatch(setIsAllowedOverTime(id, status)).then(() => {
      expect(store.getActions()).toEqual(expectAction);
    })
  })
});
