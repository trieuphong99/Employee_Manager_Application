import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function DeleteModal(props) {
  const {
    item,
    deleteAccount
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const deleteConfirmModal = () => {
    toggle()
    deleteAccount(item)
  }

  return (
    <div style={{ display: "inline" }}>
      <Button color="danger" onClick={toggle}>Delete</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete Account</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the account <span id="status-name">{item.profile.name}</span>?
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>Close</Button>{' '}
          <Button color="danger" onClick={() => deleteConfirmModal(item)}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
