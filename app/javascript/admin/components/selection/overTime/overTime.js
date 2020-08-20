import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DateRangePicker from "../../dateRangePicker/";
import { Breadcrumb, BreadcrumbItem, Table, Badge } from "reactstrap";
import Pagination from "../../../../commons/components/pagination";
import moment from "moment";
import Time from "../../../../commons/const/Time";
import { useDispatch, useSelector } from "react-redux";
import {
  getListAccOverTime,
  setIsAllowedOverTime
} from "../../../actions/overTime";
import _ from "lodash";
import ConfirmModal from "../../../../commons/components/modal/confirmModal";
import SearchUser from "../../../../commons/components/searchUser/searchUser";
import SortTarget from "../../../../commons/components/sortTarget";
import CustomPicker from '../../../../commons/components/dateRangePicker/customPicker';
import { pickDate } from '../../../actions/dateRange';

const OverTime = props => {
  const reduxStartDate = useSelector(state => state.dateRange.startDate.format(Time.crossDMY))
  const reduxEndDate = useSelector(state => state.dateRange.endDate.format(Time.crossDMY))
  const [id, setID] = useState(null);
  const [current_page, setCurrentPage] = useState(1);
  const [idStaff, setIDStaff] = useState();
  const [sortField, setSortField] = useState("confirmation_status");
  const [sortType, setSortType] = useState("DESC");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListAccOverTime(reduxStartDate, reduxEndDate, idStaff, current_page, sortField, sortType));
  }, [reduxStartDate, reduxEndDate, idStaff, current_page, sortField, sortType]);

  const listOvertime = useSelector(state => state.getListAccOverTime.data);
  const letSort = field => {
    setSortType(sortType === "ASC" ? "DESC" : "ASC");
    setSortField(field);
  };
  const handleClick = item => {
    dispatch(setIsAllowedOverTime(id, item));
  };
  return (
    <div className="container-fluid">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Overtime</BreadcrumbItem>
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
              <th>Start time</th>
              <th>End time</th>
              <th className="reason">Reason</th>
              <SortTarget type="Confirmation_status" value="Confirm" sortType={sortType} sortField={sortField} letSort={letSort} />
            </tr>
          </thead>
          <tbody>
            {
              listOvertime.data === undefined || listOvertime.data.length === 0 ?
              <tr>
                <td colSpan={7}><p style={{ color: 'red', fontSize: '80%' }}>No data to display</p></td>
              </tr>
              :
              _.map(listOvertime.data, (item, i) => {
                return (
                  <tr key={i++}>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.start_at}</td>
                    <td>{item.end_at}</td>
                    <td className="reason">{item.reason}</td>
                    <td onClick={() => setID(item.id)}>
                      {item.confirmation_status === "Waiting" ? (
                        <ConfirmModal
                          item={item}
                          confirm={() => handleClick("confirmed")}
                          refuse={() => handleClick("rejected")}
                        />
                      ) : item.confirmation_status === "Confirmed" ? (
                        <Badge href="#" color="success">Confirmed</Badge>
                      ) : (
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
        listOvertime.data !== undefined &&
        <div className="pagination-selections">
          <Pagination
            totalPage={listOvertime.total_page}
            pageChange={x => setCurrentPage(x)}
          />
        </div>
      }
      
    </div>
  );
};
export default OverTime;
