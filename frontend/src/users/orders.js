import React, { useState, useEffect } from 'react'
import Carouselitem from '../shared/Carouselitem'
import Flightnavbar from '../shared/Flightnavbar'
import './orders.css'
import axios from 'axios'
import OrderItem from './orderItem'
import { Carousel } from 'react-bootstrap'

const Orders = (props) => {

    const [reservedFlights, setreservedFlights] = useState([]);

    useEffect(() => {
        const sendRequest = async () => {
            let flights = await axios.get('http://localhost:8000/user/ReservedFlights',
                {
                    headers:
                    {
                        'userid': sessionStorage.getItem('id'),
                        'x-access-token': sessionStorage.getItem('token')
                    }
                }
            )
            setreservedFlights(flights.data)
        }
        sendRequest();
        console.log(reservedFlights)
    }, [])

    return (
        <div>
            <Carouselitem />
            <Flightnavbar  {...props} />
            <div className="container orders" >
                <div className='d-flex justify-content-center p-3 m-2'>
                    <Carousel className="home" variant="dark">
                        {reservedFlights && reservedFlights.map(order =>
                            <Carousel.Item key={order._id}>
                                <OrderItem
                                    id={order._id}
                                    departure={order.departureFlight}
                                    return={order.returnFlight}
                                    depBus={order.depBusSeats}
                                    depEcon={order.depEconSeats}
                                    retBus={order.retBusSeats}
                                    retEcon={order.retEconSeats}
                                    totalPrice = {order.totalPrice}
                                />

                            </Carousel.Item>
                        )}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Orders
