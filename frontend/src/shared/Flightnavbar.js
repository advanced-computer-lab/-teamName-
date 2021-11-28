
import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, NavDropdown, Modal } from 'react-bootstrap'
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from './cart'
import { useAppContext } from '../cart.context';
import axios from 'axios'


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
        if (sessionStorage.getItem('token') && sessionStorage.getItem('role') === 'User') {
            
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


    const isLoggedIn = () => {
        if (!sessionStorage.getItem('role')) {
            return (
                <>
                    <Nav.Link href="#" onClick={handleShow2} className="links">Login</Nav.Link>
                    <Nav.Link href="#" onClick={handleShow} className="links">Register</Nav.Link>
                </>)
        }
        else {
            return (<>
                <Nav.Link href="#" onClick={logOut} className="links">Log out</Nav.Link>
            </>)
        }
    }
    const [navLinks, setNavLinks] = useState(isLoggedIn)
    const logOut = () => {
        sessionStorage.clear();
        setNavLinks(isLoggedIn());
    }
    async function regValidation() {
        var valid = 1
        //username validation
        if (username.length >= 3) {
            seteusername('')
            setucolour('green')
        }
        else {
            seteusername('username must be atleast 4 characters long')
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
        if (valid === 1) {
            console.log(username, password)
            let registeredUser
            try {
                registeredUser = await axios.post('http://localhost:8000/user/register/',
                    JSON.stringify({ "username": username, "password": password }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            catch (err) {
                console.log(err)
            }
            if (registeredUser) {
                sessionStorage.setItem('id', registeredUser.id)
                sessionStorage.setItem('username', registeredUser.username)
                sessionStorage.setItem('role', registeredUser.role)
                sessionStorage.setItem('token', registeredUser.accessToken)

            }
            handleClose();
        }
        setusername('');
        setpassword('');
        setcpassword('')
        setNavLinks(isLoggedIn());
        //create account
    }

    function loginValidation() {


    }

    return (
        <div className='d-flex justify-content-center'>
            <Navbar sticky="top" className='custom-border-fill' expand="lg">
                <Container>
                    <Navbar.Brand href="#home"> <img src='../flightBrand.png' className='flightBrand' /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">

                            <Nav.Link href="#flights" className="links">Flights</Nav.Link>
                            {navLinks}
                            <NavDropdown title="Cart" id="basic-nav-dropdown" className="links no-margin px-2 cartNav">
                                <NavDropdown.Item href="#action/3.1">
                                    <strong>Departure flight</strong>
                                    <br />
                                    From :{departureFlight && departureFlight.From}
                                    <br />
                                    Date:
                                    {departureFlight && departureFlight.DepartureDate}
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.1">
                                    <strong>Return flight</strong>
                                    <br />
                                    From :{returnFlight && returnFlight.From}
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
            <Cart showSummary={showSummary} handleCloseDetails={handleCloseDetails} confirmFlight={confirmFlight} />

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
