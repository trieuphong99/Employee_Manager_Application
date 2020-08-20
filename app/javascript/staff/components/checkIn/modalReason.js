import React, { useState } from 'react'
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalCompensation from "./modalCompensation";
import { connect } from 'react-redux';
import * as actions from '../../actions/checkInCheckOut';

function ModalReason(props) {

  const [modalCompensation, setModalCompensation] = useState(false);

  const [modal, setModal] = useState(true);
  const toggleModal = () => setModal(!modal);

  const [reason, setReason] = useState('');
  const finishReport = () => {
    props.checkIn(reason);
    toggleModal();
    setModalCompensation(!modalCompensation);
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Why are you late for work ?</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleText">Reason</Label>
            <Input type="textarea" name="text" id="exampleText" onChange={(e) => setReason(e.target.value)} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          <Button color="success" onClick={finishReport}>Check In</Button>
        </ModalFooter>
      </Modal>
      {
        modalCompensation && <ModalCompensation />
      }
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkIn: (reason) => { dispatch(actions.checkIn({ reason: reason })) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalReason);