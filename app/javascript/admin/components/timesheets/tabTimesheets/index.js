import React, {useRef, useState, useEffect } from 'react';
import UpdateModal from "./updateModal";
import Pagination from "../../../../commons/components/pagination";
import calculateTimeWork from "../../../../commons/function/calculateTimeWork";
import calculateTimeOff from "../../../../commons/function/calculateTimeOff";
import SortTarget from "../../../../commons/components/sortTarget";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import moment from "moment";
import classNames from "classnames";
import _ from "lodash";
import {UncontrolledPopover} from 'reactstrap';
import Time from "../../../../commons/const/Time";
import constants from '../../../../commons/components/constantTimesheets';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailTimesheet, getStaffTimeSheetByAdmin } from '../../../actions/timeSheet';
import DateRangePicker from "../../dateRangePicker";
import SearchUser from "../../../../commons/components/searchUser/searchUser";
import CustomPicker from '../../../../commons/components/dateRangePicker/customPicker';
import { pickDate } from '../../../actions/dateRange'

const TabTimesheets = (props) => {
  // const {timeSheet, clickOnLeaveList, showLeave, sortType, sortField, letChangeSortType, setFilterType, setCurrentPage } = props;
  const reduxStartDate = useSelector(state => state.dateRange.startDate.format(Time.crossDMY))
  const reduxEndDate = useSelector(state => state.dateRange.endDate.format(Time.crossDMY))
  const [idStaff, setIDStaff] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("DESC");
  const [sortField, setSortField] = useState("date");
  const [filterType, setFilterType] = useState("All");
  const [showLeave, setShowLeave] = useState(false);
  const refShowLeave = useRef();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const letChangeSortType = field => {
    setSortType(sortType === "ASC" ? "DESC" : "ASC");
    setSortField(field);
  }
  useEffect(() => {
    dispatch(getStaffTimeSheetByAdmin(reduxStartDate, reduxEndDate, idStaff, currentPage, sortType, sortField, filterType))
    // eslint-disable-next-line
  }, [reduxStartDate, reduxEndDate, idStaff, currentPage, sortType, sortField, filterType]);
  const timeSheet = useSelector(state => state.timeSheet.data)

  const clickOnLeaveList = () => {
    setShowLeave(true);
    document.addEventListener("click", clickOutSide);
  };
  const clickOutSide = event => {
    const { target } = event;
    if (refShowLeave.current !== null) {
      if (!refShowLeave.current.contains(target)) {
        setShowLeave(false);
        document.removeEventListener("click", clickOutSide);
      }
    }
  };
  const handleClickDetail = (id) => {
    dispatch(getDetailTimesheet(id));
  }
  const dataDetail = useSelector(state => state.timeSheet.detail);
  return (
    <div className="tables-saffs-wrapper" >
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
      {timeSheet.data && (
      <div>
        <div>
          <div className="tables-title">
            <div className="tables-title-up">
              {_.map(
                [
                  "All",
                  "In late",
                  "Leave early",
                  "In late and leave early"
                ],
                (type, index) => (
                  <div
                    className="tables-title-item"
                    onClick={() => setFilterType(type)}
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
                {showLeave === true ? (
                  <MdVisibility />
                ) : (
                    <MdVisibilityOff />
                  )}
              </div>
              {_.map(
                ["Total work", "Total Off", "Total Offset"],
                (type, index) => (
                  <div
                    className="tables-title-item"
                    key={index}
                  >{`${type}: ${
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
                {_.map(constants.OPTION_DAYOFF ,(type, index) => (
                    <div
                      className="tables-title-item no-margin"
                      onClick={() => setType(type)}
                      key={index}
                    >{`${type}: ${
                      timeSheet.statistic[_.snakeCase(type)]
                      }`}</div>
                  )
                )}
              </div>
            </UncontrolledPopover>
          </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <SortTarget type="Date" value="Date" sortType={sortType} sortField={sortField} letSort={letChangeSortType} />
                  <th>CheckIn</th>
                  <th>CheckOut</th>
                  <th>Work</th>
                  <th>Off</th>
                  <th>Compensate to</th>
                  <th>Compensated by</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {_.map(timeSheet.data, (item, index) => (
                  <tr key={index}>
                    
                    <td onClick={() => {toggle(); handleClickDetail(item.id)}}>{item.code}</td>
                    <td onClick={() => {toggle(); handleClickDetail(item.id)}}>{item.name}</td>
                    <td onClick={() => {toggle(); handleClickDetail(item.id)}}>{item.date}</td>
                    <td
                      className={classNames("", {
                        red_text:
                          moment(item.start_at, Time.HM).isAfter(
                            moment(Time.startWork, Time.HM)
                          ) === true
                      })}
                      onClick={() => {toggle(); handleClickDetail(item.id)}}
                    >
                      {item.start_at}
                    </td>
                    <td
                      className={classNames("", {
                        red_text:
                          moment(item.end_at, Time.HM).isBefore(
                            moment(Time.endWork, Time.HM)
                          ) === true
                      })}
                      onClick={() => {toggle(); handleClickDetail(item.id)}}
                    >
                      {item.end_at}
                    </td>
                    <td
                      className={classNames("", {
                        red_text: item.time_work < 8
                      })}
                      onClick={() => {toggle(); handleClickDetail(item.id)}}
                    >
                      {calculateTimeWork(item.time_work)}
                    </td>
                    <td
                      className={classNames("", {
                        red_text: item.time_off > 0
                      })}
                      onClick={() => {toggle(); handleClickDetail(item.id)}}
                    >
                      {calculateTimeOff(item.time_off)}
                    </td>
                    <td onClick={() => {toggle(); handleClickDetail(item.id)}}>{item.compensate_to}</td>
                    <td onClick={() => {toggle(); handleClickDetail(item.id)}}>{item.compensated_by}</td>
                    <td>
                      <button type="button" className="btn btn-success">
                        Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
            {dataDetail && <UpdateModal modal={isOpen} toggle={toggle} data={dataDetail} />}
        </div>
        <Pagination
          totalPage={Number(timeSheet.statistic.total_page)}
          pageChange={e => setCurrentPage(e)}
        />
      </div>
    ) }
    </div>
  );
}
export default TabTimesheets;