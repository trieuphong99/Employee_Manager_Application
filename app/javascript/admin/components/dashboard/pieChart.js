import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import DateRangePicker from "../dateRangePicker";
import { FaCheck, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Time from "../../../commons/const/Time";
import _ from "lodash";
import { getDataPieChart } from "../../actions/dashBoard";

const PieChart = (props) => {
  const reduxStartDate = useSelector((state) =>
    state.dateRange.startDate.format(Time.crossDMY)
  );
  const reduxEndDate = useSelector((state) =>
    state.dateRange.endDate.format(Time.crossDMY)
  );
  const [item, setItem] = useState([
    { type: "In late", isActive: true },
    { type: "Leave early", isActive: true },
    { type: "Full dayoff", isActive: true },
    { type: "Half dayoff", isActive: true },
  ]);
  const [isOpen, setOpen] = useState(false);
  const snakeString = _.join(
    _.map(item, (e) => _.snakeCase(e.type)),
    ","
  );
  const labelsPie = _.filter(item, (o) => o.isActive);
  const [selectString, setSelect] = useState(snakeString);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataPieChart(reduxStartDate, reduxEndDate, selectString));
  }, [reduxStartDate, reduxEndDate, selectString]);
  const dataPie = useSelector((state) => state.getDataDashBoard.dataPie);
  const toggle = () => {
    setOpen(!isOpen);
    let filterItem = _.filter(item, (o) => o.isActive);
    setSelect(
      _.join(
        _.map(filterItem, (e) => _.snakeCase(e.type)),
        ","
      )
    );
  };
  const checkTick = (i, index) => {
    setItem([
      ..._.slice(item, 0, index),
      { ...i, isActive: !i.isActive },
      ..._.slice(item, index + 1),
    ]);
  };
  const series = _.map(dataPie, (o) => o.y);
  const options = {
    chart: {
      type: "donut",
      offsetX: 30,
    },
    labels: _.map(labelsPie, (e) => e.type),
    responsive: [
      {
        breakpoint: 1900,
        options: {
          chart: {
            width: 445,
            offsetX: 20,
            offsetY: 10
          },
          legend: {
            show: true,
            fontSize: '16px',
            offsetY: 80,
          },
          dataLabels: {
            enable: true,
            style: {
              fontSize: '14px',
            },
            background: {
              enable: true,
              foreColor: '#343a40',
              dropShadow: {
                enable: false
              }
            }
          }
        },
      },
    ],
    legend: {
      show: true,
      fontSize: '24px',
      offsetY: 150
    },
    dataLabels: {
      enable: true,
      style: {
        fontSize: '18px',
      },
      background: {
        enable: true,
        foreColor: '#343a40',
        dropShadow: {
          enable: false
        }
      }
    },
    tooltip: {
      enable: true,
      style: {
        fontSize: '18px'
      }
    }
  };
  return (
    <div>
      <div className="row includes">
        <div className="col-8">
          <DateRangePicker blockRange="none" />
        </div>
        <div className="col-4">
          <ButtonDropdown
            isOpen={isOpen}
            toggle={toggle}
            className="button-dropdown"
          >
            <DropdownToggle
              color="light"
            >
              {isOpen ? <FaAngleUp /> : <FaAngleDown />}
            </DropdownToggle>
            <DropdownMenu>
              {_.map(item, (i, index) => {
                return (
                  <DropdownItem
                    toggle={false}
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => checkTick(i, index)}
                  >
                    <div className="row">
                      <div className="col-8">{i.type}</div>
                      {i.isActive && (
                        <div className="col-4">
                          <FaCheck />
                        </div>
                      )}
                    </div>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
      <div className="piechart-frame">
        <Chart options={options} series={series} type="donut" width={700} />
      </div>
    </div>
  );
};
export default PieChart;
