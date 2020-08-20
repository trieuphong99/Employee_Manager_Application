import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../actions/timeSheet';
import moment from 'moment'
import _ from 'lodash'
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { isInclusivelyBeforeDay } from 'react-dates';
import Time from '../../../../commons/const/Time'

const Offset = props => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { labelButton, reload } = props
  const dateSelected = moment(props.dateSelected, Time.DMY)

  const [date, setDate] = useState(dateSelected);
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    props.offSet(date, dateSelected, reload)
    toggle()
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>{labelButton}</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Compensation</ModalHeader>
        <ModalBody>
          <div>
            <Label>Date:</Label>
            <SingleDatePicker
              id="date"
              block
              date={date} // momentPropTypes.momentObj or null
              onDateChange={(date) => { setDate(date) }} // PropTypes.func.isRequired
              focused={focused} // PropTypes.bool
              onFocusChange={() => setFocused(!focused)} // PropTypes.func.isRequired
              displayFormat={Time.crossDMY}
              isOutsideRange={
                day => isInclusivelyBeforeDay(day, moment())
              }
            />
          </div>
          <div>
            <Label>For date:</Label>
            <SingleDatePicker
              id="for_date"
              block
              date={dateSelected} // momentPropTypes.momentObj or null
              displayFormat={Time.crossDMY}
              disabled={true}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={handleSubmit}>Submit</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div >
  )
}

const mapStatetoProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    offSet: (date, for_date, reload) => dispatch(actions.offSet({ date, for_date, reload }))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Offset);
