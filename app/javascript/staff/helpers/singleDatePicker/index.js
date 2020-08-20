import React, { useState } from 'react'
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

import Time from '../../../commons/const/Time'

function DatePicker(props) {
  const { date, setFieldValue, isOutsideRange } = props
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <SingleDatePicker
        date={date}
        onDateChange={date => setFieldValue('date', date)}
        onFocusChange={({ focused }) => setFocused(focused)}
        focused={focused}
        displayFormat={Time.crossDMY}
        block={true}
        isOutsideRange={() => false}
      />
    </div>
  )
}
export default DatePicker;
