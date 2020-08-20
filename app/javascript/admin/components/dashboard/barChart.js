import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getDataBarChart } from "../../actions/dashBoard";
import { Input } from "reactstrap";
import _ from "lodash";
import moment from 'moment';
import Time from "../../../commons/const/Time";

const BarChart = (props) => {
  const [week, setWeek] = useState("1");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataBarChart(week));
  }, [week]);

  const dataBar = useSelector((state) => state.getDataDashBoard.dataBar);

  const series = [
    {
      name: "Employee",
      data: _.map(dataBar, (e) => e.worker),
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 400,
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        horizontal: false,
      },
    },
    colors: ["#33b2df"],
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#000000"],
        fontSize: '18px'
      },
      offsetX: 0,
    },
    responsive: [
      {
        breakpoint: 1900,
        options: {
          chart: {
            height: 300
          },
          plotOptions: {
            bar: {
              barHeight: "100%",
              distributed: true,
              horizontal: false,
              dataLabels: {
                position: "bottom",
              },
            },
          },
          dataLabels: {
            enabled: false,
            textAnchor: "start",
            style: {
              colors: ["#000000"],
              fontSize: '12px'
            }
          }
        }
      }
    ],
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      type: "category",
      categories: _.map(dataBar, (e) => moment(e.date).format(Time.DM)),
    },
    yaxis: {
      labels: {
        show: true,
        hideOverlappingLabels: false
      },
      title: {
        text: 'employee'
      },
      style: {
        colors: ["#000000"],
        fontSize: '16px'
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} employe`
        }
      },
      x: {
        formatter: function (date) {
          return date;
        }
      },
    }
  };
  return (
    <div>
      <div className="row includes">
        <div className="col labels-weekly-work">
          Weekly work
        </div>
        <div className="col">
          <div className="row select-week">
            <div className="col-5">
              <Input
                className="input-select-work"
                type="select"
                onClick={(e) => setWeek(e.target.value)}
              >
                {_.map([1, 2, 3], (e, index) => {
                  return (
                    <option value={e} key={index}>{e}</option>
                  )
                })}
              </Input>
            </div>
            <div className="col-7 labels-select-week">
              weeks ago
            </div>
          </div>
        </div>
      </div>
      <div className="barchart-frame">
        <Chart options={options} series={series} type="bar" height={500} />
      </div>
    </div>
  );
};
export default BarChart;
