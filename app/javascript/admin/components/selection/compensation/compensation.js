import React, { useState, useEffect } from "react";
import Time from "../../../../commons/const/Time";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import DateRangePicker from "../../dateRangePicker/";
import { Breadcrumb, BreadcrumbItem, Table, Badge } from "reactstrap";
import Pagination from "../../../../commons/components/pagination";
import ConfirmModal from "../../../../commons/components/modal/confirmModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getListAccCompensation,
  setIsAllowedCompensation
} from "../../../actions/compensation";
import _ from "lodash";
import SearchUser from "../../../../commons/components/searchUser/searchUser";
import SortTarget from "../../../../commons/components/sortTarget";
import CustomPicker from '../../../../commons/components/dateRangePicker/customPicker';
import { pickDate } from '../../../actions/dateRange';

const Compensation = () => {
  const reduxStartDate = useSelector(state => state.dateRange.startDate.format(Time.crossDMY))
  const reduxEndDate = useSelector(state => state.dateRange.endDate.format(Time.crossDMY))
  const [id, setID] = useState(null);
  const [current_page, setCurrentPage] = useState(1);
  const [idStaff, setIDStaff] = useState();
  const [sortField, setSortField] = useState("confirmation_status");
  const [sortType, setSortType] = useState("DESC");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAccCompensation(reduxStartDate, reduxEndDate, idStaff, current_page, sortType, sortField));
  }, [reduxStartDate, reduxEndDate, idStaff, current_page, sortType, sortField]);

  const handleClick = item => {
    dispatch(setIsAllowedCompensation(id, item));
  };
  const letSort = field => {
    setSortType(sortType === "ASC" ? "DESC" : "ASC");
    setSortField(field);
  };
  const listCompensation = useSelector(state => state.getListAccCompensation.data);

  const colors = {
    failed: 'danger',
    rejected: 'danger',
    waiting: 'warning',
    doing: 'warning',
    success: 'success',
    Failed: 'danger',
    Rejected: 'danger',
    Waiting: 'warning',
    Doing: 'warning',
    Success: 'success',
  }

  return (
    <div className="container-fluid">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Compensation</BreadcrumbItem>
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
          <CustomPicker pickDate={pickDate} />
        </div>
      </div>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Date</th>
              <th>For Date</th>
              <th>Start time</th>
              <th>End time</th>
              <SortTarget type="confirmation_status" value="Confirm" sortType={sortType} sortField={sortField} letSort={() => letSort("confirmation_status")} />
            </tr>
          </thead>
          <tbody>
            {
              listCompensation.data === undefined || listCompensation.data.length === 0 ?
                <tr>
                  <td colSpan={7}><p style={{ color: 'red', fontSize: '80%' }}>No data to display</p></td>
                </tr>
                :
                _.map(listCompensation.data, (item, i) => {
                  return (
                    <tr key={i++}>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>{item.for_date}</td>
                      <td>{item.start_at}</td>
                      <td>{item.end_at}</td>
                      <td onClick={() => setID(item.id)}>
                        {item.confirmation_status === "Waiting" ? (
                          <ConfirmModal
                            item={listCompensation.data}
                            confirm={() => handleClick(moment().diff(moment(item.date, Time.crossDMY), 'days') < 0 ? "doing" : "success")}
                            refuse={() => handleClick("rejected")}
                          />
                        ) : (
                            <Badge href="#" color={colors[item.confirmation_status]}>{_.upperFirst(item.confirmation_status)}</Badge>
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
        listCompensation.data !== undefined &&
        <div className="pagination-selections">
          <Pagination totalPage={listCompensation.total_page} pageChange={x => setCurrentPage(x)} />
        </div>
      }

    </div>
  );
};
export default Compensation;
