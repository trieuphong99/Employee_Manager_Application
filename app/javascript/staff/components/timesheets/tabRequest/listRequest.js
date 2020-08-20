import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Time from "../../../../commons/const/Time";
import { getListRequestEditStaff } from "../../../actions/timeSheet";
import SortTarget from "../../../../commons/components/sortTarget";
import CustomPicker from "../../../../commons/components/dateRangePicker/customPicker";
import { pickDate } from "../../../actions/dateRange";
import DateRangePicker from "../../dateRangePicker";
import { Table, Badge } from "reactstrap";
import Pagination from '../../../../commons/components/pagination/index';
import EditRequest from "./editRequestModal";

const listRequest = (props) => {
  const reduxStartDate = useSelector((state) =>
    state.dateRange.startDate.format(Time.crossDMY)
  );
  const reduxEndDate = useSelector((state) =>
    state.dateRange.endDate.format(Time.crossDMY)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("DESC");
  const [sortField, setSortField] = useState("date");
  const dispatch = useDispatch();
  const letSort = (field) => {
    setSortType(sortType === "ASC" ? "DESC" : "ASC");
    setSortField(field);
  };
  useEffect(() => {
    dispatch(
      getListRequestEditStaff(
        reduxStartDate,
        reduxEndDate,
        currentPage,
        sortType,
        sortField
      )
    );
  }, [reduxStartDate, reduxEndDate, currentPage, sortType, sortField]);
  const listRequestStaff = useSelector((state) => state.timeSheet.listRequest);
  const statusColor = { Confirmed: "success", Rejected: "danger", Waiting: "warning" }
  return (
    <div className="tables-saffs-wrapper">
      <div className="saffs-search">
        <div className="times-select">
          <DateRangePicker blockRange="none" />
        </div>
        <CustomPicker pickDate={pickDate} />
      </div>
      <div>
        <Table hover>
          <thead>
            <tr>
              <SortTarget
                type="date"
                value="Date"
                sortType={sortType}
                sortField={sortField}
                letSort={letSort}
              />
              <th>Checkin</th>
              <th className="reason">Reason inlate</th>
              <th>Checkout</th>
              <th className="reason">Reason leave early</th>
              <th className="reason">Reason request</th>
              <SortTarget
                type="confirmation_status"
                value="Confirm"
                sortType={sortType}
                sortField={sortField}
                letSort={letSort}
              />
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listRequestStaff.data === undefined || listRequestStaff.lenght === 0 ?
              <tr>
                <td colSpan={7}><p style={{ color: 'red', fontSize: '80%' }}>No data to display</p></td>
              </tr>
              :
              _.map(listRequestStaff.data, (item, i) => {
                return (
                  <tr key={i++}>
                    <td>{item.date}</td>
                    <td>{item.start_at}</td>
                    <td className="reason">{item.reason_in}</td>
                    <td>{item.end_at}</td>
                    <td className="reason">{item.reason_out}</td>
                    <td className="reason">{item.reason}</td>
                    <td><Badge href="#" color={statusColor[item.confirmation_status]}>{item.confirmation_status}</Badge></td>
                    <td>
                      {item.confirmation_status === "Waiting" &&
                        <EditRequest data={item} id={item.id} />
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
      <div>
        <Pagination totalPage={listRequestStaff.total_page} pageChange={e => setCurrentPage(e)} />
      </div>
    </div>
  );
};
export default listRequest;
