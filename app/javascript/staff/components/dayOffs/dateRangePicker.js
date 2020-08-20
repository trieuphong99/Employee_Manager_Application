import React, { useState } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from 'moment'
import { isInclusivelyBeforeDay } from 'react-dates';
import Time from '../../../commons/const/Time'

const DatePicker = props => {
  const { startDate, endDate, block, blockRange, setFieldValue } = props
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
      setFieldValue('from_date', startDate)
      setFieldValue('to_date', endDate)
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
