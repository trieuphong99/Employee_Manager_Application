import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Table, Badge } from 'reactstrap'
import moment from 'moment'
import "react-dates/lib/css/_datepicker.css";
import _ from 'lodash';
import { bindActionCreators } from 'redux';

import Time from '../../../commons/const/Time';
import * as actions from '../../actions/dayOffs'
import DateRangePicker from '../dateRangePicker'
import CustomPicker from '../../../commons/components/dateRangePicker/customPicker'
import DayOffForm from './DayOffForm'
import Pagination from '../../../commons/components/pagination'
import { pickDate } from '../../actions/dateRange'
import SortTarget from '../../../commons/components/sortTarget';

const DayOffs = props => {
  const { reduxStartDate, reduxEndDate, listDayoff, totalPage, actions } = props
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("All");
  const [sortType, setSortType] = useState("DESC");
  const [sortField, setSortField] = useState("from_date");
  useEffect(() => {
    actions.getStaffDayOff({ startTime: reduxStartDate, endTime: reduxEndDate, currentPage, sortType, sortField, type })
  }, [reduxStartDate, reduxEndDate, currentPage, sortType, sortField, type])
  const letSort = field => {
    setSortType(sortType === "DESC" ? "ASC" : "DESC");
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
      <div className="staff-tool">
        <div style={{ display: "flex" }}>
          <DayOffForm
            title="Dayoff"
            buttonLabel="Add"
          />
          <DateRangePicker
            blockRange="none"
          />
        </div>
        <div>
          <CustomPicker pickDate={pickDate} />
        </div>
      </div>
      <div>
        <Table hover>
          <thead>
            <tr>
              <SortTarget type="from_date" value="From date" sortType={sortType} sortField={sortField} letSort={letSort} />
              <th>To date</th>
              <th>Status</th>
              <th>Is paid</th>
              <th className="reason">Reason</th>
              <SortTarget type="confirmation_status" value="Confirm" sortType={sortType} sortField={sortField} letSort={() => letSort("confirmation_status")} />
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              _.map(listDayoff, (item, index) => {
                const statusColor = { Confirmed: "success", Rejected: "danger", Waiting: "warning" }
                const expired = moment().diff(moment(item.to_date, Time.crossDMY), "days") > 0

                return <tr key={index}>
                  <td>{moment(item.from_date, Time.DMY).format(Time.crossDMY)}</td>
                  <td>{moment(item.to_date, Time.DMY).format(Time.crossDMY)}</td>
                  <td>{item.status}</td>
                  <td>{_.upperFirst(item.is_paid)}</td>
                  <td className="reason">{item.reason}</td>
                  <td><Badge href="#" color={statusColor[item.confirmation_status]}>{item.confirmation_status}</Badge></td>
                  <td style={{ width: "15%" }}>
                    {item.confirmation_status === "Waiting" &&
                      <DayOffForm
                        title="Edit dayoff"
                        buttonLabel="Edit"
                        item={item}
                      />
                    }
                  </td>
                </tr>
              }
              )
            }
          </tbody>
        </Table>
      </div>
      <div>
        <Pagination totalPage={totalPage} pageChange={setCurrentPage} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    listDayoff: state.dayOffs.data,
    totalPage: state.dayOffs.total_page,
    reduxStartDate: state.dateRange.startDate.format(Time.crossDMY),
    reduxEndDate: state.dateRange.endDate.format(Time.crossDMY)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    pickDate: () => dispatch(pickDate)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayOffs);
