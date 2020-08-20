import React, { useState, useEffect } from 'react'
import './checkIn.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/checkInCheckOut';
import * as timeSheetActions from '../../actions/timeSheet';
import moment from 'moment'
import RealTime from 'react-live-clock';
import Clock from 'react-clock';
import Time from '../../../commons/const/Time';

import { history } from "../../../commons/helpers/history/history"
import { toastError } from '../../../commons/helpers/toastHelpers';
import ModalReason from './modalReason';

const CheckIn = props => {

  const [modalReason, setModalReason] = useState(false);
  const letCheckIn = () => {
    let checkCheckedIn = props.timeSheet.data[0];
    if (checkCheckedIn) {
      toastError("You have checked in before that!")
    }
    else {
      if (moment().isAfter(moment(Time.startWork, Time.HM))) {
        setModalReason(!modalReason);
      }
      else {
        props.checkIn();
        history.push('/timesheets')
      }
    }

  }

  const [timeClock, setTimeClock] = useState(new Date());
  useEffect(() => {
    setInterval(
      () => setTimeClock(new Date()),
      1000
    );
    props.getStaffTimeSheet({
      startTime: moment().format(Time.DMY),
      endTime: moment().format(Time.DMY)
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="check-in">
      <div className='total-content-check-in'>
        <div className='title-check-in'>Check in</div>
        <div className='date-check-in'>
          <Clock value={timeClock} />
          <RealTime format={Time.FullDayFirst} ticking={true} timezone={Time.timeZone} />
        </div>
        <button className="btn btn-checkin" onClick={letCheckIn}>Start</button>
      </div>
      {
        modalReason && <ModalReason />
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    timeSheet: state.timeSheet,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkIn: (reason) => { dispatch(actions.checkIn({ reason: reason })) },
    getStaffTimeSheet: (startTime, endTime) => { dispatch(timeSheetActions.getStaffTimeSheet(startTime, endTime)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);
