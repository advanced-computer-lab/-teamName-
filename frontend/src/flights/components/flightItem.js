import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

const FlightItem = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="container w-100 mb-3">
            <div className="card bg-light border">
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <h2 className="display-5">Flight#: {props.FlightNumber}</h2>
                        </div>
                        <div className="col-4">
                            <h2 className="display-5">From: {props.From}</h2>
                        </div>
                        <div className="col-4">
                            <h2 className="display-5">To: {props.To}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <h2 className="display-5">Departure:<br/>{props.DepartureDate}</h2>
                        </div>
                        <div className="col-5">
                            <h2 className="display-5">Arrival:<br/> {props.ArrivalDate}</h2>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h2 className="display-5">Business seats: {props.BusinessSeats}</h2>
                        </div>
                        <div className="col-6">
                            <h2 className="display-5">Economy seats: {props.EconomySeats}</h2>
                        </div>
                    </div>

                </div>
                <div className="card-footer">
                    <div className='row justify-content-center'>
                        <div className="col-2 offset-4 mx-2">
                            <button className="btn btn-outline-danger" variant="primary" onClick={handleShow}> Delete</button>

                        </div>
                        <div className="col-2 mx-2">
                            <a className="btn btn-outline-success" href={'/flights/'.concat(props.id)}>Edit</a>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Delete confirmation</ModalTitle>
                </ModalHeader>
                <ModalBody>Are you sure you want to delete this flight?</ModalBody>
                <ModalFooter>
                    <button className="btn btn-outline-primary" variant="secondary" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn btn-outline-primary" variant="primary" onClick={async () => {
                        handleClose();
                        props.Update(props.id)
                        await axios.delete(`http://localhost:8000/admin/flight/${props.id}`);
                        // console.log(props.FlightNumber, props.id)

                    }}>
                        Delete
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default FlightItem
