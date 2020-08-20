import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";

const ConfirmModal = props => {
  const {item, confirm, refuse } = props;
  const [isOpen, setModal] = useState(false);
  const toggle = () => setModal(!isOpen);
  const isConfirm = () => {
    confirm(item);
    toggle();
  };
  const isRefuse = () => {
    refuse(item);
    toggle();
  };
  return (
    <div>
      <Button color="warning" onClick={toggle}>
        Waiting
      </Button>
      <Modal isOpen={isOpen} toggle={toggle} style={{marginTop: "190px"}}>
        <ModalHeader toggle={toggle}>Confirm</ModalHeader>
        <ModalBody>
          <p>Please confirm the request</p>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={isConfirm}>
            Confirm
          </Button>
          <Button color="warning" onClick={isRefuse}>
            Reject
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ConfirmModal;
