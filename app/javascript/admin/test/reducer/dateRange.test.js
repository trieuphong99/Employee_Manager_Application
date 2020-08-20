import reducer from "../../reducer/dateRange";
import moment from "moment";
import { pickDate } from "../../actions/dateRange";

describe("date range", () => {
  it("the initial state", () => {
    expect(reducer(undefined, [])).toEqual({
      startDate: moment().subtract(1, "months").startOf("month"),
      endDate: moment().add(1, "months").endOf("month"),
    });
  });
  it("pick date", () => {
    const startDate = expect.any(String);
    const endDate = expect.any(String);
    const expectActions = {
      startDate,
      endDate,
    };

    expect(reducer([], pickDate(startDate, endDate))).toEqual(expectActions);
    expect(reducer({
      startDate: moment().subtract(1, "months").startOf("month"),
      endDate: moment().add(1, "months").endOf("month"),
    }, pickDate(startDate, endDate))).toEqual(expectActions)
  });
});
