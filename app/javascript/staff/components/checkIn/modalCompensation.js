import React, { useState } from 'react'
import { Button, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { SingleDatePicker } from "react-dates";
import { isInclusivelyBeforeDay } from 'react-dates';
import { offSet } from '../../actions/timeSheet';
import { connect } from 'react-redux';
import moment from 'moment'
import Time from '../../../commons/const/Time';
import { history } from "../../../commons/helpers/history/history"

function ModalCompensation(props) {

  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(false);
  const [dateSelected, setDateSelected] = useState(moment());

  const [modal, setModal] = useState(true);
  const toggleModal = () => setModal(!modal)

  const handleSubmit = () => {
    props.offSet(date, dateSelected, () => { return; })
    toggleModal();
    history.push('/timesheets')
  }
  return (
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Compensation(Optional)</ModalHeader>
      <ModalBody>
        <FormGroup>
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
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={handleSubmit}>Submit</Button>
        <Button color="secondary" onClick={() => {
          toggleModal();
          history.push('/timesheets');
        }}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    offSet: (date, for_date, reload) => dispatch(offSet({ date, for_date, reload })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCompensation);
