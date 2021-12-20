
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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

    const appContext = useAppContext();
    const [departureFlight, setDeparture] = useState()
    const [returnFlight, setReturn] = useState()


    let history = useHistory();
    useEffect(() => {
        setDeparture(appContext.cart.departureFlight)
        setReturn(appContext.cart.returnFlight)
        console.log("HERERE")
    }, [appContext.cart.departureFlight.From, appContext.cart.returnFlight.From, appContext.cart.departureFlight.To, appContext.cart.returnFlight.To])
    useEffect(() => {
        console.log(appContext.isEditing, appContext.isDepart, appContext.isReturn)
        if (appContext.isEditing) {

            setDeparture(appContext.cart.departureFlight)
            setReturn(appContext.cart.returnFlight)
            console.log(appContext.cart)
        }
        else {
            console.log("is Not editing")
        }

    }, [appContext.isEditing, appContext.isDepart, appContext.isReturn])

    const [showSummary, setShowSummary] = useState(false);
    const handleCloseDetails = () => { console.log('closed'); setShowSummary(false); };
    const handleShowDetails = () => {
        setShowSummary(true)
        console.log('showed')
    };


    const confirmFlight = async () => {
        console.log(appContext.cart)

        if (sessionStorage.getItem('token') && sessionStorage.getItem('role') === 'User') {
            if (appContext.cart.busDepSeats.length === 0 && appContext.cart.econDepSeats.length === 0) {
                alert('Please select one or more departure seats')
                return
            }
            if (appContext.cart.busRetSeats.length === 0 && appContext.cart.econRetSeats.length === 0) {
                alert('Please select one or more return seats')
                return
            }
            if (appContext.isEditing) {
                alert('Order Edited successfully')
                appContext.clearCart();
                history.push('/orders')
                handleCloseDetails();
                await axios.put('http://localhost:8000/user/editReservation/',
                    {
                        ...JSON.stringify(appContext.cart),
                        "id": sessionStorage.getItem('reservationId'),
                        'userid': sessionStorage.getItem('id'),
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': sessionStorage.getItem('token'),
                            'userId': sessionStorage.getItem('id')
                        }
                    }
                )
                
            
                return
            }
            await axios.post('http://localhost:8000/user/reserveFlight/',
                JSON.stringify(appContext.cart),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': sessionStorage.getItem('token'),
                        'userId': sessionStorage.getItem('id')
                    }
                }
            )
            alert('Order submitted successfully')
            appContext.clearCart();
            handleCloseDetails();
        }
        else {
            alert('login first to confirm your reservation')
            handleCloseDetails();
            handleShow2();
        }
    }



    //reg hooks
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [username, setusername] = useState('') //hooks to take input and set
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [passport, setpassport] = useState('')

    const [eusername, seteusername] = useState('') //error hooks to display on error
    const [epassword, setepassword] = useState('')
    const [ecpassword, setecpassword] = useState('')
    const [efirstname, setefirstname] = useState('')
    const [elastname, setelastname] = useState('')
    const [eemail, seteemail] = useState('')
    const [epassport, setepassport] = useState('')

    const [ucolour, setucolour] = useState('') //border colour hooks
    const [pcolour, setpcolour] = useState('')
    const [cpcolour, setcpcolour] = useState('')
    const [firstnamecolour, setfirstnamecolour] = useState('')
    const [lastnamecolour, setlastnamecolour] = useState('')
    const [emailcolour, setemailcolour] = useState('')
    const [passportcolour, setpassportcolour] = useState('')

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

    const logOut = () => {
        sessionStorage.clear();

        setNavLinks(isLoggedIn());
        history.push('/flights')
    }
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
                <Nav.Link href="/orders" className="links">Orders</Nav.Link>
                <Nav.Link href="/profile" className="links">Profile</Nav.Link>
            </>)
        }
    }
    const [navLinks, setNavLinks] = useState(isLoggedIn)

    async function regValidation() {
        var valid = 1
        //username validation
        if (username.length >= 4) {
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
        //first name validation
        if(firstname==""){
            setefirstname('First name field is required')
            setfirstnamecolour('red')
            valid=0
        }
        else{
            setefirstname('')
            setfirstnamecolour('green')
        }
        if(lastname==""){
            setelastname('Last name field is required')
            setlastnamecolour('red')
            valid=0
        }
        else{
            setelastname('')
            setlastnamecolour('green')
        }
        if(email.includes('@')){
            seteemail('')
            setemailcolour('green')
        }
        else if(email!=''){
            seteemail('Invalid email format')
            setemailcolour('red')
            valid=0
        }
        else{
            seteemail('Email field required')
            setemailcolour('red')
            valid=0
        }
        if(passport==''){
            setepassport('Passport number field required')
            setpassportcolour('red')
            valid=0
        }
        else{
            setepassport('')
            setpassportcolour('green')

        }

        if (valid === 1) {
            console.log(username, password)
            let registeredUser = {};
            try {
                registeredUser = await axios.post('http://localhost:8000/user/register/',
                    JSON.stringify({ "username": username, "password": password, "email":email, "passportNumber": passport}), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            catch (err) {
                alert('Username already registered')
            }
            if (registeredUser.data) {
                sessionStorage.setItem('id', registeredUser.data.id)
                sessionStorage.setItem('username', registeredUser.data.username)
                sessionStorage.setItem('role', registeredUser.data.role)
                sessionStorage.setItem('token', registeredUser.data.accessToken)

            }
            handleClose();
        }
        setusername('');
        setpassword('');
        setcpassword('')
        setfirstname('')
        setlastname('')
        setemail('')
        setpassport('')
        setNavLinks(isLoggedIn());
        //create account
    }

    async function loginValidation() {
        let registeredUser;


        try {
            registeredUser = await axios.post('http://localhost:8000/admin/login/',
                JSON.stringify({ "username": username2, "password": password2 }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch {
            console.log(registeredUser)


            alert('Invalid username or password');
            handleClose2();
            return

        }


        if (registeredUser) {
            sessionStorage.setItem('id', registeredUser.data.id)
            sessionStorage.setItem('username', registeredUser.data.username)
            sessionStorage.setItem('role', registeredUser.data.role)
            sessionStorage.setItem('token', registeredUser.data.accessToken)

        }
        handleClose2();
        setusername2('');
        setpassword2('');
        setNavLinks(isLoggedIn());

    }

    return (
        <div className='d-flex justify-content-center'>
            <Navbar fixed="top" className='custom-border-fill' expand="lg">
                <Container>
                    <Navbar.Brand href="#home"> <img src='../flightBrand.png' className='flightBrand' /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">

                            <Nav.Link href="/flights/#flights" className="links">Flights</Nav.Link>
                            {navLinks}
                            <NavDropdown title="Cart" id="basic-nav-dropdown" className="links no-margin px-2 cartNav">
                                <NavDropdown.Item href="#action/3.1">
                                    <strong>Departure flight</strong>
                                    <br />
                                    From :{departureFlight && departureFlight.From}
                                    <br />
                                    Date:
                                    {departureFlight && new Date(departureFlight.DepartureDate).toLocaleDateString()}
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.1">
                                    <strong>Return flight</strong>
                                    <br />
                                    From :{returnFlight && returnFlight.From}
                                    <br />
                                    Date: {returnFlight && new Date(returnFlight.DepartureDate).toLocaleDateString()}
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
            <Cart showSummary={showSummary} handleCloseDetails={handleCloseDetails} confirmFlight={confirmFlight} departure={departureFlight} return={returnFlight} />

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
                <input type="text" placeholder='first name' className='form-cotrol' style={{ borderColor: firstnamecolour }}
                    value={firstname} onChange={(e) => { setfirstname(e.target.value) }} />
                <p>{efirstname}</p>
                <input type="text" placeholder='last name' className='form-cotrol' style={{ borderColor: lastnamecolour }}
                    value={lastname} onChange={(e) => { setlastname(e.target.value) }} />
                <p>{elastname}</p>
                <input type="text" placeholder='email' className='form-cotrol' style={{ borderColor: emailcolour }}
                    value={email} onChange={(e) => { setemail(e.target.value) }} />
                <p>{eemail}</p>
                <input type="text" placeholder='passport number' className='form-cotrol' style={{ borderColor: passportcolour }}
                    value={passport} onChange={(e) => { setpassport(e.target.value) }} />
                <p>{epassport}</p>
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
