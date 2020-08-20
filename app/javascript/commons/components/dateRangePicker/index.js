import React, { useState } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import './style.css'
import moment from 'moment'
import { isInclusivelyBeforeDay } from 'react-dates';
import Time from '../../const/Time'

const DatePicker = props => {
  const { block, blockRange, date, setDate } = props
  const [startDate, setStartDate] = useState(date ? moment(date.startTime, Time.crossDMY) : moment().subtract(1, 'months').startOf("month"));
  const [endDate, setEndDate] = useState(date ? moment(date.endTime, Time.crossDMY) : moment().add(1, 'months').endOf('month'));
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate !== null && endDate !== null && focusedInput === "endDate") {
      setDate({
        startTime: startDate.format(Time.DMY),
        endTime: endDate.format(Time.DMY)
      })
    }
  };

  const isOutsideRange = day => {
    if (blockRange === "left")
      return isInclusivelyBeforeDay(day, moment())
    else if (blockRange === "none")
      return false
    else
      return !isInclusivelyBeforeDay(day, moment())
  }

  return (
    <DateRangePicker
      startDate={startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
      onDatesChange={handleDatesChange}
      block={block}
      displayFormat={Time.crossDMY}
      minimumNights={0}
      isOutsideRange={day => isOutsideRange(day)}
    />
  );
}

export default DatePicker;
