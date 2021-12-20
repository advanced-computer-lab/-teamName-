import React, { useState, useEffect } from 'react'
import Carouselitem from '../shared/Carouselitem'
import Flightnavbar from '../shared/Flightnavbar'
import { Card, Button, Row, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import './orders.css'


const Profile = () => {
    

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
        alert('profile successfully edited')
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
                                    <Form.Control type="text" placeholder="Enter email" name="passportNumber" defaultValue={profile.passportNumber}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" name="firstName" defaultValue={profile.firstName}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" name="lastName" defaultValue={profile.lastName}/>
                                </Form.Group>
                            </Row>
                            <Button variant="primary" type="submit">
                                Edit
                            </Button>
                        </Form>

                    </Card.Body>
                </Card>

            </div>
        </div>
    )
}

export default Profile
