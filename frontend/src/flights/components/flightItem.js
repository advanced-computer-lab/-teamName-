import React, { useEffect,useState } from 'react'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "bootstrap/dist/css/bootstrap.min.css";

const FlightItem = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <li>
            <div className="row">
                <div className="col-2">
                    <h2 className="display-5">{props.From}</h2>
                </div>
                <div className="col-2">
                    <h2 className="display-5">{props.To}</h2>
                </div>
                <div className="col-4">
                    <h2 className="">{props.Date}</h2>
                </div>
                <div className="col-2">
                    <h2 className="display-5">{props.Seats}</h2>
                </div>
                <div className="col-2">
                    <h2 className="display-5">{props.Cabin}</h2>
                </div>
            </div>
            <div className='row'>
                <div className="col-6 offset-3">
                <button className="btn btn-outline-primary" variant="primary" onClick={handleShow}> Delete</button>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Delete confirmation</ModalTitle>
        </ModalHeader>
        <ModalBody>Are you sure you want to delete this flight?</ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-primary" variant="secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-outline-primary" variant="primary" onClick={async()=> {
              handleClose();
              await fetch(`http://localhost:8000/flight/${props.id}`,{ method: 'DELETE'})}}>
            Delete
          </button>
        </ModalFooter>
      </Modal>
                    <a className="btn btn-outline-primary" href={'/flights/'.concat(props.id)}>Details</a>
                </div>
            </div>
        </li>
    )
}

export default FlightItem
