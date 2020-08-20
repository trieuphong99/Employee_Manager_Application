import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  Input,
  InputGroupText,
  InputGroupAddon,
  Button
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from "react-redux";
import { setUpdateTimeSheet } from "../../../actions/timeSheet";
import moment from 'moment';
import Time from '../../../../commons/const/Time';
import TimePicker from '../../../../commons/components/TimePicker/timePicker';
import { toastError } from "../../../../commons/helpers/toastHelpers";

const UpdateModal = props => {
  const {modal, toggle, data } = props;
  const [startTime, setStartTime] = useState();
  const [reasonIn, setReasonIn] = useState();
  const [endTime, setEndTime] = useState();
  const [reasonOut, setReasonOut] = useState();
  const dispatch = useDispatch();
  
  const handClick = () => {
    let startAt = moment(`${data.date} ${startTime}`, Time.FullDayFirst)._i;
    let endAt = moment(`${data.date} ${endTime}`, Time.FullDayFirst)._i;
    let startOrigin = moment(`${data.date} ${data.start_at}`, Time.FullDayFirst)._i;
    let endOrigin = moment(`${data.date} ${data.end_at}`, Time.FullDayFirst)._i
    dispatch(setUpdateTimeSheet(data.id, startTime ? startAt : (data.start_at && startOrigin), endTime ? endAt : (data.end_at && endOrigin) , reasonIn ? reasonIn : data.reason_in, reasonOut ? reasonOut : data.reason_out));
  }
  const handleClick = () => {
    if(startTime === undefined && endTime === undefined && reasonIn === undefined && reasonOut === undefined ){
      toastError('Nothing change!');
    }
    else if((reasonIn && !reasonIn.match(/[a-zA-Z]+/)) || (reasonOut && !reasonOut.match(/[a-zA-Z]+/)) ){
      toastError('Invalid!')
    }
    else {
      handClick();
      handleToggle();
    }
  }
  const handleToggle = () => {
    setStartTime();
    setEndTime();
    setReasonIn();
    setReasonOut();
    toggle();
  }
  return (
    data && <Modal isOpen={modal} toggle={toggle} modalClassName="modal-background-color" backdrop={false} >
      <ModalHeader toggle={() => handleToggle()}>
        Edit reason checkin checkout
      </ModalHeader>
      <ModalBody>
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
            <TimePicker time={data.start_at} setTime={e => {setStartTime(moment(e._d).format(Time.HM))}} />
          </div>
        </div>
        <hr className="hr-footer" ></hr>
        <div className="row">
          <div className="col-4">Reason checkin late</div>
          <div className="col-8">
            <Input type="textarea" key={data.reason_in} defaultValue={data.reason_in} onChange={e => setReasonIn(e.target.value)}/>
            {
              (reasonIn && !reasonIn.match(/[a-zA-Z]+/)) && <div style={{ color: 'red', fontSize: '80%' }}>Invalid reason in late!</div>
            }
          </div>
        </div>
        <hr className="hr-footer" ></hr>
        <div className="row">
          <div className="col-4">Checkout</div>
          <div className="col-8">
            <TimePicker time={data.end_at ? data.end_at : '00:00'} setTime={e => {setEndTime(moment(e._d).format(Time.HM))}} />
          </div>
        </div>
        <hr className="hr-footer" ></hr>
        <div className="row" >
          <div className="col-4" >Reason checkout early</div>
          <div className="col-8" >
            <Input type="textarea" key={data.reason_out} defaultValue={data.reason_out} onChange={e => setReasonOut(e.target.value)} />
            {
              (reasonOut && !reasonOut.match(/[a-zA-Z]+/)) && <div style={{ color: 'red', fontSize: '80%' }}>Invalid reason leave early!</div>
            }
          </div>
        </div>
        
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => handleClick()}>
          Submit
        </Button>
        <Button color="secondary" onClick={() => handleToggle()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default UpdateModal;
