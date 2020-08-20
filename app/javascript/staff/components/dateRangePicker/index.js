import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import './style.css'
import moment from 'moment'
import { isInclusivelyBeforeDay } from 'react-dates';

import Time from '../../../commons/const/Time'
import { pickDate } from '../../actions/dateRange';

const DatePicker = props => {
  const { block, blockRange } = props
  const reduxStartDate = useSelector(state => state.dateRange.startDate)
  const reduxEndDate = useSelector(state => state.dateRange.endDate)
  const [startDate, setStartDate] = useState(reduxStartDate); // mặc định là 10 hôm trước
  const [endDate, setEndDate] = useState(reduxEndDate); // mặc định là hôm nay
  const [focusedInput, setFocusedInput] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setStartDate(reduxStartDate)
    setEndDate(reduxEndDate)
  }, [reduxStartDate, reduxEndDate])

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate !== null && endDate !== null && focusedInput === "endDate") {
      dispatch(pickDate(startDate, endDate))
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
