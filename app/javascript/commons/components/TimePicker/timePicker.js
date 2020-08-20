import React from 'react';
import {TimePicker} from 'antd';
import Time from '../../const/Time';
import moment from 'moment';
import 'antd/dist/antd.css';

const TimePickerTime = (props) => {
  const {time, setTime} = props;
  return (
    <TimePicker
      key={moment(`${time}`, Time.HM)}
      defaultValue={moment(`${time}`, Time.HM)} format={Time.HM}
      onChange={setTime}
    />
  );
}
export default TimePickerTime;