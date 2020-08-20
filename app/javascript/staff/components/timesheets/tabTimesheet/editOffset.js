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
import DeleteModal from '../../../../commons/components/modal/DeleteOffset';

const Offset = props => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { item, labelButton, reload, inPast } = props
  const compensate_to = moment(item.compensate_to, Time.crossDMY)
  const compensated_by = moment(item.compensated_by, Time.crossDMY)
  const dateSelected = moment(item.date, Time.crossDMY)

  const [date, setDate] = useState(item.compensated_by !== null ? compensated_by : dateSelected);
  const [focusedDate, setFocusedDate] = useState(false);

  const [forDate, setForDate] = useState(item.compensate_to !== null ? compensate_to : dateSelected);
  const [focusedForDate, setFocusedForDate] = useState(false);

  const handleSubmit = () => {
    props.editOffSet(item.compensation_id, date, forDate, reload)
    toggle()
  }

  const handleDelete = () => {
    props.deleteOffSet(item.compensation_id, reload)
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
              focused={focusedDate} // PropTypes.bool
              displayFormat={Time.crossDMY}
              onFocusChange={() => setFocusedDate(!focusedDate)} // PropTypes.func.isRequired
              isOutsideRange={() => false}
              isOutsideRange={day =>
                inPast
                  ? !isInclusivelyBeforeDay(day, dateSelected)
                  : isInclusivelyBeforeDay(day, forDate)
              }
              disabled={inPast}
            />
          </div>
          <div>
            <Label>For date:</Label>
            <SingleDatePicker
              id="for_date"
              block
              date={forDate} // momentPropTypes.momentObj or null
              onDateChange={(date) => { setForDate(date) }} // PropTypes.func.isRequired
              focused={focusedForDate} // PropTypes.bool
              onFocusChange={() => setFocusedForDate(!focusedForDate)} // PropTypes.func.isRequired
              displayFormat={Time.crossDMY}
              isOutsideRange={day =>
                inPast
                  ? !isInclusivelyBeforeDay(day, dateSelected)
                  : isInclusivelyBeforeDay(day, dateSelected)
              }
              disabled={!inPast}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={handleSubmit}>Submit</Button>
          <DeleteModal item={item} deleteOffSet={handleDelete}/>
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
    editOffSet: (id, date, for_date, reload) => dispatch(actions.editOffSet({ id, date, for_date, reload })),
    deleteOffSet: (id, reload) => dispatch(actions.deleteOffSet({ id, reload }))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Offset);
