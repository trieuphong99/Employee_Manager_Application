import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DateRangePicker from "../../dateRangePicker/";
import { Breadcrumb, BreadcrumbItem, Table } from "reactstrap";
import { getListAccountsDayOff, setIsAllowedDayOff } from "../../../actions/dayOff";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";
import Time from "../../../../commons/const/Time";
import { Tooltip, Badge } from "reactstrap";
import Pagination from "../../../../commons/components/pagination";
import ConfirmModal from "../../../../commons/components/modal/confirmModal";
import SearchUser from "../../../../commons/components/searchUser/searchUser";
import SortTarget from "../../../../commons/components/sortTarget";
import CustomPicker from '../../../../commons/components/dateRangePicker/customPicker';
import { pickDate } from '../../../actions/dateRange';

const DayOff = () => {
  const reduxStartDate = useSelector(state => state.dateRange.startDate.format(Time.crossDMY))
  const reduxEndDate = useSelector(state => state.dateRange.endDate.format(Time.crossDMY))
  const [id, setID] = useState(null);
  const [current_page, setCurrentPage] = useState(1);
  const [idStaff, setIDStaff] = useState();
  const [sortField, setSortField] = useState("confirmation_status");
  const [sortType, setSortType] = useState("DESC");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAccountsDayOff(reduxStartDate, reduxEndDate, idStaff, current_page, sortType, sortField));
  }, [reduxStartDate, reduxEndDate, idStaff, current_page, sortType, sortField]);

  const listDayOff = useSelector(state => state.getListAccountsDayOff.data);
  const handleClick = (item) => {
    dispatch(setIsAllowedDayOff(id, item));
  }
  const letSort = field => {
    setSortType(sortType === "ASC" ? "DESC" : "ASC");
    setSortField(field);
  };
  return (
    <div className="container-fluid">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Dayoff</BreadcrumbItem>
      </Breadcrumb>
      <div className="saffs-search">
        <div style={{ display: "flex" }}>
          <div className="times-select">
            <DateRangePicker
              blockRange="none"
            />
          </div>
          <div>
            <SearchUser onSelectStaff={d => setIDStaff(d)} />
          </div>
        </div>
        <div>
          <CustomPicker pickDate={pickDate}/>
        </div>
      </div>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Date</th>
              <th>Date range</th>
              <th>Status</th>
              <th className="reason">Reason</th>
              <SortTarget type="confirmation_status" value="Confirm" sortType={sortType} sortField={sortField} letSort={letSort} />
            </tr>
          </thead>
          <tbody>
            {
              listDayOff.data === undefined || listDayOff.data.length === 0 ?
              <tr>
                <td colSpan={7}><p style={{ color: 'red', fontSize: '80%' }}>No data to display</p></td>
              </tr>
              :
              _.map(listDayOff.data, (item, i) => {
                return (
                  <tr key={i++}>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.request_date}</td>
                    <td>{item.from_date} - {item.to_date}</td>
                    <td>{item.status}</td>
                    <td className="reason">{item.reason}</td>
                    <td onClick={() => setID(item.id)}>
                      {item.confirmation_status === "Waiting" ? (
                        <ConfirmModal
                          item={listDayOff.data}
                          confirm={() => handleClick("confirmed")}
                          refuse={() => handleClick("rejected")}
                        />
                      ) : (
                          item.confirmation_status === "Confirmed" ?
                            <Badge href="#" color="success">Confirmed</Badge>
                            :
                            <Badge href="#" color="danger">Rejected</Badge>
                        )}
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
      {
        listDayOff.data !== undefined &&
        <div className="pagination-selections">
          <Pagination totalPage={listDayOff.total_page} pageChange={(x) => setCurrentPage(x)} />
        </div>
      }
      
    </div>
  );
};

export default DayOff;