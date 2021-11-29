import React from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import './orders.css'

const OrderItem = (props) => {
    return (
        <>
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
                                {props.depEcon.map(item => <li key={item}> {item} </li>)}
                            </div>
                            <div className="col-6">
                                Business seats selected: <br />
                                {props.depBus.map(item => <li key={item}> {item} </li>)}
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
                                {props.retEcon.map(item => <li key={item}> {item} </li>)}
                            </div>
                            <div className="col-6">
                                Business seats selected: <br />
                                {props.retBus.map(item => <li key={item}> {item} </li>)}
                            </div>
                        </div>

                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <div className="row">
                        <div className="col-7">
                            <h2 className="dispaly-5">
                                Total price: {props.totalPrice}
                            </h2>
                        </div>
                        <div className="col-5">
                            <button className="btn btn-outline-danger" 
                                
                            >
                                Cancel reservation
                            </button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>

        </>
    )
}

export default OrderItem
