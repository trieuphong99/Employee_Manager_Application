import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Fade } from 'reactstrap';
import moment from 'moment';
import Time from '../../../../commons/const/Time';
import DatePicker from '../../../helpers/singleDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import TimePickerTime from '../../../../commons/components/TimePicker/timePicker';
import { editReasonCheckinCheckout, requestEditTimeCheckinCheckout, getDetailTimesheetStaff } from '../../../actions/timeSheet';
import { toastError } from '../../../../commons/helpers/toastHelpers';
import _ from  'lodash';

const EditReasonModal = (props) => {
  const {modal, toggle, data } = props;
  const [startTime, setStartTime] = useState();
  const [reasonIn, setReasonIn] = useState();
  const [endTime, setEndTime] = useState();
  const [reasonOut, setReasonOut] = useState();
  const [reason, setReason] = useState('');
  const [fade, setFade] = useState(false);
  const [required, setRequired] = useState(false);
  const dispatch = useDispatch();

  const updateReason = () => {
    dispatch(editReasonCheckinCheckout(reasonIn, reasonOut));
  }
  const requestEdit = () => {
    let startAt = moment(`${data.date} ${startTime}`, Time.FullDayFirst)._i;
    let endAt = moment(`${data.date} ${endTime}`, Time.FullDayFirst)._i;
    let startOrigin = moment(`${data.date} ${data.start_at}`, Time.FullDayFirst)._i;
    let endOrigin = moment(`${data.date} ${data.end_at}`, Time.FullDayFirst)._i;
    dispatch(requestEditTimeCheckinCheckout(data.date, startTime ? startAt : (data.start_at && startOrigin), endTime ? endAt : (data.end_at && endOrigin),reasonIn ? reasonIn : data.reason_in,reasonOut ? reasonOut : data.reason_out, reason))
  }
  const handClick = () => {
    if(startTime !== undefined || endTime !== undefined || data.date !== moment().format(Time.crossDMY) ) {
      requestEdit();
      setFade(false);
      handleToggle();
    }
    else {
      updateReason();
      setFade(false);
      handleToggle();
    }
  }
  const handleClick = () => {
    if(startTime === undefined && endTime === undefined && reasonIn === undefined && reasonOut === undefined){
      toastError('Nothing change!');
    }
    else if((fade || data.date !== moment().format(Time.crossDMY) ) && reason === ''){
      setRequired(true)
    }
    else if((reasonIn && !reasonIn.match(/[a-zA-Z]+/)) || (reasonOut && !reasonOut.match(/[a-zA-Z]+/)) || (reason && !reason.match(/[a-zA-Z]+/)) ){
      toastError('Invalid!')
    }
    else {
      handClick()
    }
  }
  const handleToggle = () => {
    setStartTime();
    setEndTime();
    setReasonIn();
    setReasonOut();
    setReason('')
    setFade(false);
    setRequired(false)
    toggle();
  }
  const handleShow = () => {
    setFade(true);
  }

  return(
    <Modal isOpen={modal} toggle={toggle} modalClassName="modal-background-color" backdrop={false} >
      <ModalHeader toggle={() => handleToggle()}>
        Edit reason checkin checkout
      </ModalHeader>
      {data && <ModalBody>
        <div className="row">
          <div className="col-4">Date</div>
          <div className="col-8">
            {data.date}
          </div>
        </div>
        <hr className="hr-footer" ></hr>
        <div className="row">
          <div className="col-4">Checkin</div>
          <div className="col-8">
            <TimePickerTime time={data.start_at && data.start_at} setTime={e => {setStartTime(moment(e._d).format(Time.HM)); handleShow() }} />
          </div>
        </div>
        <hr className="hr-footer" ></hr>
        <div className="row">
          <div className="col-4">Reason checkin late</div>
          <div className="col-8">
            <Input type="textarea" key={data.reason_in} defaultValue={data.reason_in && data.reason_in} onChange={e => setReasonIn(e.target.value)}/>
            {
              (reasonIn && !reasonIn.match(/[a-zA-Z]+/)) && <div style={{ color: 'red', fontSize: '80%' }}>Invalid reason in late!</div>
            }
          </div>
        </div>
        <hr className="hr-footer" ></hr>
        <div className="row">
          <div className="col-4">Checkout</div>
          <div className="col-8">
            <TimePickerTime time={data.end_at ? data.end_at : '00:00'} setTime={e => {setEndTime(moment(e._d).format(Time.HM)); handleShow()}} />
          </div>
        </div>
        <hr className="hr-footer" ></hr>
        <div className="row" >
          <div className="col-4" >Reason checkout early</div>
          <div className="col-8" >
            <Input type="textarea" key={data.reason_out} defaultValue={data.reason_out && data.reason_out} onChange={e => setReasonOut(e.target.value)} />
            {
              (reasonOut && !reasonOut.match(/[a-zA-Z]+/)) && <div style={{ color: 'red', fontSize: '80%' }}>Invalid reason leave early!</div>
            }
          </div>
        </div>
        <hr className="hr-footer" ></hr>
        {(fade || data.date !== moment().format(Time.crossDMY) ) &&  <div className="row">
            <div className="col-4" >Reason request edit time checkin, checkout</div>
            <div className="col-8">
              <Input type="textarea" onChange={e => {setReason(e.target.value); setRequired(false)}} />
              {
                required && <div style={{ color: 'red', fontSize: '80%' }}>Reason is a required field!</div>
              }
              {
                (reason && !reason.match(/[a-zA-Z]+/)) && <div style={{ color: 'red', fontSize: '80%' }}>Invalid reason!</div>
              }
            </div>
          </div>
        }
      </ModalBody>}
      <ModalFooter>
        <Button color="success" onClick={() => handleClick()}>
          Submit
        </Button>
        <Button color="secondary" onClick={handleToggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default EditReasonModal;