import React from 'react'
import { Carousel } from 'react-bootstrap'
import './carousel.css'
const Carouselitem = () => {
    return (
        <div>
            <Carousel id = "home">
                <Carousel.Item>
                    <img
                        className="d-block height w-100"
                        src="../airplane.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3> Welcome to AirMax reservation srevices </h3>
                        <p>Scroll down for more</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 height"
                        src="../cabin_2_preview .jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Your comfort is our goal</h3>
                        <p>Scroll down for more</p>
                    </Carousel.Caption>
                </Carousel.Item>
               
            </Carousel>
        </div>
    )
}

export default Carouselitem
