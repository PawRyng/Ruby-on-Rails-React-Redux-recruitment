import React from "react";
import { connect } from "react-redux";
import { closeModal } from "./modalAction";
import { Modal, Button } from "react-bootstrap";


const UserModal = ({ isModalOpen, closeModal }) => {
  if (!isModalOpen) {
    return null;
  }

  return (
      <Modal show={isModalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Regulamin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum, tellus a tempor tempor, enim mi mollis felis, eget sollicitudin neque justo id eros. Quisque tellus elit, hendrerit in orci ac, efficitur ullamcorper felis. Praesent lacinia purus eu mattis fermentum. Etiam a elit bibendum, imperdiet ipsum non, maximus tellus. Pellentesque vitae justo tincidunt quam tempus malesuada et a leo. Cras ac porttitor ex, in maximus arcu. Nunc at elit nec ex interdum dapibus sit amet id libero. 
          </Modal.Body>
        </Modal>
  );
};

const mapStateToProps = (state) => ({
  isModalOpen: state.appState.isModalOpen,
});

const mapDispatchToProps = {
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
