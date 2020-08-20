import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, UncontrolledPopover, Button, Badge } from "reactstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../actions/timeSheet";
import moment from "moment";
import classNames from "classnames";
import _ from "lodash";
import DateRangePicker from "../../dateRangePicker";
import "react-dates/lib/css/_datepicker.css";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { bindActionCreators } from "redux";
import constants from "../../../../commons/components/constantTimesheets";

import Time from "../../../../commons/const/Time";
import OffSet from "./offset";
import EnoughOffset from "./enoughOffset";
import NotEnoughOffset from "./notEnoughOffset";
import EditOffset from "./editOffset";
import Pagination from "../../../../commons/components/pagination";
import calculateTimeWork from "../../../../commons/function/calculateTimeWork";
import calculateTimeOff from "../../../../commons/function/calculateTimeOff";
import SortTarget from "../../../../commons/components/sortTarget";
import CustomPicker from "../../../../commons/components/dateRangePicker/customPicker";
import { pickDate } from "../../../actions/dateRange";
import EditReasonModal from "./editReasonModal";

const listTimesheets = (props) => {
  const { reduxStartDate, reduxEndDate, timeSheet, dataDetail, actions } = props;
  const [type, setType] = useState("All");
  const [sortType, setSortType] = useState("DESC");
  const [sortField, setSortField] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setOpen] = useState(false);
  // const [id, setID] = useState("");
  
  useEffect(() => {
    actions.getStaffTimeSheet({
      startTime: reduxStartDate,
      endTime: reduxEndDate,
      currentPage,
      sortType,
      sortField,
      type,
    });
    // eslint-disable-next-line
  }, [reduxStartDate, reduxEndDate, currentPage, sortType, sortField, type]);

  const letSort = (field) => {
    setSortType(sortType === "DESC" ? "ASC" : "DESC");
    setSortField(field);
  };
  //code show leave
  const [showLeave, setShowLeave] = useState(false);
  const reload = () => {
    actions.getStaffTimeSheet({ startTime: reduxStartDate, endTime: reduxEndDate, currentPage, sortType, sortField, type });
  }

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
  const refShowLeave = useRef();
  const clickOnLeaveList = () => {
    setShowLeave(true);
    document.addEventListener("click", clickOutSide);
  };
  const clickOutSide = (event) => {
    const { target } = event;
    if (refShowLeave.current !== null) {
      if (!refShowLeave.current.contains(target)) {
        setShowLeave(false);
        document.removeEventListener("click", clickOutSide);
      }
    }
  };
  useEffect(() => {
    return () => {
      if (showLeave === true)
        document.removeEventListener("click", clickOutSide);
    };
    // eslint-disable-next-line
  }, [showLeave]);
  useEffect(() => {
    return () => document.removeEventListener("click", clickOutSide);
    // eslint-disable-next-line
  }, []);
  //code show leave
  const Offset = ({ item, time_work, status }) => {
    // compare current date with compensated_by date
    // if status is waiting and not overdue u can edit the request
    if ((status === "waiting" || status === "Waiting") && (moment().diff(moment(item.compensated_by, Time.crossDMY), 'days') > 0 || item.compensated_by === null)) {
      return <EditOffset item={item} reload={reload} inPast={true} labelButton="Edit" />
    }
    if (time_work <= 8) {
      // if status is doing or success or time work <= 8, nothing return
      if (status === "doing" || status === "success" || status === "Doing" || status === "Success" || time_work == 8) { //typeof time_work is string
        return <></>
      }
      // if status is waiting and in the past, u can edit the request
      if ((status === "waiting" || status === "Waiting" && moment().diff(moment(item.compensated_by, Time.crossDMY), 'days') <= 0)) {
        return <EditOffset item={item} reload={reload} inPast={false} labelButton="Edit" />
      }
      // if ur work time < 8, u can commit to do in the future 
      if (moment().diff(moment(item.date, Time.crossDMY), 'days') === 0) {
        return <NotEnoughOffset dateSelected={item.date} reload={reload} labelButton="Offset" />
      }
    }
    // if status is failed or rejected or time work > 8, u can regist compensate to time work < 8
    if (status === "failed" || status === "rejected" || status === "Failed" || status === "Rejected" || time_work > 8) {
      return <EnoughOffset dateSelected={item.date} reload={reload} labelButton="Offset" />
    }
    return <></>
  }
  const toggle = () => setOpen(!isOpen);
  const handleClickDetail = (id) => {
    toggle();
    actions.getDetailTimesheetStaff(id);
  };
  
  return (
    <div>
      {timeSheet.data && (
        <div>
          
          {/*tables-saffs  */}
          <div className="tables-saffs-wrapper">
            <div className="saffs-search">
              <div className="times-select">
                <DateRangePicker blockRange="none" />
              </div>
              <CustomPicker pickDate={pickDate} />
            </div>
            <div className="tables-title">
              <div className="tables-title-up">
                {_.map(
                  ["All", "In late", "Leave early", "In late and leave early"],
                  (type, index) => (
                    <div
                      className="tables-title-item"
                      onClick={() => setType(type)}
                      key={index}
                    >{`${type}: ${
                      timeSheet.statistic[_.snakeCase(type)]
                    }`}</div>
                  )
                )}
                <div className="tables-title-item show-leave">
                  <span id="PopoverLeave" onClick={clickOnLeaveList}>
                    Leave
                  </span>
                  {showLeave === true ? <MdVisibility /> : <MdVisibilityOff />}
                </div>
                {_.map(
                  ["Total work", "Total Off", "Total Offset"],
                  (type, index) => (
                    <div className="tables-title-item" key={index}>{`${type}: ${
                      timeSheet.statistic[_.snakeCase(type)]
                    }h`}</div>
                  )
                )}
              </div>
              <UncontrolledPopover
                trigger="legacy"
                placement="bottom"
                target="PopoverLeave"
              >
                <div
                  className="tables-title-down popover-body"
                  ref={refShowLeave}
                >
                  {_.map(constants.OPTION_DAYOFF, (type, index) => (
                    <div
                      className="tables-title-item no-margin"
                      onClick={() => setType(type)}
                      key={index}
                    >{`${type}: ${
                      timeSheet.statistic[_.snakeCase(type)]
                    }`}</div>
                  ))}
                </div>
              </UncontrolledPopover>
            </div>
            {timeSheet.data.length === 0 ? null : (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <SortTarget
                      type="Date"
                      value="Date"
                      sortType={sortType}
                      sortField={sortField}
                      letSort={letSort}
                    />
                    <th>CheckIn</th>
                    <th>CheckOut</th>
                    <th>Work</th>
                    <th>Off</th>
                    <th />
                    <th style={{ border: "#fff" }} />
                    <th>Compensate to</th>
                    <th>Compensated by</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {_.map(timeSheet.data, (item, index) => (
                    <tr
                      key={index}
                    >
                      <td
                        onClick={() => {
                          handleClickDetail(item.id)
                        }}
                      >
                        {item.date}
                      </td>
                      <td
                        className={classNames("", {
                          red_text:
                            moment(item.start_at, Time.HM).isAfter(
                              moment(Time.startWork, Time.HM)
                            ) === true,
                        })}
                        onClick={() => {
                          handleClickDetail(item.id)
                        }}
                      >
                        {item.start_at}
                      </td>
                      <td
                        className={classNames("", {
                          red_text:
                            moment(item.end_at, Time.HM).isBefore(
                              moment(Time.endWork, Time.HM)
                            ) === true,
                        })}
                        onClick={() => {
                          handleClickDetail(item.id)
                        }}
                      >
                        {item.end_at}
                      </td>
                      <td
                        className={classNames("", {
                          red_text: item.time_work < 8,
                        })}
                        onClick={() => {
                          handleClickDetail(item.id)
                        }}
                      >
                        {calculateTimeWork(item.time_work)}
                      </td>
                      <td
                        className={classNames("", {
                          red_text: item.time_off > 0,
                        })}
                        onClick={() => {
                          handleClickDetail(item.id)
                        }}
                      >
                        {calculateTimeOff(item.time_off)}
                      </td>
                      <td><Button color="success">Report</Button></td>
                      <td style={{ border: "#fff" }} />
                      <td>{item.compensate_to}</td>
                      <td>{item.compensated_by}</td>
                      <td><Badge href="#" color={colors[item.compensation_status]}>{_.upperFirst(item.compensation_status)}</Badge></td>
                      <td className="setting-button">
                        <Offset item={item} time_work={item.time_work} status={item.compensation_status} />
                      </td>
                    </tr>
                  ))}
                  {dataDetail && (
                        <EditReasonModal
                          modal={isOpen}
                          toggle={toggle}
                          data={dataDetail}
                        />
                      )}
                </tbody>
              </table>
            )}
            
            <Pagination
              totalPage={Number(timeSheet.statistic.total_page)}
              pageChange={(x) => setCurrentPage(x)}
            />
          </div>
          {/*tables-staffs end */}
        </div>
      )}
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    timeSheet: state.timeSheet.data,
    dataDetail: state.timeSheet.detail,
    reduxStartDate: state.dateRange.startDate.format(Time.crossDMY),
    reduxEndDate: state.dateRange.endDate.format(Time.crossDMY),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    pickDate: () => dispatch(pickDate),
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(listTimesheets);
