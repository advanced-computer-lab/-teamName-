import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Button, Modal } from 'react-bootstrap'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Modalitem from '../shared/Modalitem'
import axios from 'axios'
import './orders.css'
import { useAppContext } from '../cart.context';


function add(array, value) {
    var index = array.indexOf(value);

    if (index === -1) {
        array.push(value);
    }
    return array;
}

const OrderItem = (props) => {

    const appContext = useAppContext();

    let history = useHistory()
    const [showSummary, setShowSummary] = useState(false);
    const handleCloseDetails = () => { console.log('closed'); setShowSummary(false); };
    const handleShowDetails = () => {
        setShowSummary(true)
        console.log('showed')
    };


    const returnKeyLabel = (arr) => {
        let keyLabelArr = [];
        arr.forEach(key => {
            if (key)
                keyLabelArr.push({ "key": key, "label": key.toString() })
        })
        return keyLabelArr
    }
    const [totalSeats, setTotalSeats] = useState(0)
    const onSelectSeatHandler = (key, values) => {
        let seatsSelected = []
        values.forEach((item) => {
            seatsSelected = add(seatsSelected, parseInt(item))

        })
    }
    const displaySeats = (type) => {
        let seats = props[type];
        return seats.map((e, i) => <li key={i} className="seats-element">{e}, </li>)
    }
    const updateCart = () => {
        appContext.isEdit(true);
        let newCart = {
            "departureFlight": props.departure,
            "returnFlight": props.return,
            "busDepSeats": props.depBus,
            "econDepSeats": props.depEcon,
            "busRetSeats": props.retBus,
            "econRetSeats": props.retEcon,
            "totalPrice": props.totalPrice
        }
        sessionStorage.setItem("reservationId", props.id);
        sessionStorage.setItem("oldPrice", props.totalPrice);
        appContext.updateWhole(newCart);
        console.log(appContext.cart);

        history.push('/flights')
    }

    return (

        <>
            <Modalitem show={showSummary} close={handleCloseDetails} title={"Edit your order"}>
                <div className="row">
                    <h1 className="display-5"> Departure Flight : </h1>
                    <div className="col-4">
                        <h2 className="display-5">From: {props.departure.From}</h2>
                    </div>
                    <div className="col-4">
                        <h2 className="display-5">To: {props.departure.To}</h2>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => {
                            appContext.setIsDepart(true);
                            updateCart();
                        }}>
                            Edit flight
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5">
                        <h2 className="display-5">Departure:<br />{new Date(props.departure.DepartureDate).toLocaleDateString()}</h2>
                    </div>
                    <div className="col-5">
                        <h2 className="display-5">Arrival:<br /> {new Date(props.departure.ArrivalDate).toLocaleDateString()}</h2>
                    </div>

                </div>
                <div className="row">
                    <div className="col-6">

                    </div>
                    <div className="col-6">

                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <h1 className="display-5"> Return Flight : </h1>
                    <div className="col-4">
                        <h2 className="display-5">From: {props.return.From}</h2>
                    </div>
                    <div className="col-4">
                        <h2 className="display-5">To: {props.return.To}</h2>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => {
                            appContext.setIsReturn(true);
                            updateCart();
                        }}>
                            Edit flight
                        </button>
                    </div>

                </div>
                <div className="row">
                    <div className="col-5">
                        <h2 className="display-5">Departure:<br />{new Date(props.return.DepartureDate).toLocaleDateString()}</h2>
                    </div>
                    <div className="col-5">
                        <h2 className="display-5">Arrival:<br /> {new Date(props.return.ArrivalDate).toLocaleDateString()}</h2>
                    </div>

                </div>
                <div className="row">
                    <div className="col-6">



                    </div>
                    <div className="col-6">

                    </div>
                </div>
            </Modalitem>
            <Card style={{ width: '32rem' }} className='order-card'>
                <Card.Header >
                    Order details
                </Card.Header>
                <Card.Body>
                    <div className="row">
                        <Card.Title>Departure flight#: {props.departure.FlightNumber}</Card.Title>
                    </div>
                    <Card.Text >
                        <div className="row">
                            <div className="col-4">
                                From: {props.departure.From}
                            </div>
                            <div className="col-4">
                                To: {props.departure.To}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Departure date: {new Date(props.departure.DepartureDate).toLocaleDateString()}
                            </div>
                            <div className="col-6">
                                Return date: {new Date(props.departure.ArrivalDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Economy seats selected: <br />
                                {displaySeats('depEcon')}
                            </div>
                            <div className="col-6">
                                Business seats selected: <br />
                                {displaySeats('depBus')}
                            </div>
                        </div>

                    </Card.Text>
                    <hr />
                    <hr />
                    <div className="row">
                        <Card.Title>Return flight#: {props.return.FlightNumber}</Card.Title>
                    </div>
                    <Card.Text >
                        <div className="row">
                            <div className="col-4">
                                From: {props.return.From}
                            </div>
                            <div className="col-4">
                                To: {props.return.To}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Departure date: {new Date(props.return.DepartureDate).toLocaleDateString()}
                            </div>
                            <div className="col-6">
                                Return date: {new Date(props.return.ArrivalDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Economy seats selected: <br />
                                {displaySeats('retEcon')}
                            </div>
                            <div className="col-6">
                                Business seats selected: <br />
                                {displaySeats('retBus')}
                            </div>
                        </div>

                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <div className="row">
                        <div className="col-8 offset-2">
                            <h2 className="dispaly-5 text-center">
                                Total price: {props.totalPrice}
                            </h2>
                        </div>
                        <br />
                        <div className="col-5 offset-2">
                            <button className="btn btn-outline-danger"
                                onClick={() => {
                                    console.log(props.id)
                                    props.update(props.id)
                                }}
                            >
                                Cancel reservation
                            </button>
                        </div>
                        <div className="col-5">
                            <button className="btn btn-outline-primary"
                                onClick={() => {
                                    console.log(props.id)
                                    handleShowDetails();
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>

        </>
    )
}

export default OrderItem
