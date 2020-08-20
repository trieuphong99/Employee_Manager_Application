import React, { useState, useEffect } from 'react'
import { Col, Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './checkOut.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/checkInCheckOut';
import * as timeSheetActions from '../../actions/timeSheet';
import moment from 'moment'
import RealTime from 'react-live-clock';
import Clock from 'react-clock';
import Time from '../../../commons/const/Time';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form'
import renderTextAreaField from './FormHelper/TextAreaField'
import validate from './redux-form/validate'
import { SingleDatePicker } from "react-dates";
import { isInclusivelyBeforeDay } from 'react-dates';
import { offSet } from '../../actions/timeSheet';

import _ from 'lodash'

const CheckOut = props => {
  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(false);
  const [dateSelected, setDateSelected] = useState(moment());

  const { timeSheet, handleSubmit, invalid, submitting, pristine, reset } = props;
  const [timeClock, setTimeClock] = useState(new Date());
  const compensation = timeSheet.compensation;
  const checkCompensationForToday = timeSheet.data.data[0].compensated_by;

  useEffect(() => {
    setInterval(
      () => setTimeClock(new Date()),
      1000
    );
    props.getStaffTimeSheet({
      startTime: moment().format(Time.DMY),
      endTime: moment().format(Time.DMY)
    }, 1, 'ASC', 'All');
    // eslint-disable-next-line
  }, []);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setDate(null)
  }
  const letCheckOut = () => {
    const startTime = moment(timeSheet.data.data[0].start_at, Time.HMS)
    const endTime = moment(moment().format(Time.HMS), Time.HMS)
    const duration = moment.duration(endTime.diff(startTime));
    const hours = duration.asHours();

    const formatEndWork = moment(Time.endWork, Time.HMS).format(Time.HMS);
    const formatEndTime = moment().format(Time.HMS);

    if (formatEndTime < formatEndWork) {
      toggle();
      reset();
    }
    else {
      props.checkOut();
    }
  }
  const finishReport = (data) => {
    props.checkOut(data.Reason);
    if (date) {
      props.offSet(date, dateSelected, () => { return; })
    }
  }
  return (
    <div className="check-out">
      <div className='total-content-check-out'>
        <div className='title-check-out'>Check out</div>
        <div className='date-check-out'>
          <Clock value={timeClock} />
          <RealTime format={Time.FullDayFirst} ticking={true} timezone={Time.timeZone} />
        </div>
        <button className="btn btn-checkout" onClick={letCheckOut}>Finish</button>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <form onSubmit={handleSubmit(finishReport)}>
              <ModalHeader toggle={toggle}>Why are you leave early ?</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="exampleText">Reason</Label>
                  <Field
                    id='Reason'
                    className="Reason"
                    placeholder="Reason"
                    name="Reason"
                    component={renderTextAreaField}
                  />
                  {
                    !checkCompensationForToday && (<div className="compensation-form">
                      <div className="compensation-title">
                        Compensation
                      <label className="optional">(optional)</label>
                      </div>
                      <div className="compensation-body">
                        <Label>Date</Label>
                        <SingleDatePicker
                          id="date"
                          block
                          date={date} // momentPropTypes.momentObj or null
                          onDateChange={(date) => { setDate(date) }} // PropTypes.func.isRequired
                          focused={focused} // PropTypes.bool
                          onFocusChange={() => setFocused(!focused)} // PropTypes.func.isRequired
                          displayFormat={Time.crossDMY}
                          numberOfMonths={1}
                          showClearDate={true}
                          isOutsideRange={day => isInclusivelyBeforeDay(day, moment())}
                        />
                        <Label>For date:</Label>
                        <SingleDatePicker
                          id="for_date"
                          block
                          onDateChange={(date) => setDateSelected(date)}
                          focused={null}
                          onFocusChange={() => setFocused(null)}
                          date={dateSelected} // momentPropTypes.momentObj or null
                          displayFormat={Time.crossDMY}
                          disabled={true}
                        />
                      </div>
                    </div>)
                  }
                  {
                    compensation && (
                      <div className="remind-compensation">
                        Remind:
                        <p className="text-remind">You have registered to make up on {moment(compensation.date).format(Time.DMY)} for {moment(compensation.for_date).format(Time.DMY)},
                      the compensation period is {compensation.off_hour} hour</p>
                        <p className="text-remind"> Please go to the timesheet to edit the make-up
                        date for {moment(compensation.for_date).format(Time.DMY)} !</p>
                      </div>)
                  }
                </FormGroup>

              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                <Button
                  color="success"
                  disabled={invalid || submitting || pristine}
                  className="btn btn-change-pass-word"
                  type="submit"
                >
                  Check Out
                </Button>
              </ModalFooter>
            </form>
          </Modal>
        </div>
      </div>
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
    checkOut: (reason) => { dispatch(actions.checkOut({ reason: reason })) },
    getStaffTimeSheet: (date, current_page, sort_date) => { dispatch(timeSheetActions.getStaffTimeSheet({ date, current_page: current_page, sort_date: sort_date })) },
    offSet: (date, for_date, reload) => dispatch(offSet({ date, for_date, reload }))
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReduxForm = reduxForm({
  form: 'CHECK_OUT',
  validate: validate //tất cả code validate để trong validate.js mà import vào
});

export default compose(
  withConnect,
  withReduxForm
)(CheckOut);
