import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Table, Badge } from 'reactstrap'
import moment from 'moment'
import "react-dates/lib/css/_datepicker.css";
import _ from 'lodash';
import { bindActionCreators } from 'redux';

import Time from '../../../commons/const/Time';
import * as actions from '../../actions/overtimes'
import DateRangePicker from '../dateRangePicker'
import Pagination from '../../../commons/components/pagination'
import OvertimesFormModal from './OvertimeForm'
import CustomPicker from '../../../commons/components/dateRangePicker/customPicker'
import { pickDate } from '../../actions/dateRange'
import SortTarget from '../../../commons/components/sortTarget';

const Overtimes = props => {
  const { reduxStartDate, reduxEndDate, listOvertimes, totalPage, actions } = props
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("All");
  const [sortType, setSortType] = useState("DESC");
  const [sortField, setSortField] = useState("date");
  useEffect(() => {
    actions.getOvertimes({ startTime: reduxStartDate, endTime: reduxEndDate, currentPage, sortType, sortField, type })
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
        <BreadcrumbItem active>Overtime</BreadcrumbItem>
      </Breadcrumb>
      <div className="staff-tool">
        <div style={{ display: "flex" }}>
          <OvertimesFormModal
            title="Overtime"
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
              <SortTarget type="Date" value="Date" sortType={sortType} sortField={sortField} letSort={() => letSort("date")} />
              <th>Start</th>
              <th>End</th>
              <th className="reason">Reason</th>
              <SortTarget type="confirmation_status" value="Confirm" sortType={sortType} sortField={sortField} letSort={() => letSort("confirmation_status")} />
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              _.map(listOvertimes, (item, index) => {
                const statusColor = { Confirmed: "success", Rejected: "danger", Waiting: "warning" }
                const expired = moment().diff(moment(item.date, Time.crossDMY), "days") > 0

                return (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.start_at}</td>
                    <td>{item.end_at}</td>
                    <td className="reason">{item.reason}</td>
                    <td><Badge href="#" color={statusColor[item.confirmation_status]}>{item.confirmation_status}</Badge></td>
                    <td style={{ width: "15%" }}>
                      {item.confirmation_status === "Waiting" &&
                        <OvertimesFormModal
                          title="Edit overtime"
                          buttonLabel="Edit"
                          item={item}
                          id={item.id}
                        />
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
        <Pagination totalPage={totalPage} pageChange={setCurrentPage} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    listOvertimes: state.overtimes.data,
    totalPage: state.overtimes.total_page,
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

export default connect(mapStateToProps, mapDispatchToProps)(Overtimes);
