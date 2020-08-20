import React, { useEffect } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import CrossBar from "./crossBar";
import PieChart from "./pieChart";
import BarChart from "./barChart";
import {useDispatch, useSelector} from 'react-redux';
import { getDataDashBoard } from "../../actions/dashBoard";
import _ from 'lodash';
import './dashBoard.css';

const DashBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataDashBoard());
  }, []);
  const dataDB = useSelector( state => state.getDataDashBoard.data);
  return (
    <div className="container-fluid">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="#">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Dashboard</BreadcrumbItem>
      </Breadcrumb>
      <div className="dashboard">
        <div className="dashboard-crossbar">
          <div className="row dashboard-row">
            <div className="col">
              <div className="labels-left">Today</div>
              <div className="dashboard-statistic-left">
                <CrossBar inLate={dataDB.today_inlate} leaveEarly={dataDB.today_leave_early} fullDayoff={dataDB.today_full_dayoff} halfDayoff={dataDB.today_half_dayoff} />
              </div>
            </div>
            <div className="col">
              <div className="labels-right">This week</div>
              <div className="dashboard-statistic-right">
                <CrossBar inLate={dataDB.this_week_inlate} leaveEarly={dataDB.this_week_leave_early} fullDayoff={dataDB.this_week_full_dayoff} halfDayoff={dataDB.this_week_half_dayoff} />
              </div>
            </div>
          </div>
          <div className="row dashboard-row">
            <div className="col">
              <div className="labels-left">Yesterday</div>
              <div className="dashboard-statistic-left">
                <CrossBar inLate={dataDB.yesterday_inlate} leaveEarly={dataDB.yesterday_leave_early} fullDayoff={dataDB.yesterday_full_dayoff} halfDayoff={dataDB.yesterday_half_dayoff} />
              </div>
            </div>
            <div className="col">
              <div className="labels-right">This month</div>
              <div className="dashboard-statistic-right">
                <CrossBar inLate={dataDB.this_month_inlate} leaveEarly={dataDB.this_month_leave_early} fullDayoff={dataDB.this_month_full_dayoff} halfDayoff={dataDB.this_month_half_dayoff} />
              </div>
            </div>
          </div>
        </div>
        <div className="chart-frame">
          <div className="row dashboard-rowchart">
            <div className="col-5 dashboard-piechart">
              <PieChart />
            </div>
            <div className="col-7">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
