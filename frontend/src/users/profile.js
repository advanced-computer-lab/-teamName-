import React, { useState, useEffect } from 'react'
import Carouselitem from '../shared/Carouselitem'
import Flightnavbar from '../shared/Flightnavbar'
import { Card, Button, Row, Form, Col, Modal } from 'react-bootstrap'
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import axios from 'axios'
import './orders.css'


const Profile = () => {
    //change password modal hooks
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //set values hooks
    const [old, setold] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    //error hooks
    const [eold, seteold] = useState('')
    const [epassword, setepassword] = useState('')
    const [ecpassword, setecpassword] = useState('')
    //border colour hooks
    const [oldcolour, setoldcolour] = useState('')
    const [pcolour, setpcolour] = useState('')
    const [cpcolour, setcpcolour] = useState('')

    async function changePassword(){
       var valid=1
        //new password validation
        if (password.length < 8) {
            setepassword('password must be atleast 8 characters long')
            setpcolour('red')
            valid = 0
        }
        else {
            setepassword('')
            setpcolour('green')
        }
        //confirm new password validation
        if (cpassword === password) {
            setecpassword('')
            setcpcolour('green')
        }
        else {
            setecpassword('passwords do not match')
            setcpcolour('red')
            valid = 0
        }
        if(valid===1){
            //change pasword code
            const editInfo = {
                "password": password,
            }
            console.log(editInfo);
            let response = await axios.put('http://localhost:8000/user/profile', JSON.stringify(editInfo), {
                headers: { 'Content-Type': 'application/json', 'id': sessionStorage.getItem('id') },
            })
            console.log(response.data)
            handleClose()
        }
    }

    let [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        passportNumber: '',
        email: '',
    });

    const submitHandler = async (target) => {
        const editInfo = {
            "email": target.email.value,
            "passportNumber": target.passportNumber.value,
            "firstName": target.firstName.value,
            "lastName": target.lastName.value
        }
        console.log(editInfo);
        let response = await axios.put('http://localhost:8000/user/profile', JSON.stringify(editInfo), {
            headers: { 'Content-Type': 'application/json', 'id': sessionStorage.getItem('id') },
        })
        console.log(response.data)
    };

    useEffect(() => {
        let response = ''
        const sendRequest = async () => {
            response =  await axios.get('http://localhost:8000/user/profile', {
                headers: { 'Content-Type': 'application/json', 'id': sessionStorage.getItem('id') },
            })
            console.log(response.data)
            setProfile(response.data)
        }
        sendRequest()
        
    }, [])


    return (
        <div>
            <Carouselitem />
            <Flightnavbar />
            <div className="container d-flex justify-content-center">
                <Card className='order-card m-3 '>
                    <Card.Title>
                        <h1 className="display-5">
                            Edit your profile
                        </h1>
                    </Card.Title>
                    <Card.Body>
                        <Form onSubmit={(event) => {
                            event.preventDefault();
                            submitHandler(event.target)
                        }}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email" defaultValue={profile.email}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Passport Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter passport number" name="passportNumber" defaultValue={profile.passportNumber}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter first name" name="firstName" defaultValue={profile.firstName}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter last name" name="lastName" defaultValue={profile.lastName}/>
                                </Form.Group>
                            </Row>
                            <Button variant="primary" type="submit">
                                Edit
                            </Button>
                            <Button className="changePass" variant="danger" type="submit" onClick={() => {handleShow()}}>
                                Change password
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                 <ModalHeader closeButton>
                                    <ModalTitle>Change password</ModalTitle>
                                        </ModalHeader>
                                            <br />
                                            <input type="password" placeholder='old password' className='form-cotrol' style={{ borderColor: oldcolour }}
                                            value={old} onChange={(e) => { setold(e.target.value) }} />
                                            <p>{eold}</p>
                                            <input type="password" placeholder='new password' className='form-cotrol' style={{ borderColor: pcolour }}
                                            value={password} onChange={(e) => { setpassword(e.target.value) }} />
                                            <p>{epassword}</p>
                                            <input type="password" placeholder='confirm new password' className='form-cotrol' style={{ borderColor: cpcolour }}
                                            value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                                            <p>{ecpassword}</p>
                                        <ModalFooter>
                                            <button className="btn btn-outline-danger" variant="secondary" onClick={handleClose}>
                                             Cancel
                                            </button>
                                            <button className="btn btn-outline-success" variant="primary" onClick={() => changePassword()}>
                                             Confirm
                                            </button>
                                        </ModalFooter>
                            </Modal>
                        </Form>

                    </Card.Body>
                </Card>

            </div>
        </div>
    )
}

export default Profile
