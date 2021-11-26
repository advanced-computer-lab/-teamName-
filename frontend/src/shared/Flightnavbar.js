import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, NavDropdown , Modal } from 'react-bootstrap'

import Modalitem from './Modalitem'
import { useAppContext } from '../cart.context';



import './navbar.css'


const Flightnavbar = (props) => {


    const [departureFlight, setDeparture] = useState()
    const [returnFlight, setReturn] = useState()
    const appContext = useAppContext();

    useEffect(() => {
        setDeparture(appContext.cart.departureFlight)
        setReturn(appContext.cart.returnFlight)
    }, [appContext.cart.departureFlight, appContext.cart.returnFlight])


    const [showSummary, setShowSummary] = useState(false);
    const handleCloseDetails = () => { console.log('closed'); setShowSummary(false); };
    const handleShowDetails = () => {
        setShowSummary(true)
        console.log('showed')
    };

    const confirmFlight = () => { 
        if(localStorage.getItem('token') && localStorage.getItem('role') ==='User') {
            // 
        }
        else {
            alert('login first to confirm your reservation')
        }
    }

    return (
        <div>
            <Navbar sticky="top" className='custom-border-fill' expand="lg">
                <Container>
                    <Navbar.Brand href="#home"> <img src='../flightBrand.png' className='flightBrand' /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#flights" className="links">Flights</Nav.Link>
                            <Nav.Link href="#link" className="links">Login</Nav.Link>
                            <Nav.Link href="#link" className="links">Register</Nav.Link>
                            <NavDropdown title="Cart" id="basic-nav-dropdown" className="links no-margin px-2">
                                <NavDropdown.Item href="#action/3.1">
                                    From :{departureFlight && departureFlight.From}
                                    <br />
                                    Date:
                                    {departureFlight && departureFlight.DepartureDate}
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.1">
                                    To :{returnFlight && returnFlight.From}
                                    <br />
                                    Date: {returnFlight && returnFlight.DepartureDate}
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4" className="button danger px-2" onClick={() => {
                                    appContext.clearCart();
                                }}> Clear cart
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4" className="button success px-2" onClick={() => {
                                    handleShowDetails();
                                }}>
                                    Sumary & Confirm
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modalitem show={showSummary} close={handleCloseDetails} title="Order Summary">
                <div className="row">
                    <div className="col-5">
                        <h2 className="display-5">From: {appContext.cart.departureFlight.From}</h2>
                    </div>
                    <div className="col-5">
                        <h2 className="display-5">To: {appContext.cart.departureFlight.To}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5">
                        <h2 className="display-5">Departure:<br />{appContext.cart.departureFlight.DepartureDate}</h2>
                    </div>
                    <div className="col-5">
                        <h2 className="display-5">Arrival:<br /> {appContext.cart.departureFlight.ArrivalDate}</h2>
                    </div>

                </div>
                <div className="row">
                    <div className="col-6">
                        <h2 className="display-5">Business seats: {appContext.cart.returnFlight.BusinessSeats}</h2>
                    </div>
                    <div className="col-6">
                        <h2 className="display-5">Economy seats: {appContext.cart.returnFlight.EconomySeats}</h2>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-5">
                        <h2 className="display-5">From: {appContext.cart.returnFlight.From}</h2>
                    </div>
                    <div className="col-5">
                        <h2 className="display-5">To: {appContext.cart.returnFlight.To}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5">
                        <h2 className="display-5">Departure:<br />{appContext.cart.returnFlight.DepartureDate}</h2>
                    </div>
                    <div className="col-5">
                        <h2 className="display-5">Arrival:<br /> {appContext.cart.returnFlight.ArrivalDate}</h2>
                    </div>

                </div>
                <div className="row">
                    <div className="col-6">
                        <h2 className="display-5">Business seats: {appContext.cart.returnFlight.BusinessSeats}</h2>
                    </div>
                    <div className="col-6">
                        <h2 className="display-5">Economy seats: {appContext.cart.returnFlight.EconomySeats}</h2>
                    </div>
                </div>
                <Modal.Footer>
                    <button className="btn btn-outline-success" onClick={() => { confirmFlight(); handleCloseDetails() }}>
                        Confirm Reservation
                    </button>
                    
                </Modal.Footer>

            </Modalitem>
        </div>
    )
}

export default Flightnavbar
