
import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, NavDropdown, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import './navbar.css'
import { appBarClasses } from '@mui/material';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "bootstrap/dist/css/bootstrap.min.css";
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
        if (localStorage.getItem('token') && localStorage.getItem('role') === 'User') {
            // 
        }
        else {
            alert('login first to confirm your reservation')
        }
    }



    //reg hooks
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [username, setusername] = useState('') //hooks to take input and set
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')

    const [eusername, seteusername] = useState('') //error hooks to display on error
    const [epassword, setepassword] = useState('')
    const [ecpassword, setecpassword] = useState('')

    const [ucolour, setucolour] = useState('') //border colour hooks
    const [pcolour, setpcolour] = useState('')
    const [cpcolour, setcpcolour] = useState('')

    //login hooks
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [username2, setusername2] = useState('') //hooks to take input and set
    const [password2, setpassword2] = useState('')

    const [eusername2, seteusername2] = useState('') //error hooks to display on error
    const [epassword2, setepassword2] = useState('')

    const [ucolour2, setucolour2] = useState('') //border colour hooks
    const [pcolour2, setpcolour2] = useState('')


    function regValidation() {
        var valid = 1
        //username validation
        if (username.length >= 8) {
            seteusername('')
            setucolour('green')
        }
        else {
            seteusername('username must be atleast 8 characters long')
            setucolour('red')
            valid = 0
        }
        //password validation
        if (password.length >= 8) {
            setepassword('')
            setpcolour('green')
        }
        else {
            setepassword('password must be atleast 8 characters long')
            setpcolour('red')
            valid = 0
        }
        //confirm password validation
        if (cpassword === password) {
            setecpassword('')
            setcpcolour('green')
        }
        else {
            setecpassword('passwords do not match')
            setcpcolour('red')
            valid = 0
        }
        if (valid === 1)
            handleClose();
        //create account
    }

    function loginValidation() {


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
                            <Nav.Link href="#" onClick={handleShow2} className="links">Login</Nav.Link>
                            <Nav.Link href="#" onClick={handleShow} className="links">Register</Nav.Link>
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
                        </Nav >
                    </Navbar.Collapse >
                </Container >
            </Navbar >
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
                <hr />
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

            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Registration Form</ModalTitle>
                </ModalHeader>
                <br />
                <input type="text" placeholder='username' className='form-cotrol' style={{ borderColor: ucolour }}
                    value={username} onChange={(e) => { setusername(e.target.value) }} />
                <p>{eusername}</p>
                <input type="password" placeholder='password' className='form-cotrol' style={{ borderColor: pcolour }}
                    value={password} onChange={(e) => { setpassword(e.target.value) }} />
                <p>{epassword}</p>
                <input type="password" placeholder='confirm password' className='form-cotrol' style={{ borderColor: cpcolour }}
                    value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                <p>{ecpassword}</p>
                <ModalFooter>
                    <button className="btn btn-outline-danger" variant="secondary" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn btn-outline-success" variant="primary" onClick={() => regValidation()}>
                        Create an account
                    </button>
                </ModalFooter>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
                <ModalHeader closeButton>
                    <ModalTitle>Login Form</ModalTitle>
                </ModalHeader>
                <br />
                <input type="text" placeholder='username' className='form-cotrol' style={{ borderColor: ucolour2 }}
                    value={username2} onChange={(e) => { setusername2(e.target.value) }} />
                <p>{eusername2}</p>
                <input type="password" placeholder='password' className='form-cotrol' style={{ borderColor: pcolour2 }}
                    value={password2} onChange={(e) => { setpassword2(e.target.value) }} />
                <p>{epassword2}</p>
                <ModalFooter>
                    <button className="btn btn-outline-danger" variant="secondary" onClick={handleClose2}>
                        Cancel
                    </button>
                    <button className="btn btn-outline-success" variant="primary" onClick={() => loginValidation()}>
                        Login
                    </button>
                </ModalFooter>
            </Modal>

        </div >

    )
}

export default Flightnavbar
