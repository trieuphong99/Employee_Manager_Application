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

  const { dateSelected, className } = props
  const [listDayOff, setListDayOff] = useState([]);
  const selectDate = (date) => {
    var index = _.findIndex(listDayOff, n => n === date.format(Time.crossDMY))
    if (index === -1) {
      setListDayOff([...listDayOff, date.format(Time.crossDMY)])
    }
    else {
      var arr = listDayOff
      arr.splice(index, 1)
      setListDayOff(arr)
    }
  }
  //code call api offSet
  const letOffSet = () => {
    props.offSet(dateSelected, _.split(listDayOff, ','))
    toggle();
  }
  //code call api offSet
  //code SingleDatePicker
  const [date, setDate] = useState(moment());
  const [focused, setFocused] = useState(false);
  //code SingleDatePicker
  return (
    <div>
      <Button color="primary" onClick={toggle}>Offset</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Compensation</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label >Choose one or many day off</Label>
            <Input
              placeholder="Pick compensation"
              readOnly={true}
              value={listDayOff}
            />
          </FormGroup>
          <div className='SDP'>
            <Label>Compensation</Label>
            <SingleDatePicker
              block
              date={date} // momentPropTypes.momentObj or null
              onDateChange={(date) => {
                setDate(date)
                selectDate(date)
              }} // PropTypes.func.isRequired
              focused={focused} // PropTypes.bool
              onFocusChange={() => setFocused(!focused)} // PropTypes.func.isRequired
              id="your_unique_id" // PropTypes.string.isRequired,
              numberOfMonths={1}
              displayFormat={Time.crossDMY}
              // chặn các ngày từ hôm chọn đổ đi(chỉ cho chọn các ngày trong quá khứ không bao gồm cả ngày được phép làm bù)
              isOutsideRange={day => !isInclusivelyBeforeDay(day, moment(dateSelected, Time.crossDMY).subtract(1, 'days'))}
              // nếu tồn tại trong listDayOff thì hight light(sáng lên) lên cho dễ nhìn
              isDayHighlighted={day => _.indexOf(_.split(listDayOff, ','), day.format(Time.crossDMY)) !== -1}
              keepOpenOnDateSelect={true} //giữ cho calendar không đóng khi click xong
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => letOffSet()} disabled={listDayOff === ''}>Finish</Button>
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
    offSet: (date, for_date) => { dispatch(actions.offSet({ date: date, for_date: for_date })) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Offset);
