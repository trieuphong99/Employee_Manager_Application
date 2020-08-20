import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function DeleteModal(props) {
  const {
    item,
    deleteOffSet
  } = props;

  const date = item.compensated_by || item.date
  const for_date = item.compensate_to || item.date

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const deleteConfirmModal = () => {
    toggle()
    deleteOffSet()
  }

  return (
    <div style={{ display: "inline" }}>
      <Button color="danger" onClick={toggle}>Delete</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete Account</ModalHeader>
        <ModalBody>
          Delete request <span id="status-name">{date}</span> for <span id="status-name">{for_date}</span>?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => deleteConfirmModal(item)}>Delete</Button>
          <Button onClick={toggle}>Close</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}
